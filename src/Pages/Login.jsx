import React, { useContext, useState } from 'react';
import { Paper, Box, Grid, Avatar, CssBaseline, TextField, Typography } from "@mui/material"
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { SquareButton, colors } from '../Theme';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../firebase';
import { RecaptchaVerifier, signInWithEmailAndPassword, signInWithPhoneNumber } from 'firebase/auth';
import { Helmet } from 'react-helmet';
import { AuthContext } from '../Context/AuthContext';
import logo from '../Components/logo.png'


export default function Login() {

  const Navigate = useNavigate()


  // const setUp = () => {
  //   window.recaptchaVerifier = new RecaptchaVerifier('recaptcha-container', {
  //     'size': 'invisible',
  //     'callback': (response) => {
  //       console.log("Captcha Resolved");
  //       handleSubmit();
  //     }
  //   }, auth);
  // }

  const [countryCode, setCode] = React.useState("+91")
  const [phone, setPhone] = React.useState("")
  const finalPhone = countryCode + phone

  const handleSubmit = async (e) => {
    e.preventDefault()

    const data = new FormData(e.currentTarget)

    if (method === "phone") {
      // setUp()

      // const phoneNumber = finalPhone;
      // const appVerifier = window.recaptchaVerifier;

      // signInWithPhoneNumber(auth, phoneNumber, appVerifier)
      //   .then((confirmationResult) => {
      //     const code = prompt(`Enter Otp Sent to ${phoneNumber}`);
      //     confirmationResult.confirm(code).then((result) => {
      //       const user = result.user;
      //       console.log(user)
      //       Navigate("/")
      //     }).catch((error) => {
      //       // User couldn't sign in (bad verification code?)
      //       // ...
      //       alert(error)
      //     });
      //     window.confirmationResult = confirmationResult;
      //   }).catch((error) => {
      //     // Error; SMS not sent
      //     // ...
      //     alert(error)
      //   });
    }
    else {
      const email = data.get("email")
      const password = data.get("password")

      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in 
          const user = userCredential.user;
          Navigate("/")
          // ...
        })
        .catch((error) => {
          alert(error.code.replace("-"," "))
        });
    }


  }


  const [method, setMethod] = useState("email")
  const { CurrentUser } = useContext(AuthContext)
  const Guest = CurrentUser?.isAnonymous

  return (
    <Grid container component="main" sx={{ height: '100vh' }}>
      <Helmet><title>Login | Savarrior</title></Helmet>
      {!Guest && CurrentUser && Navigate("/")}
      <CssBaseline />
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        sx={{
          backgroundImage: 'url(https://media.istockphoto.com/id/667055944/photo/portrait-of-a-black-goat-without-horns-farm-animal.jpg?s=170667a&w=0&k=20&c=NXUNlUntCxCta4KFWB4uBjE02Band8FkNAFuEwYxzkc=)',
          backgroundRepeat: 'no-repeat',
          backgroundColor: (t) =>
            t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <Link to="/"><Box sx={{ position: "absolute", background: "#fff", p: '10px', borderRadius: "5px", top: '5px', left: '5px' }}><img src={logo} width={"110px"} alt="Savarrior" /></Box></Link>
      </Grid>
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <Box
          sx={{
            my: 8,
            mx: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: colors.primary }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
            {method !== "phone" &&
              <>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  autoFocus
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                />
              </>}
            {method === "phone" &&
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Box sx={{ background: "#f1f1f1", p: "15px", borderRadius: "15px",textAlign:"center" }}>
                <Typography variant="h6" sx={{ fontWeight: "600", fontSize: "17px" }}>We are Working on OTP Verification Method, It will be Available Soon</Typography>
                </Box>
              </Box>
            }
            <SquareButton
              type="submit"
              disabled={method === "phone" ? true : false}
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
             {method === "phone" ? "OTP Method Coming Soon" : "Login"}
            </SquareButton>
            <SquareButton
              fullWidth
              variant="contained"
              sx={{ mt: 1, mb: 2 }}
              onClick={() => setMethod(method === "phone" ? "email" : "phone")}
            >
              Or Use {method === "phone" ? "Email" : "Phone Number"}
            </SquareButton>
            <Grid container sx={{ justifyContent: "center" }}>
              {/* <Grid item xs>
                  <Link to="/" style={{color:colors.primary}}>
                    Forgot password?
                  </Link>
                </Grid> */}
              <Grid item>
                Don’t have an account?&nbsp;
                <Link to="/register" style={{ color: colors.primary }}>
                  Register
                </Link>
              </Grid>
            </Grid>
          </Box>
          <div id="recaptcha-container"></div>
        </Box>
      </Grid>
    </Grid>
  );
}