import React, {useEffect, useState} from 'react';
import './App.css';
import AirHttp from "./services/air.http";
import {NearestCity} from "./models/NearestCity";
import {Box, Grid, makeStyles, Typography, useMediaQuery, useTheme} from "@material-ui/core";

const airHttp = AirHttp.getInstance()
const useStyles = makeStyles(theme => ({
    main: {
        minWidth: '100%',
        minHeight: '100vh',
        backgroundColor: '#35baf6',
        color: '#fff',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: theme.spacing(3)
    },

    img: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    itemDown: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center'
    },
    subItemDown: {
        borderTop: '2px  solid #fff',
        padding: theme.spacing(2),
    },
    footer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        padding: theme.spacing(1)
    },
    header: {
        position: 'absolute',
        top: 0,
        right: 0,
        padding: theme.spacing(1)
    },
    borderContainer: {
        padding: theme.spacing(0.5),
        border: '0.5rem solid #fff',
        borderRadius: 10
    }
}))

function App() {
    const [nearestCity, setSearestCity] = useState<NearestCity>({})
    const classes = useStyles()
    const theme = useTheme()
    const isSm = useMediaQuery(theme.breakpoints.down('sm'))
    const handleInit = async () => {
        const data = await airHttp.getNearestCity()
        setSearestCity(data)
    }

    useEffect(() => {
        handleInit()
    }, [])
    return (
        <Grid container className={classes.main}>
            <Grid item xs={12} md={6}>
                <Grid container className={classes.borderContainer}>
                    <Grid item xs={12}>
                        <Typography variant='h3'>
                            {nearestCity.city}
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography align="center" variant='h1'>
                            {nearestCity.current?.weather?.tp}°C
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Box className={classes.img}>
                            <img src={`https://airvisual.com/images/${nearestCity.current?.weather?.ic}.png`} width={isSm ? 200 : 300} height={isSm ? 200 : 300} alt=""/>
                        </Box>
                    </Grid>
                    <Grid item xs={4} className={classes.itemDown}>
                        <div className={classes.subItemDown}>
                            <span>Hu</span> <br/>{nearestCity.current?.weather?.hu} %
                        </div>

                    </Grid>
                    <Grid item xs={4} className={classes.itemDown}>
                        <div className={classes.subItemDown}>
                            <span>Ws</span> <br/>{nearestCity.current?.weather?.ws} m/s
                        </div>

                    </Grid>
                    <Grid item xs={4} className={classes.itemDown}>
                        <div className={classes.subItemDown}>
                            <span>Pr</span> <br/>{nearestCity.current?.weather?.pr} hpa
                        </div>

                    </Grid>
                    <div className="footer flex">
                    </div>

                </Grid>
            </Grid>
            <Grid item className={classes.footer}>
                <Typography variant="h6">power by - Morales Reyes Miguel Angel</Typography>
            </Grid>
            <Grid item className={classes.header}>
                <Typography variant="h6">Weather api consumer</Typography>
            </Grid>

        </Grid>
    );
}

export default App;