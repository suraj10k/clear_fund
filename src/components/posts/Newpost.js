import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Typography } from "@mui/material";
import { DatePicker } from "@mui/lab";
import Mydatepicker from "./MyDatePicker";

export default function FormPropsTextFields() {
  return (
    <>
      <Typography variant="h4" mt={2} ml={5}>
        Add new project
      </Typography>
      <Box
        component="form"
        sx={{
          "& .MuiTextField-root": { m: 1, width: "75ch" },
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          margin: "auto auto",
        }}
        noValidate
        autoComplete="off"
      >
        <div>
          <TextField
            required
            id="title"
            label="Project title"
            defaultValue="Hello World"
          />
          <TextField required id="description" label="Project description" />
          <TextField id="wallet-address" label="Wallet address" required />
          <Mydatepicker />
        </div>
      </Box>
    </>
  );
}
