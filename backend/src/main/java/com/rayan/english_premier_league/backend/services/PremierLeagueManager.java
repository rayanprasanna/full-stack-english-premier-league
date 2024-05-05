package com.rayan.english_premier_league.backend.services;

import com.rayan.english_premier_league.backend.entity.FootballClubEntity;
import com.rayan.english_premier_league.backend.entity.MatchEntity;
import com.rayan.english_premier_league.backend.model.FootballClub;
import com.rayan.english_premier_league.backend.model.Match;
import com.rayan.english_premier_league.backend.repository.FootballClubRepository;
import com.rayan.english_premier_league.backend.repository.LeagueMatchRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PremierLeagueManager implements LeagueManager{

    private final FootballClubRepository footballClubRepository;
    private final LeagueMatchRepository leagueMatchRepository;

    public PremierLeagueManager(FootballClubRepository footballClubRepository, LeagueMatchRepository leagueMatchRepository) {
        this.footballClubRepository = footballClubRepository;
        this.leagueMatchRepository = leagueMatchRepository;
    }

    @Override
    public FootballClub createFootballClub(FootballClub footballClub) {
        FootballClubEntity footballClubEntity = new FootballClubEntity();
        BeanUtils.copyProperties(footballClub, footballClubEntity);
        footballClubRepository.save(footballClubEntity);
        return footballClub;
    }

    @Override
    public List<FootballClub> getAllFootballClubs() {
        List<FootballClubEntity> footballClubEntities = footballClubRepository.findAll(
                Sort.by("points").descending().and(Sort.by("goalDifference").descending()));
        return footballClubEntities
                .stream()
                .map(premier_league_fc -> new FootballClub(
                        premier_league_fc.getId(),
                        premier_league_fc.getName(),
                        premier_league_fc.getLocation(),
                        premier_league_fc.getNumberOfMatchPlayed(),
                        premier_league_fc.getWins(),
                        premier_league_fc.getDraws(),
                        premier_league_fc.getDefeats(),
                        premier_league_fc.getGoalsFor(),
                        premier_league_fc.getGoalsAgainst(),
                        premier_league_fc.getGoalDifference(),
                        premier_league_fc.getPoints()))
                .toList();
    }

    @Override
    public boolean deleteClub(Long id) {
        FootballClubEntity footballClub = footballClubRepository.findById(id).get();
        footballClubRepository.delete(footballClub);
        return true;
    }

    @Override
    public FootballClub getClubById(Long id) {
        FootballClubEntity footballClubEntity
                = footballClubRepository.findById(id).get();
        FootballClub footballClub = new FootballClub(
                footballClubRepository.findById(id).get().getId(),
                footballClubRepository.findById(id).get().getName(),
                footballClubRepository.findById(id).get().getLocation(),
                footballClubRepository.findById(id).get().getNumberOfMatchPlayed(),
                footballClubRepository.findById(id).get().getWins(),
                footballClubRepository.findById(id).get().getDraws(),
                footballClubRepository.findById(id).get().getDefeats(),
                footballClubRepository.findById(id).get().getGoalsAgainst(),
                footballClubRepository.findById(id).get().getGoalsFor(),
                footballClubRepository.findById(id).get().getGoalDifference(),
                footballClubRepository.findById(id).get().getPoints());
        BeanUtils.copyProperties(footballClubEntity, footballClub);
        return footballClub;
    }

    @Override
    public Match addMatch(Long id1, Long id2, Match match) {
        MatchEntity matchEntity = new MatchEntity();

        FootballClubEntity footballClubEntity1 = footballClubRepository.findById(id1).get();
        FootballClubEntity footballClubEntity2 = footballClubRepository.findById(id2).get();

        if (match.getClub1Score() == match.getClub2Score()){
            footballClubEntity1.setNumberOfMatchPlayed(footballClubEntity1.getNumberOfMatchPlayed() + 1);
            footballClubEntity1.setDraws(footballClubEntity1.getDraws() + 1);
            footballClubEntity1.setPoints(footballClubEntity1.getPoints() + 1);
            footballClubEntity1.setGoalsFor(footballClubEntity1.getGoalsFor() + match.getClub1Score());
            footballClubEntity1.setGoalsAgainst(footballClubEntity1.getGoalsAgainst() + match.getClub1Score());

            footballClubEntity2.setNumberOfMatchPlayed(footballClubEntity2.getNumberOfMatchPlayed() + 1);
            footballClubEntity2.setDraws(footballClubEntity2.getDraws() + 1);
            footballClubEntity2.setPoints(footballClubEntity2.getPoints() + 1);
            footballClubEntity2.setGoalsFor(footballClubEntity2.getGoalsFor() + match.getClub2Score());
            footballClubEntity2.setGoalsAgainst(footballClubEntity2.getGoalsAgainst() + match.getClub2Score());
        } else if (match.getClub1Score() > match.getClub2Score()) {
            footballClubEntity1.setNumberOfMatchPlayed(footballClubEntity1.getNumberOfMatchPlayed() + 1);
            footballClubEntity1.setWins(footballClubEntity1.getWins() + 1);
            footballClubEntity1.setGoalsFor(footballClubEntity1.getGoalsFor() + match.getClub1Score());
            footballClubEntity1.setGoalsAgainst(footballClubEntity1.getGoalsAgainst() + match.getClub2Score());
            footballClubEntity1.setGoalDifference(footballClubEntity1.getGoalDifference() + (match.getClub1Score() - match.getClub2Score()));
            footballClubEntity1.setPoints(footballClubEntity1.getPoints() + 3);

            footballClubEntity2.setNumberOfMatchPlayed(footballClubEntity2.getNumberOfMatchPlayed() + 1);
            footballClubEntity2.setDefeats(footballClubEntity2.getDefeats() + 1);
            footballClubEntity2.setGoalsFor(footballClubEntity2.getGoalsFor() + match.getClub2Score());
            footballClubEntity2.setGoalsAgainst(footballClubEntity2.getGoalsAgainst() + match.getClub1Score());
            footballClubEntity2.setGoalDifference(footballClubEntity2.getGoalDifference() + (match.getClub2Score() - match.getClub1Score()));
        }else {
            footballClubEntity2.setNumberOfMatchPlayed(footballClubEntity2.getNumberOfMatchPlayed() + 1);
            footballClubEntity2.setWins(footballClubEntity2.getWins() + 1);
            footballClubEntity2.setGoalsFor(footballClubEntity2.getGoalsFor() + match.getClub2Score());
            footballClubEntity2.setGoalsAgainst(footballClubEntity2.getGoalsAgainst() + match.getClub1Score());
            footballClubEntity2.setGoalDifference(footballClubEntity2.getGoalDifference() + (match.getClub2Score() - match.getClub1Score()));
            footballClubEntity2.setPoints(footballClubEntity2.getPoints() + 3);

            footballClubEntity1.setNumberOfMatchPlayed(footballClubEntity1.getNumberOfMatchPlayed() + 1);
            footballClubEntity1.setDefeats(footballClubEntity1.getDefeats() + 1);
            footballClubEntity1.setGoalsFor(footballClubEntity1.getGoalsFor() + match.getClub1Score());
            footballClubEntity1.setGoalsAgainst(footballClubEntity1.getGoalsAgainst() + match.getClub2Score());
            footballClubEntity1.setGoalDifference(footballClubEntity1.getGoalDifference() + (match.getClub1Score() - match.getClub2Score()));
        }
        footballClubRepository.save(footballClubEntity1);
        footballClubRepository.save(footballClubEntity2);

        BeanUtils.copyProperties(match, matchEntity);
        leagueMatchRepository.save(matchEntity);
        return match;
    }

    @Override
    public List<Match> getAllPlayedMatches() {
        List<MatchEntity> matchEntities = leagueMatchRepository.findAll(Sort.by("date").ascending());
        return matchEntities
                .stream()
                .map(premier_league_match -> new Match(
                        premier_league_match.getId(),
                        premier_league_match.getDate(),
                        premier_league_match.getClub1Name(),
                        premier_league_match.getClub2Name(),
                        premier_league_match.getClub1Score(),
                        premier_league_match.getClub2Score())).toList();
    }
}
