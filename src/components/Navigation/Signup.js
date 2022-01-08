import { Button, Card, Input, Paper, TextField, Typography } from '@mui/material'
import React from 'react'

const Signup = () => {
    const preventProp = (e) => {
        e.stopPropagation();
    }

    const handleSubmit = (e) => {
        e.stopPropagation();
    }

    return (
        <Paper sx={{ backgroundColor: "white", padding: "20px 50px" }}>
            <Typography variant='h5'>Signup</Typography>
            <form action="" style={{ display: "flex", flexDirection: "column" }}>
            <TextField variant="outlined" label="Email" onClick={preventProp} />
            <TextField variant="outlined" label="Password" onClick={preventProp} />
                <TextField variant="outlined" label="Wallet Address" onClick={preventProp} />
                <Button onClick={handleSubmit} variant='contained'>submit</Button>
            </form>
        </Paper>
    )
}

export default Signup
