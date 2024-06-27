import { CallRounded, EmailRounded, LocationOnRounded, Close, Web } from '@mui/icons-material'
import { Grid, Box, Typography, Divider, Chip, Modal, Card, IconButton } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { colors, Button } from '../../Theme'
import { db } from '../../firebase'
import { doc, onSnapshot } from "firebase/firestore";
import { Helmet } from 'react-helmet'

const SingleAgency = ({ url }) => {


  const { id, slug } = useParams()
  const [ngo, setNgo] = useState({})
  const [success, setSuccess] = React.useState(false)

  const NgoTitle = slug.charAt(0).toUpperCase() + slug.slice(1).split('-').join(' ')


  useEffect(() => {
    const ngo = onSnapshot(doc(db, "ngos", id), (doc) => {
      doc.exists() && setNgo(doc.data())
    })
    return () => {
      ngo()
    }
  }, [id])


  return (
    <Grid container sx={{ marginTop: { md: "5rem", xs: "3rem" }, padding: "3rem 1rem", justifyContent: "center" }}>
      <Helmet><title>{NgoTitle} | {url}</title></Helmet>
      <Grid item sx={{ width: { md: "50%", xs: "100%" } }}>
        <Box
          component="img"
          sx={{
            minHeight: { xs: 1, md: "70vh" },
            width: '100%',
            objectFit: "cover",
            borderRadius: "5px"
          }}
          alt={ngo?.name}
          src={ngo?.images?.img2}
        />
          <Grid sx={{position:"fixed",right:20,bottom:20,zIndex:"999"}}>
        <Button variant="contained"  sx={{ marginTop: "1.5rem"}} onClick={() => setSuccess(true)}>Need Help?</Button>
        </Grid>
      </Grid>
      <Grid item sx={{ width: { md: "40%", xs: "100%" }, px: { md: "1rem", xs: "0" }, pl: { md: "2rem", xs: "0" }, mt: { md: 0, xs: "1rem" } }}>
        <Box sx={{ background: "#f1f1f1", p: "10px", borderRadius: "5px" }}>
          <Typography variant="h5" sx={{ fontWeight: "800", textTransform: "uppercase", display: "flex", alignItems: "center" }}><Box component="img" width="32px" height="32px" sx={{ objectFit: "contain", mr: "4px", borderRadius: "50%", border: `2px solid ${colors.primary}` }} src={ngo.userProfileImg} />{ngo.name}</Typography>
          <Typography variant="h6" sx={{ display: "flex", alignItems: "flex-start", fontWeight: "600",fontSize:"17px" }}><LocationOnRounded sx={{ color: colors.primaryicons, mt: "4px", mr: "7px", width: "32px", mr: "4px", borderRadius: "50%" }} />{ngo.location}</Typography>
        </Box>
        <Typography variant="h6" sx={{ mt: "2rem", fontWeight: "700", textTransform: "uppercase" }}>Animals They Treat</Typography>
        <Divider sx={{ width: "80px", height: '4px', my: "1rem", background: colors.primary }} />
        {ngo.animals?.map((ser) => (
          <Chip label={ser} sx={{ mr: "4px", fontSize: "15px" }} variant="filled" color="success" key={ser} />
        ))}
        <Typography variant="h6" sx={{ mt: "2rem", fontWeight: "700", textTransform: "uppercase" }}>Contact {ngo.name}</Typography>
        <Divider sx={{ width: "80px", height: '4px', my: "1rem", background: colors.primary }} />
        <Typography sx={{ display: "flex", mt: "10px", alignItems: "center", fontSize: "18px" }}><Web sx={{ color: colors.primaryicons, borderRadius: "50%", p: "5px", mr: "7px", border: `2px solid ${colors.primary}` }} />{ngo.web}</Typography>
        <Typography sx={{ display: "flex", mt: "10px", alignItems: "center", fontSize: "18px" }}><CallRounded sx={{ color: colors.primaryicons, borderRadius: "50%", p: "5px", mr: "7px", border: `2px solid ${colors.primary}` }} />{ngo.phoneNumber}</Typography>
        <Typography sx={{ display: "flex", mt: "10px", alignItems: "center", fontSize: "18px" }}><EmailRounded sx={{ color: colors.primaryicons, borderRadius: "50%", p: "5px", mr: "7px", border: `2px solid ${colors.primary}` }} />{ngo.email}</Typography>
        <Typography variant="h6" sx={{ mt: "2rem", fontWeight: "700", textTransform: "uppercase" }}>Their Services</Typography>
        <Divider sx={{ width: "80px", height: '4px', my: "1rem", background: colors.primary }} />
        {ngo.services?.map((ser) => (
          <Chip label={ser} sx={{ mr: "4px", fontSize: "15px" }} variant="filled" color="success" key={ser} />
        ))}
      </Grid>
      <Modal open={success} onClose={() => setSuccess(false)}
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
        <Card sx={{ position: "relative", width: { md: "50%", xs: '80%' }, minHeight: { md: "50%", xs: "65%" }, borderRadius: "5px", p: "1rem", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
          <IconButton onClick={() => setSuccess(false)} sx={{ position: "absolute", top: "10px", right: "10px" }}>
            <Close />
          </IconButton>
          <img src="https://img.freepik.com/premium-vector/animal-rescue-pet-protection-hand-paw-as-symbol-support-love-pets-tiny-people-protect_501813-1519.jpg" alt="" height="200px" />
          <Typography variant="h6" sx={{ fontWeight: "600", textAlign: "center", pt: "10px" }}>Hi Dear, Animal Lover You Can Directly Contact {ngo.name} for Help. W'll make this Easy Soon.</Typography>
        </Card>
      </Modal>
    </Grid>
  )
}

export default SingleAgency