import {TextField} from "@mui/material";
import {useState} from "react";
import FootballClubService from "../services/FootballClubService.jsx";
import {useNavigate} from "react-router-dom";

function AddFootballClub() {
    const navigate = useNavigate()
    const [club, setClub] = useState({
        id: "",
        name: "",
        location: "",
    });

    const handleChange = (e) => {
        const value = e.target.value;
        setClub({ ...club, [e.target.name]: value });
    };

    const saveClub = (e) => {
        e.preventDefault();
        FootballClubService.saveFootballClub(club)
            .then((response) => {
                console.log(response);
                navigate("/footballClubList")
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const reset = (e) => {
        e.preventDefault();
        setClub({
            id: "",
            name: "",
            location: "",
        });
    };

    return(
        <div className="container items-center max-w-2xl mx-auto shadow border-b">
            <div className="px-8 py-8">
                <div className="font-bold text-center justify-center items-center text-dark text-2xl tracking-wider">
                    <h1>Add Football Club</h1>
                </div>
                <div className="h-14 w-full my-4">
                    <TextField
                        color={"secondary"}
                        className="h-10 w-full border mt-2 px-2 py-2"
                        id="outlined-basic"
                        label="Club Name"
                        name="name"
                        value={club.name}
                        onChange={(e) => handleChange(e)}
                        variant="outlined"/>
                </div>
                <div className="h-14 w-full my-4">
                    <TextField
                        color={"secondary"}
                        className="h-10 w-full border mt-2 px-2 py-2"
                        id="outlined-basic"
                        label="Location"
                        name="location"
                        value={club.location}
                        onChange={(e) => handleChange(e)}
                        variant="outlined"/>
                </div>
                <div className="items-center justify-center h-14 w-full my-4 space-x-4 pt-4">
                    <button
                        onClick={saveClub}
                        className="rounded text-light font-semibold bg-green hover:bg-dark-green py-2 px-6">
                        Save
                    </button>
                    <button
                        onClick={reset}
                        className="rounded text-light font-semibold bg-red hover:bg-dark-red py-2 px-6">
                        Clear
                    </button>
                </div>
            </div>
        </div>
    );
}

export default AddFootballClub