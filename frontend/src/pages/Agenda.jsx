import React, { useState, useEffect} from "react";
import { Box, Paper, Typography, useTheme, Avatar } from "@mui/material";
import { Scheduler } from "@aldabil/react-scheduler";
import { es } from "date-fns/locale";
import useAxios from "../utils/useAxios";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Trans } from 'react-i18next'
import useMediaQuery from '@mui/material/useMediaQuery';
import useAuth from "../hooks/useAuth";
import Alerta from "../components/Alerta";

export default function Agenda() {
  const { user } = useAuth();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('sm'));
  const [success, setSuccess] = useState(false);
  const [alertaOpen, setAlertaOpen] = useState(false);
  const [mensaje, setMensaje] = useState('');
  const [severity, setSeverity] = useState('');
  const api = useAxios();
  const [events, setEvents ] = useState()


  function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
  }
  

 

useEffect(()=>{
  const fetchEventos = async () => {
    
    try{
      const response = await api.get("/evento")
      const nv = response.data.map((evento) => {
            evento.start = new Date(evento["start"])
            evento.end = new Date(evento["end"])
            evento.draggable = false
            if(evento.disabled === "true"){
              evento.disabled = true
            }else{
              evento.disabled = false
            }
            
            return evento
            

         }
         )
         setEvents(nv)
         
      
    }
    catch(error){
      console.log(error)
    }
 
    //aceptados = response.data.filter((e) => e.estado === "a");

  //    
}
fetchEventos()
}
,[])

const handleConfirm = async (event, action) => {
  console.log(user.color)
  if (action === "edit") {
    const response = await api.put("evento/",{
      ...event,
      event_id: event.event_id
    })
    response.data.start = new Date(response.data['start'])
    response.data.end = new Date(response.data['end'])
    if(response.data.disabled === 'true'){
      response.data.disabled = true
    }else{
      response.data.disabled = false
    }
    console.log(response.data)
   return response.data
    /** PUT event to remote DB */
  } else if (action === "create") {
    /**POST event to remote DB */
    
    const response = await api.post("evento/",{
      color: user.color,
      solicitante_id: user.user_id,
      ...event,

    }).catch((error) => {
      if (error.response) {
        console.log(error.response.data);
      }
    })
    
    
    response.data.start = new Date(response.data['start'])
    response.data.end = new Date(response.data['end'])
    if(response.data.disabled === 'true'){
      response.data.disabled = true
    }else{
      response.data.disabled = false
    }
    // if(response.status === 200){
    //   setAlertaOpen(true)
    //   setMensaje("solicitud aceptada")
    //   setSeverity("success")
    

    // }
   return response.data
  
}
};

const handleDelete = async (deletedId) => {
 
    await api.delete("evento/",{
      params:{pk: deletedId}
    }).catch((error) => {
      if (error.response) {
        console.log(error.response.data);
      }
      
    })
    return deletedId
   
  }



  return (
    <Box
    sx={{
      minHeight: '100vh',
      backgroundColor: '#ededed',
      padding: matches ? 2 : 0,
      paddingLeft: matches ? 2 : 8,
      paddingTop: matches ? 5 : 8,
    }}
  >
      <Box>
        <Paper sx={{ height: "auto", padding: 2 }}>
          <Trans i18nkey="agenda">
          <Scheduler

            locale={es}
            view="week"
            // eslint-disable-next-line no-restricted-globals
            // remoteEvents={fetchEventos}
            events={events}
            loading={events ? false : true}
            onConfirm={handleConfirm}
            onDelete={handleDelete}
            fields={[
              {
                name: "description",
                type: "input",
                default: "Descripción...",
                config: { label: "Detalles", multiline: true, rows: 4 }
              },
              {
                solicitante_id: "",
              },
              {
                name: "disabled",
                type: "select",
                // Should provide options with type:"select"
                options: [
                  { id:1,text: "habilitado", value: "false" },
                  { id:2,text: "deshabilitado", value: "true"}
                ],
                config: { label: "Estado",default: "false", required: true, errMsg: "Obligatorio" }
              },

            ]}
            translations={{
              navigation: {
              month: "Mes",
              week: "Semana",
              day: "Día",
              today: "Hoy"
              },
              form: {
              addTitle: "Añadir Evento",
              editTitle: "Editar Evento",
              confirm: "Confirmar",
              delete: "Borrar",
              cancel: "Cancelar"
              },
              event: {
              title: "Título",
              start: "Comienzo",
              end: "Fin",
              allDay: "Día Completo"
             },
              moreEvents: "Más..."
             }}
            viewerExtraComponent={(fields, event) => {
              return (
                <div>
                  
                  {event.solicitante !== null ? <Box sx={{ display: 'flex', alignItems: 'center',margiy:1, flexShrink: 0, textDecoration: 'none', color: '#4e4e4e', fontSize: 18}}>
                <Avatar sizes='small' sx={{marginRight: 1, backgroundColor: event.solicitante.color , width: 30, height: 30}} >{event.solicitante.email.slice(0,1).toUpperCase()}</Avatar>
             
                 <Typography>{event.solicitante.email}</Typography>
              </Box> : null}
                  <Typography variant="body2">Descripción: {event.evento || "Sin descripción..."}</Typography>
                  
                </div>
              );
            }}
            day={{
              startHour: 8,
              endHour: 21,
              step: 60,
            }} 
            month={{
              weekDays: [0, 1, 2, 3, 4, 5],
              weekStartOn: 1,
              startHour: 8,
              endHour: 21,
            }}
            week={{
              weekDays: [0, 1, 2, 3, 4, 5],
              weekStartOn: 1,
              startHour: 8,
              endHour: 21,
              step: 60,
            }}
          />
          </Trans>
        </Paper>
      </Box>
      <Alerta open={alertaOpen} setOpen={setAlertaOpen} severity={severity}  mensaje={mensaje}/>
    </Box>
  );
}
