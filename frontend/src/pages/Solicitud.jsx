/* eslint-disable max-len */
/* eslint-disable react/react-in-jsx-scope */
import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import Box from "@mui/material/Box";
import { Paper, Typography, Button, useTheme, CircularProgress } from "@mui/material";

import useAxios from "../utils/useAxios";
import TopBar from "../layout/TopBar";

import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import InvitacionForm from "../components/InvitacionForm";
import MensajeForm from "../components/MensajeForm";
import TiempoCard from "../components/TiempoCard";
import EstadoCard from "../components/EstadoCard";
import ParticipantesCard from "../components/ParticipantesCard";
import InvitacionStepper from "../components/InvitacionStepper";
import Invitados from "../components/Invitados";
import useMediaQuery from "@mui/material/useMediaQuery";
import MobileAppBar from "../layout/AppBar";
import useAuth from "../hooks/useAuth";
import ModalInvitados from "../components/ModalInvitados";
import Alerta from "../components/Alerta";



// import ModalElimProd from '../components/ModalElimProd';


export default function Solicitud() {
  const { id } = useParams();
  const [data, setData] = useState();
  const [invi, setInvi] = useState();
  const [partic, setPartic] = useState();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [sending, setSending] = useState(false);
  const [success, setSuccess] = useState(false);
  const [alertaOpen, setAlertaOpen] = useState(false);
  const [mensaje, setMensaje] = useState('');
  const [severity, setSeverity] = useState('');
  const [pk, setPk] = useState('');
  const [invitados, setInvitados] = useState([]);
  const [confirmado, setConfirmado] = useState(false);
  const { user } = useAuth();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("md"));

  const api = useAxios();

  const agregarInvi = (arr) => {
    setInvitados(arr);
  };

  useEffect(() => 
  
  {
    setLoading(true);
    const fetchData = async () => {
      try {
        const response = await api.get(`/getsinglesoli/?id=${id}`);

        setData(response.data);
        setLoading(false)
      } catch {
        setData("Algo salió mal");
      }
      
    };

    const fetchInvi = async () => {
      try {
        setLoading(true)
        const response = await api.get(`/getinvisoli/?id=${id}`);

        setInvi(response.data);
        setLoading(false)
      } catch {
        setInvi("Algo salió mal");
      }
    };
    const fetchParticipantes = async () => {
      try {
        setLoading(true)
        const response = await api.get(`/getsingleinvi/?id=${id}`);

        setPartic(response.data);
        setLoading(false)
      } catch {
        setPartic("Algo salió mal");
      }
    };

    fetchData();
    fetchInvi();
    fetchParticipantes();
  }, [success]);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: 'flex',
        flexDirection: 'center',
        backgroundColor: "#ededed",
        padding: matches ? 2 : 2,
        paddingLeft: matches ? 2 : 9,
        paddingTop: matches ? 5 : 8,
      }}
    >
    
      <Grid2
        container
        spacing={2}
        sx={{ justifyContent: "center", paddingTop: 3 }}
      >
        <Grid2
          xs={12}
          sm={4}
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {loading ? null : <TiempoCard data={data} />}
        </Grid2>
        <Grid2
          xs={12}
          sm={4}
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {loading ? <CircularProgress /> : <EstadoCard data={data} /> }
        </Grid2>
        <Grid2
          xs={12}
          sm={4}
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {loading ? null : <ParticipantesCard setOpen={setOpen} /> }
        </Grid2>

        {user.tipo === 'a' ? <Grid2
          xs={12}
          sm={12}
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Paper sx={{ width: "100%" }}>
            <Grid2
              container
              spacing={2}
              sx={{ justifyContent: "center", paddingTop: 0, paddingX: 0 }}
            >
              <Grid2
                xs={12}
                sm={12}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Box
                  sx={{
                    width: "100%",
                    backgroundColor: "#fff",
                    display: "column",
                    justifyContent: "center",
                    alignItems: 'center',
                    textAlign: 'center',
                    borderRadius: 1,
                    borderBottomLeftRadius: 0,
                    borderBottomRightRadius: 0,
                  }}
                >
                  <Typography variant="h5" sx={{ paddingTop: 1 }}>
                    Agregar Participantes
                  </Typography>
                  {sending ? <CircularProgress/> : null }
                </Box>
              </Grid2>

              <Grid2
                xs={12}
                sm={12}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "end",
                  alignItems: "center",
                }}
              >
                <InvitacionStepper />
              </Grid2>
              <Grid2
                xs={12}
                sm={4}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "start",
                  alignItems: "center",
                }}
              >
                <InvitacionForm
                  data={data}
                  invitados={invitados}
                  participantes={partic}
                  agregarInvi={agregarInvi}
                />
              </Grid2>
              <Grid2
                xs={12}
                sm={4}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "start",
                  alignItems: "center",
                }}
              >
                <Invitados
                  invitados={invitados}
                  agregarInvi={agregarInvi}
                  setConfirmado={setConfirmado}
                />
              </Grid2>
              <Grid2
                xs={12}
                sm={4}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "start",
                  alignItems: "center",
                }}
              >
                <MensajeForm
                  invitados={invitados}
                  confirmado={confirmado}
                  setConfirmado={setConfirmado}
                  setInvitados={setInvitados}
                  data={data}
                  setAlertaOpen={setAlertaOpen}
                  setMensaje={setMensaje}
                  setSeverity={setSeverity}
                  setSending={setSending}
                  setSuccess={setSuccess}
                />
              </Grid2>
            </Grid2>
          </Paper>
        </Grid2> :<Typography></Typography>}
      </Grid2>
      <ModalInvitados open={open} handleClose={handleClose} partic={partic} />
      <Alerta open={alertaOpen} setOpen={setAlertaOpen} severity={severity}  mensaje={mensaje}/>
    </Box>
  );
}
