package com.rayan.english_premier_league.backend.services;

import com.rayan.english_premier_league.backend.model.FootballClub;
import com.rayan.english_premier_league.backend.model.Match;

import java.util.List;

public interface LeagueManager {
    FootballClub createFootballClub(FootballClub footballClub);

    List<FootballClub> getAllFootballClubs();

    boolean deleteClub(Long id);

    FootballClub getClubById(Long id);

    Match addMatch(Long id1, Long id2, Match match);

    List<Match> getAllPlayedMatches();
}
