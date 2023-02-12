import React from "react";
import { Box, Paper, Typography, Chip, Stack } from "@mui/material";
import dayjs from "dayjs";

export default function SoliInfoCard({ data }) {
  function letraPalabra(letra) {
    console.log(letra);
    if (letra === "p") {
      return "Pendiente";
    } else if (letra === "a") {
      return "Aprobada";
    } else {
      return "Rechazada";
    }
  }

  function ocultarPalabra(palabra) {
    const iterator = palabra[Symbol.iterator]();
    let char = iterator.next();
    let string = "";
    while (!char.done) {
      string = string + "*";
      char = iterator.next();
    }
    return string;
  }

  return (
    <Paper sx={{ padding: 2 }}>
      <Stack spacing={2}>
        {data ? (
          <Typography variant="h4">Evento: {data[0].evento}</Typography>
        ) : null}
        {data ? (
          <Box display="flex">
            <Typography marginRight={2} variant="h5">
              Inicio:{" "}
            </Typography>
            <Chip
              sx={{ fontSize: 16 }}
              color="primary"
              label={dayjs(data[0].horaIni)
                .locale("es")
                .format("ddd D MMM HH:mm:ss")
                .toString()}
            ></Chip>
          </Box>
        ) : null}
        {data ? (
          <Box display="flex">
            <Typography marginRight={2} variant="h5">
              Fin:{" "}
            </Typography>
            <Chip
              sx={{ fontSize: 16 }}
              color="primary"
              label={dayjs(data[0].horaTer)
                .locale("es")
                .format("ddd D MMM HH:mm:ss")
                .toString()}
            ></Chip>
          </Box>
        ) : null}

        {data ? (
          <Typography variant="h5">
            participantes: {data[0].participantes}
          </Typography>
        ) : null}
        {data ? (
          <Typography variant="h5">
            clave: {ocultarPalabra(data[0].clave)}
          </Typography>
        ) : null}
        {data ? (
          <Typography variant="h5">
            estado: {letraPalabra(data[0].estado)}
          </Typography>
        ) : null}
      </Stack>
    </Paper>
  );
}
