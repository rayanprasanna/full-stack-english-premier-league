import {useEffect, useMemo, useRef, useState} from "react";
import FootballClubService from "../services/FootballClubService.jsx";
import {MaterialReactTable, useMaterialReactTable} from "material-react-table";
import {Box, IconButton, Tooltip} from "@mui/material";
import DetailsIcon from '@mui/icons-material/Details';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import DeleteIcon from '@mui/icons-material/Delete';
import {useNavigate} from "react-router-dom";

function FootballClubList() {

    const navigate = useNavigate();
    const [num1, setNum1] = useState(0);
    const [num2, setNum2] = useState(0);
    const [goal1, setGoal1] = useState(0);
    const [goal2, setGoal2] = useState(0);
    const columns = useMemo(
        //column definitions...
        () => [
            {
                accessorKey: 'name',
                header: 'Club',
                size: 200,
            },
            {
                accessorKey: 'numberOfMatchPlayed',
                header: 'Played',
                size:150,
            },
            {
                accessorKey: 'wins',
                header: 'Won',
                size:120,
            },
            {
                accessorKey: 'draws',
                header: 'Drawn',
                size:130,
            },
            {
                accessorKey: 'defeats',
                header: 'Lost',
                size:120,
            },
            {
                accessorKey: 'goalsFor',
                header: 'GF',
                size:100,
            },
            {
                accessorKey: 'goalsAgainst',
                header: 'GA',
                size:100,
            },
            {
                accessorKey: 'goalDifference',
                header: 'GD',
                size:100,
            },
            {
                accessorKey: 'points',
                header: 'Points',
                size:150,
            }
        ],
        [],
        //end
    );

    //optionally access the underlying visualizer instance
    const rowVirtualizerInstanceRef = useRef(null);

    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [sorting, setSorting] = useState([]);

    const clubDetails = (e, id) => {
        e.preventDefault();
        navigate(`/clubDetails/${id}`);
    }
    const addMatch = (e, id) => {
        e.preventDefault();
        navigate(`/addMatch/${id}`);
    }

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const fetchData = async () => {
                try {
                    const response = await FootballClubService.getFootballClubs();
                    setData(response.data);
                    console.log(response.data.name)
                } catch (error) {
                    console.log(error);
                }
            };
            fetchData().then(r => {
                console.log(r)
            });
            setIsLoading(false);
        }

    }, []);

    useEffect(() => {
        //scroll to the top of the table when the sorting changes
        try {
            rowVirtualizerInstanceRef.current?.scrollToIndex?.(0);
        } catch (error) {
            console.error(error);
        }
    }, [sorting]);

    function get_current_date(separator='-'){

        let newDate = new Date()
        let date = newDate.getDate();
        let month = newDate.getMonth() + 1;
        let year = newDate.getFullYear();

        return `${year}${separator}${month<10?`0${month}`:`${month}`}${separator}${date<10?`0${date}`:`${date}`}`
    }

    function randomNumberInRange(min, max) {
        // 👇️ Get the number between min (inclusive) and max (inclusive)
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    function addRandomMatch() {
        setNum1(randomNumberInRange(0, 19));
        setNum2(randomNumberInRange(0, 19));
        setGoal1(randomNumberInRange(0, 10));
        setGoal2(randomNumberInRange(0, 10));
        if (num1 !== num2){
            let match = {
                id: 0,
                date: get_current_date(),
                club1Name: data[num1].name,
                club2Name: data[num2].name,
                club1Score: goal1,
                club2Score: goal2,
            }
            FootballClubService.saveFootballMatch(data[num1].id, data[num2].id, match)
                .then((response) => {
                    console.log(response);
                    navigate("/footballClubList")
                })
                .catch((error) => {
                    console.log(error);
                });
            console.log(data[num1].name + " " + num1 + " " + data[num2].name + " " + num2);
            console.log(match)
        }
        //console.log(clubs[num1].name + " " + num1 + " " + clubs[num2].name + " " + num2);
    }

    const deleteClub = (e, id) => {
        e.preventDefault();
        FootballClubService.deleteClub(id).then((res) => {
            if (data) {
                setData((prevElement) => {
                    return prevElement.filter((footballClub) => footballClub.id !== id);
                });
                console.log(res)
            }
        });
    };

    const table = useMaterialReactTable({
        columns,
        data, //10,000 rows
        defaultDisplayColumn: { enableResizing: true },
        createDisplayMode: 'modal', //default ('row', and 'custom' are also available)
        editDisplayMode: 'modal', //default ('row', 'cell', 'table', and 'custom' are also available)
        enableEditing: true,
        enableBottomToolbar: false,
        enableColumnResizing: true,
        enableColumnVirtualization: true,
        enableGlobalFilterModes: true,
        enablePagination: false,
        enableColumnPinning: true,
        enableRowNumbers: true,
        enableRowVirtualization: true,
        muiTableContainerProps: { sx: { maxHeight: '600px' } },
        onSortingChange: setSorting,
        state: { isLoading, sorting },
        getRowId: (row) => row.id,
        renderRowActions: ({ row }) => (
            <Box sx={{ display: 'flex', gap: '1rem' }}>
                <Tooltip title="Details">
                    <IconButton>
                        <DetailsIcon onClick={(e) => {clubDetails(e, row.original.id)}}/>
                    </IconButton>
                </Tooltip>
                <Tooltip title="Add Match">
                    <IconButton color="success" >
                        <AddCircleIcon onClick={(e) => {addMatch(e, row.original.id)}}/>
                    </IconButton>
                </Tooltip>
                <Tooltip title="Delete Club">
                    <IconButton color="error" >
                        <DeleteIcon onClick={(e) => {deleteClub(e, row.original.id)}}/>
                    </IconButton>
                </Tooltip>
            </Box>
        ),
        renderTopToolbarCustomActions: () => (
            <Box sx={{display: 'flex', gap: '1rem'}}>
                <button
                    className="rounded bg-dark-indigo text-white px-6 py-2 font-semibold mx-5"
                    /*sx={{ backgroundColor: '#37003c'}}
                    variant="contained"*/
                    onClick={() => navigate("/addFootballClub")}>

                    Create New Club
                </button>
                <button
                    className="rounded bg-dark-indigo text-white px-6 py-2 font-semibold mx-5"
                    /*sx={{ backgroundColor: '#37003c'}}
                    variant="contained"*/
                    onClick={addRandomMatch}>
                    Add Random Match
                </button>
                <button
                    onClick={() => navigate("/allMatches")}
                    className="rounded bg-dark-indigo text-white px-6 py-2 font-semibold mx-5">
                    Match Details
                </button>
            </Box>
        ),
        rowVirtualizerInstanceRef, //optional
        rowVirtualizerOptions: {overscan: 5}, //optionally customize the row virtualizer
        columnVirtualizerOptions: {overscan: 2}, //optionally customize the column virtualizer
    });

    return(
        <div className="my-8">
            <MaterialReactTable table={table} />
        </div>
    );
}
export default FootballClubList