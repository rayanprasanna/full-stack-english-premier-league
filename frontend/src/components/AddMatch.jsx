import TextField from "@mui/material/TextField";
import {useEffect, useState} from "react";
import FootballClubService from "../services/FootballClubService.jsx";
import {useNavigate, useParams} from "react-router-dom";

function AddMatch() {
    const { id } = useParams();
    let clubs2 = 0
    const navigate = useNavigate()
    const [club1, setClub1] = useState({
        id: id,
        name: "",
    })
    const [club2, setClub2] = useState([
        {
            id: 1,
            name: "Arsenal"
        }
    ]);
    const [match,setMatch] = useState({
        id: 0,
        date: "",
        club1Name: "",
        club2Name: "",
        club1Score: 0,
        club2Score: 0,
    })

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await FootballClubService.getClubById(club1.id);
                setClub1(response.data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchData().then(r => {
            console.log(r)
        });
    }, [club1.id]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await FootballClubService.getFootballClubs();
                setClub2(response.data);
                console.log(response.data)
            } catch (error) {
                console.log(error);
            }
        };
        fetchData().then(r => {
            console.log(r)
            //setClub(r.data)
        });
    }, []);

    function saveClub(e) {
        e.preventDefault();
        console.log(clubs2)
        console.log(match)
        FootballClubService.saveFootballMatch(club1.id, clubs2, match)
            .then((response) => {
                console.log(response);
                navigate("/footballClubList")
            })
            .catch((error) => {
                console.log(error);
            });
    }

    function reset(e){
        e.preventDefault()
        setMatch(
            {
                id: 0,
                date: "",
                club1Name: "",
                club2Name: "",
                club1Score: 0,
                club2Score: 0,
            }
        )
    }

    function handleChange(e) {
        const value = e.target.value;
        setMatch({ ...match, [e.target.name]: value });
        console.log(match)
    }

    function getClub2Id(e, id) {
        clubs2 = id
        console.log(clubs2)
    }

    return (
        <div className="container items-center max-w-2xl mx-auto shadow border-b">
            <div className="px-8 py-8">
                <div className="font-bold text-center justify-center items-center text-dark text-2xl tracking-wider">
                    <h1>Add Football Match</h1>
                </div>
                <div className="h-14 w-full my-4">
                    <TextField
                        color="secondary"
                        className="h-10 w-full border mt-2 px-2 py-2"
                        id="outlined-basic_1"
                        name="date"
                        label="Date of the Match"
                        value={match.date}
                        InputLabelProps={{ shrink: true, required: true }}
                        type="date"
                        onChange={(e) => handleChange(e)}
                    />
                </div>
                <div className="h-14 w-full my-4">
                    <TextField
                        color={"secondary"}
                        className="h-10 w-full border mt-2 px-2 py-2"
                        id="outlined-basic_2"
                        label="Club 1 Name"
                        name="club1Name"
                        type="text"
                        value={club1.name}
                        onClick={(e) => handleChange(e)}
                        variant="outlined"/>
                </div>
                <div className="h-14 w-full my-4">
                    <TextField
                        color={"secondary"}
                        className="h-10 w-full border mt-2 px-2 py-2"
                        id="outlined-select"
                        select
                        label="Club 2 Name"
                        name="club2Name"
                        onChange={(e) => handleChange(e)}
                        SelectProps={{
                            native: true,
                        }}
                    >
                        {club2.map((option) => (
                            <option
                                key={option.id}
                                name="club2Name"
                                onClick={(e) =>getClub2Id(e, option.id)}
                                onSelect={(e) => handleChange(e)}
                                value={option.name}>
                                {option.name}
                            </option>
                        ))}
                    </TextField>
                </div>
                <div className="h-14 w-full my-4">
                    <TextField
                        color={"secondary"}
                        className="h-10 w-full border mt-2 px-2 py-2"
                        id="outlined-basic_3"
                        label="Club 1 Score"
                        type="number"
                        name="club1Score"
                        value={match.club1Score}
                        onChange={(e) => handleChange(e)}
                        variant="outlined"/>
                </div>
                <div className="h-14 w-full my-4">
                    <TextField
                        color={"secondary"}
                        className="h-10 w-full border mt-2 px-2 py-2"
                        id="outlined-basic_4"
                        label="Club 2 Score"
                        name="club2Score"
                        type="number"
                        value={match.club2Score}
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

export default AddMatch