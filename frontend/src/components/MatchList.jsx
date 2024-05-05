import {useEffect, useMemo, useState} from "react";
import FootballClubService from "../services/FootballClubService.jsx";
import {MaterialReactTable} from "material-react-table";

function MatchList() {
    const [playedMatch, setPlayedMatch] = useState([])
    const columns = useMemo(
        //column definitions...
        () => [
            {
                accessorKey: 'date',
                header: 'Date',
            },
            {
                accessorKey: 'club1Name',
                header: 'Home Club',
            },
            {
                accessorKey: 'club1Score',
                header: 'Home Club Score',
            },
            {
                accessorKey: 'club2Name',
                header: 'Away Club',
            },
            {
                accessorKey: 'club2Score',
                header: 'Away Club Score',
            },
        ],
        [],
        //end
    );
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await FootballClubService.getAllPlayedMatched();
                setPlayedMatch(response.data);
                console.log(response.data.name)
            } catch (error) {
                console.log(error);
            }
        };
        fetchData().then(r => {
            console.log(r)
        });
    }, []);
    return(
        <div className="my-8">
            <MaterialReactTable
                columns={columns}
                data={playedMatch}
                enableGlobalFilterModes
                initialState={{
                    showGlobalFilter: true,
                }}
                positionGlobalFilter="left"
                muiSearchTextFieldProps={{
                    placeholder: `Search ${playedMatch.length} rows`,
                    sx: { minWidth: '300px' },
                    variant: 'outlined',
                }}
            />
        </div>
    );
}
export default MatchList;