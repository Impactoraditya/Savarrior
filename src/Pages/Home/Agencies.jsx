import { Divider, Typography, Box, Grid } from '@mui/material'
import React from 'react'
import AgencyCard from '../../Components/AgencyCard'
import { SquareButton, colors } from '../../Theme'
import { AgencyList } from '../../Data/Agency'


const Agencies = () => {
    return (
        <Box sx={{ textAlign: "center", p: "5rem 2rem" }}>
            <Typography variant="h4" sx={{ fontWeight: "800", letterSpacing: "-0.04rem",textTransform:"uppercase" }}>Connect with NGOs</Typography>
            <Typography variant="body1" sx={{ my: "5px", fontWeight: "400", fontSize: "18px" }}>Help the Recent reported Rescues</Typography>
            <Divider sx={{ width: "80px", margin: "auto", height: '4px', my: "1rem", background: colors.primary }} />
            <Grid container sx={{justifyContent:"center",py:"2rem"}}>
                {AgencyList.slice(0,3).map((agency) => (
                    <Grid item>
                        <AgencyCard agency={agency} />
                    </Grid>
                ))}
            </Grid>
            <SquareButton variant="contained" sx={{mt:"1.2rem",p:"10px 15px",borderRadius:"4px"}}>Explore More NGOs</SquareButton>
        </Box>
    )
}

export default Agencies