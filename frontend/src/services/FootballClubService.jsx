import axios from "axios";

const PREMIER_LEAGUE_API_BASE_URL="http://localhost:8080/premier_league/api/v1/clubs";

class  FootballClubService {
    saveFootballClub(club){
        return axios.post(PREMIER_LEAGUE_API_BASE_URL, club);
    }
    saveFootballMatch(id1, id2, match){
        return axios.post(PREMIER_LEAGUE_API_BASE_URL + "/matches" + "/" + id1 + "/" + id2, match)
    }
    getFootballClubs(){
        return axios.get(PREMIER_LEAGUE_API_BASE_URL);
    }

    getAllPlayedMatched(){
        return axios.get(PREMIER_LEAGUE_API_BASE_URL + "/matches")
    }

    deleteClub(id) {
        return axios.delete(PREMIER_LEAGUE_API_BASE_URL + "/" + id);
    }

    getClubById(id) {
        return axios.get(PREMIER_LEAGUE_API_BASE_URL + "/" + id);
    }
}
export default new FootballClubService();