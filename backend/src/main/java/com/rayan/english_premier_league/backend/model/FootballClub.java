package com.rayan.english_premier_league.backend.model;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class FootballClub extends SportsClub{
    private int numberOfMatchPlayed;
    private int wins;
    private int draws;
    private int defeats;
    private int goalsFor;
    private int goalsAgainst;
    private int goalDifference;
    private int points;

    public FootballClub(long id, String name, String location, int numberOfMatchPlayed, int wins, int draws, int defeats, int goalsFor, int goalsAgainst, int goalDifference, int points) {
        super(id, name, location);
        this.numberOfMatchPlayed = numberOfMatchPlayed;
        this.wins = wins;
        this.draws = draws;
        this.defeats = defeats;
        this.goalsAgainst = goalsAgainst;
        this.goalsFor = goalsFor;
        this.goalDifference = goalDifference;
        this.points = points;
    }
}
