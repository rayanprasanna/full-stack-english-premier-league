import './App.css'
import NavigationBar from "./components/NavigationBar.jsx";
import AddFootballClub from "./components/AddFootballClub.jsx";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import FootballClubList from "./components/FootballClubList.jsx";
import ClubDetails from "./components/ClubDetails.jsx";
import AddMatch from "./components/AddMatch.jsx";
import MatchList from "./components/MatchList.jsx";

function App() {

    return (
        <>
            <BrowserRouter>
                <NavigationBar/>
                <Routes>
                    <Route index element={<FootballClubList/>}/>
                    <Route path="/" element={<FootballClubList/>}/>
                    <Route path="/footballClubList" element={<FootballClubList/>}/>
                    <Route path="/addFootballClub" element={<AddFootballClub/>}/>
                    <Route path="/addMatch/:id" element={<AddMatch/>}/>
                    <Route path="/clubDetails/:id" element={<ClubDetails/>}/>
                    <Route path="/allMatches" element={<MatchList/>}/>
                </Routes>
            </BrowserRouter>
        </>
    )
}

export default App
