/* eslint-disable react/react-in-jsx-scope */
import { useContext, useEffect, useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { Select, MenuItem, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import * as yup from "yup";
import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import "dayjs/locale/es";
import { useFormik } from "formik";
import useAxios from "../utils/useAxios";
import AuthContext from "../context/AuthContext";
import { DatePicker, TimePicker, DateTimePicker } from "@mui/x-date-pickers";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import CircularProgress from "@mui/material/CircularProgress";
// eslint-disable-next-line react/prop-types
export default function SoliForm({ open, handleClose, setAlertaOpen, setMensaje, setSeverity, setSuccess, handleModal }) {
  dayjs.extend(isBetween);
  dayjs.extend(isSameOrAfter);
  const [eventos, setEventos] = useState("");
  const [hora3, setHora3] = useState("");
  const [horasini, setHorasini] = useState("");
  const [horas, setHoras] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hora1, setHora1] = useState("");
  const [hora2, setHora2] = useState("");
  const api = useAxios();
  const { user } = useContext(AuthContext);
  const nearest = require("nearest-date");

  useEffect(() => {
    const fetchEventos = async () => {
      //Agregar a fetch solicitudes, para comprobar que no se solicite en la misma semana
      // Cambiar maps por foreach y eliminar filter
      const response = await api
        .get("/evento")
        .catch((error) => error.response.status);
      const nv = response.data.filter((evento) => {
        delete evento.event_id;
        delete evento.title;
        delete evento.disabled;
        delete evento.description;
        delete evento.color;
        if (dayjs(evento.start).isSameOrAfter(dayjs())) {
          evento.start = dayjs(evento["start"]).$d;
          evento.end = dayjs(evento["end"]).$d;
          return true;
        }
      });

      setEventos(nv);
    };
    fetchEventos();
  }, []);

  const HandleSubmit = async (valores) => {
    setLoading(true)
    try {
      const response = await api
        .post("solicitud/", { ...valores, solicitante_id: user.user_id })
        .catch((error) => {
          if (error.response) {
            setLoading(false);
            setAlertaOpen(true)
            setMensaje('Solicitud no enviada');
        setSeverity('error')
        
          }
        });
      if (response.status === 200) {
        console.log(response.status)
        setLoading(false);
        setSuccess(true);
        handleClose();
        setAlertaOpen(true)
        handleModal();
        setMensaje("Solicitud enviada con éxito");
        setSeverity("success");
        
        
        
      
      }
    } catch {}
    
  };

  const cercana = function (array, date) {
    let arr = [];
    array.forEach((el) => {
      if (dayjs(el).isAfter(date)) {
        arr.push(el);
      }
    });
    let index = nearest(arr, date);
    return arr[index];
  };

  const validationSchema = yup.object({
    evento: yup
      .string("Ingresa nombre del evento")
      .required("el nombre del evento es obligatorio"),
    horaIni: yup
      .date("ingrese la fecha y hora de la solicitud de reserva")
      .required("La fecha y hora de inicio es obligatoria"),
    horaTer: yup
      .date("ingrese la hora de finalización de la solicitud reserva")
      .required("La hora de finalización es obligatoria"),
  });

  const formik = useFormik({
    initialValues: {
      evento: "",
      horaIni: "",
      horaTer: "",
    },
    validationSchema,
    onSubmit: (values) => {
      HandleSubmit(values);
      formik.resetForm({ values: "" });
    },
  });

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
      <DialogTitle>Nueva Solicitud</DialogTitle>
      <DialogContent>
        <DialogContentText />
        <form onSubmit={formik.handleSubmit}>
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <TextField
              sx={{ marginY: 1 }}
              size="normal"
              id="evento"
              label="Evento(motivo)"
              type="text"
              variant="outlined"
              color="primary"
              value={formik.values.evento}
              onChange={formik.handleChange}
              error={formik.touched.evento && Boolean(formik.errors.evento)}
              helperText={formik.touched.evento && formik.errors.evento}
            />

            <DateTimePicker
              renderInput={(props) => (
                <TextField sx={{ marginY: 1 }} {...props} />
              )}
              label="inicio"
              id="inicio"
              minutesStep={5}
              disableIgnoringDatePartForTimeValidation={true}
              minDate={dayjs()}
              minTime={dayjs().add(2, "hour")}
              ampm={false}
              onChange={(value) => (
                formik.setFieldValue("horaIni", value, true),
                setHora1(value),
                setHoras(
                  eventos.map((evento) => {
                    let arr = [];
                    if (dayjs(evento.start).isSame(value, "day")) {
                      arr.push(dayjs(evento.start).hour());
                      arr.push(dayjs(evento.end).hour());
                    } else {
                      return 0;
                    }
                    return arr;
                  })
                ),
                setHorasini(
                  horas.flatMap((hora) => {
                 
                    let intermedios = [];
                    if (Array.isArray(hora)) {
                      
                      for (let i = hora[0]; i < hora[1]; i++) {
                        intermedios.push(i);
                      }
                    }
                    return intermedios;
                  })
                ),
                setHora2(
                  eventos.forEach((evento) => {
                    let dato = [];
                    if (
                      dayjs(evento.start).isSame(value, "day") &&
                      dayjs(evento.start).isAfter(value)
                    ) {
                      dato.push(evento.start);
                    }
                    return dato[0];
                  })
                ),
                setHora3(
                  hora2
                    ? hora2.map((hora) => {
                        let arr = [];
                        if (dayjs(hora).isAfter(value)) {
                          arr.push(hora);
                        }

                        let index = nearest(arr, value);

                        return arr[index];
                      })
                    : null
                )
              )}
              value={formik.values.horaIni}
              shouldDisableTime={(timeValue, clockType) => {
                if (clockType === "hours" && timeValue < 9) {
                  return true;
                } else if (
                  clockType === "hours" &&
                  horasini.includes(timeValue)
                ) {
                  return true;
                } else if (clockType === "hours" && timeValue > 21) {
                  return true;
                }
                return false;
              }}
            />
            <DateTimePicker
              renderInput={(props) => (
                <TextField
                  color="primary"
                  sx={{ marginY: 1 }}
                  disabled="true"
                  {...props}
                />
              )}
              label="fin"
              id="fin"
              disableIgnoringDatePartForTimeValidation={true}
              ampm={false}
              minDate={hora1}
              minTime={dayjs(hora1).add(1, "hour")}
              maxTime={
                hora3 && dayjs(hora1).isBefore(cercana(hora3, hora1))
                  ? cercana(hora3, hora1)
                  : dayjs(hora1).add(3, "hour")
              }
              maxDate={hora1}
              shouldDisableTime={(timeValue, clockType) => {
                if (clockType === "hours" && timeValue < 9) {
                  return true;
                } else if (clockType === "hours" && timeValue > 21) {
                  return true;
                }
                return false;
              }}
              minutesStep={5}
              onChange={(value) => formik.setFieldValue("horaTer", value, true)}
              value={formik.values.horaTer}
            />
              <Box sx={{height: '50px', display:'flex', justifyContent: 'center', alignCenter:'center'}}>
      {loading ?
              <CircularProgress />
           : null }
           </Box>
            <DialogActions sx={{ justifyContent: "center"}}>
          
              <Button
                sx={{ width: "400px", alignSelf: "center", marginTop: 1}}
                variant="contained"
                color="primary"
                type="submit"
              >
                Enviar Solicitud
              </Button>
            </DialogActions>
        
          </Box>
        </form>
      </DialogContent>
      
    </Dialog>
  );
}
