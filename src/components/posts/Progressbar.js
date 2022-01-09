import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import LinearProgress, {
  linearProgressClasses,
} from "@mui/material/LinearProgress";
import { Typography } from "@mui/material";

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 10,
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor:
      theme.palette.grey[theme.palette.mode === "light" ? 200 : 800],
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: theme.palette.mode === "light" ? "#1a90ff" : "#308fe8",
  },
}));

export default function CustomizedProgressBars(props) {
  const percentage = (100 * props.collected) / props.target;

  return (
    <Box sx={{ flexGrow: 1, marginTop: "10px", ...props.style }}>
      <Typography
        variant={props.typography_variant}
        sx={{ marginBottom: "5px", display: "flex", alignItems: "center" }}
      >
        Progress: {props.collected} ETH / {props.target} {props.children} ETH
      </Typography>
      <BorderLinearProgress variant="determinate" value={percentage} />
    </Box>
  );
}
