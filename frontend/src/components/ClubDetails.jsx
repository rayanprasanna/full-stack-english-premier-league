import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import FootballClubService from "../services/FootballClubService.jsx";
import {styled} from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";

function ClubDetails() {
    const { id } = useParams();
    const navigate = useNavigate()
    const [club, setClub]= useState({
        id: id,
        name: "",
        location: "",
        numberOfMatchPlayed: 0,
        wins: 0,
        draws: 0,
        defeats: 0,
        goalsFor: 0,
        goalsAgainst: 0,
        goalDifference: 0,
        points: 0,
    })
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await FootballClubService.getClubById(club.id);
                setClub(response.data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchData().then(r => {
            console.log(r)
        });
    }, [club.id]);

    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(1.5),
        textAlign: 'left',
        color: "#000000",
    }));

    function goBack() {
        navigate("/footballClubList")
    }

    return(
        <div className="container items-center max-w-2xl mx-auto shadow border-b">
            <div className="px-8 py-8">
                <div className="font-bold text-center justify-center items-center text-dark text-2xl tracking-wider">
                    <h1>{club.name} Club from {club.location}</h1>
                </div>
                <div className="px-6 py-4">
                    <Box sx={{width: '100%'}}>
                        <Grid container rowSpacing={1} columnSpacing={{xs: 1, sm: 2, md: 3}}>
                            <Grid item xs={6}>
                                <Item>Matches Played</Item>
                            </Grid>
                            <Grid item xs={6}>
                                <Item>{club.numberOfMatchPlayed}</Item>
                            </Grid>
                            <Grid item xs={6}>
                                <Item>Wins</Item>
                            </Grid>
                            <Grid item xs={6}>
                                <Item>{club.wins}</Item>
                            </Grid>
                            <Grid item xs={6}>
                                <Item>Draws</Item>
                            </Grid>
                            <Grid item xs={6}>
                                <Item>{club.draws}</Item>
                            </Grid>
                            <Grid item xs={6}>
                                <Item>Defeats</Item>
                            </Grid>
                            <Grid item xs={6}>
                                <Item>{club.defeats}</Item>
                            </Grid>
                            <Grid item xs={6}>
                                <Item>Goals For</Item>
                            </Grid>
                            <Grid item xs={6}>
                                <Item>{club.goalsFor}</Item>
                            </Grid>
                            <Grid item xs={6}>
                                <Item>Goals Against</Item>
                            </Grid>
                            <Grid item xs={6}>
                                <Item>{club.goalsAgainst}</Item>
                            </Grid>
                            <Grid item xs={6}>
                                <Item>Goals Difference</Item>
                            </Grid>
                            <Grid item xs={6}>
                                <Item>{club.goalDifference}</Item>
                            </Grid>
                            <Grid item xs={6}>
                                <Item>Points</Item>
                            </Grid>
                            <Grid item xs={6}>
                                <Item>{club.points}</Item>
                            </Grid>
                        </Grid>
                    </Box>
                </div>
                <div className="items-center justify-center h-14 w-full my-4 space-x-4 pt-4">
                    <button
                        onClick={goBack}
                        className="rounded text-light font-semibold bg-blue hover:bg-dark-blue py-2 px-6 w-full">
                        Back
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ClubDetails;