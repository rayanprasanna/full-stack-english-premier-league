package com.rayan.english_premier_league.backend.controller;

import com.rayan.english_premier_league.backend.model.FootballClub;
import com.rayan.english_premier_league.backend.model.Match;
import com.rayan.english_premier_league.backend.services.LeagueManager;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@CrossOrigin("http://localhost:5173/")
@RestController
@RequestMapping("/premier_league/api/v1")
public class EnglishPremierLeagueController {
    private final LeagueManager leagueManager;

    public EnglishPremierLeagueController(LeagueManager leagueManager) {
        this.leagueManager = leagueManager;
    }
    @PostMapping("/clubs")
    public FootballClub createFootballClub(@RequestBody FootballClub footballClub){
        return leagueManager.createFootballClub(footballClub);
    }
    @GetMapping("/clubs")
    public List<FootballClub> getAllFootballClubs(){
        return leagueManager.getAllFootballClubs();
    }
    @GetMapping("/clubs/matches")
    public List<Match> getAllPlayedMatches(){
        return leagueManager.getAllPlayedMatches();
    }
    @DeleteMapping("/clubs/{id}")
    public ResponseEntity<Map<String, Boolean>> deleteClub(@PathVariable Long id){
        boolean deleted;
        deleted = leagueManager.deleteClub(id);
        Map<String,Boolean> response = new HashMap<>();
        response.put("deleted", deleted);
        return ResponseEntity.ok(response);
    }
    @GetMapping("/clubs/{id}")
    public ResponseEntity<FootballClub> getClubById(@PathVariable Long id) {
        FootballClub footballClub;
        footballClub = leagueManager.getClubById(id);
        return ResponseEntity.ok(footballClub);
    }
    @PostMapping("/clubs/matches/{id1}/{id2}")
    public Match addMatch(@PathVariable Long id1, @PathVariable Long id2, @RequestBody Match match){
        return leagueManager.addMatch(id1, id2, match);
    }
}
