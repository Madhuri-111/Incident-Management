import { Box, Button, Container, TextField, Typography } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";

const ForgetPassword = () => {

    const [email, setEmail] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [data, setData] = useState();

    async function handleSubmit(){
        try{
            const response = await axios.get(`http://localhost:8080/api/${email}`);
            console.log(response.data);
            setData(response.data);
            setErrorMessage('');

        }
        catch(err){
            setErrorMessage("Email not found. Please ");
            setData();
        }
    }
    return(
    <Container maxWidth="xs" sx={{display: "flex", flexDirection: "column", alignItems: "center"}}>
        {!data ? <Box><Typography sx={{ mt: 8 }}>Please enter your Email id: </Typography>
        <TextField
                fullWidth
                label="Email"
                name="email"
                onChange={(e) => setEmail(e.target.value)}
                value={email} /><Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    onClick={handleSubmit}
                >
                    Submit
                </Button></Box>
           :
                    <Typography sx={{mt: 2}} variant="h6" align="center">
                     Password reset link is sent to your email!
                    </Typography>

    }
        

        {errorMessage && (
                    <Typography color="error" variant="body2" align="center">
                      {errorMessage}
                      <Link to="/signup" style={{ textDecoration: 'none', color: '#1976d2' }}>
                        Sign Up
                    </Link>
                    </Typography>
                    
                  )}

                  
        
    </Container>
    ); 
}

export default ForgetPassword;

