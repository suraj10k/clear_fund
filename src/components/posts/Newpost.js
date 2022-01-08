import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Button, Typography } from "@mui/material";
import "./Newpost.css";

export default function NewPost() {
  const [formData, setFormData] = React.useState({
    title: "Hello World",
    description: "",
    deadline: "",
    wallet_address: "",
    'confirm_wallet_address': "",
    target: 1,
  });

  const changeHandler = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    console.log(formData);
  }

  return (
    <div className="container">
      <Typography variant="h4" mb={5}>
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
            value={formData.title}
            label="Project title"
            onChange={changeHandler}
          />
          <TextField
            value={formData.description}
            required
            id="description"
            label="Project description"
            onChange={changeHandler}
          />
          <TextField
            value={formData.wallet_address}
            type="password"
            id="wallet_address"
            label="Wallet address"
            required
            onChange={changeHandler}
          />
          <TextField
            value={formData.confirm_wallet_address}
            id="confirm_wallet_address"
            label="Confirm Wallet address"
            required
            error={formData.wallet_address !== formData.confirm_wallet_address}
            helperText="Addresses should match."
            onChange={changeHandler}
          />
          <TextField
            id="deadline"
            label="Deadline"
            type="date"
            value={formData.deadline}
            sx={{ width: 220 }}
            InputLabelProps={{
              shrink: true,
            }}
            required
            onChange={changeHandler}
          />
          <TextField
            value={formData.target}
            id="target"
            label="Target"
            required
            onChange={changeHandler}
          />
        </div>
      </Box>
      <Button onClick={submitHandler} variant="contained">submit</Button>
    </div>
  );
}
