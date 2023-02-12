import * as React from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import cancha from "../assets/cancha.png";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import dayjs from "dayjs";

import { Chip, CircularProgress } from "@mui/material";

export default function ProximosCard({ evento, loading }) {
  return (
    <Card
      sx={{
        display: "flex",
        height: "auto",
        backgroundColor: "#f5f5f5",
        width: "100%",
      }}
    >
      <Box sx={{ display: "flex", width: "100%" }}>
        <CardContent
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
          }}
        >
          <Box
            sx={{
              display: "flex",
              width: "100%",
              alignItems: "center",
              justifyContet: "space-between",
            }}
          >
            <Box
              sx={{ display: "flex", flexDirection: "column", width: "100%" }}
            >
              <Typography variant="h5" color="text.secondary">
                {evento ? evento.evento : "sin eventos"}
              </Typography>
              <Typography variant="subtitle1" color="text.secondary">
                {evento ? evento.anfitrion : null}
              </Typography>
            </Box>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 0.5 }}>
            <Chip label= {evento
                ? `${dayjs(evento.inicio)
                    .locale("es")
                    .format("ddd D MMM HH:mm")}`
                : null} color="success">
          
            </Chip>
            <Chip label={evento
                ? `${dayjs(evento.fin).locale("es").format("ddd D MMM HH:mm")}`
                : null} color="error">
            </Chip>
            </Box>
          </Box>
        </CardContent>
      </Box>
    </Card>
  );
}
