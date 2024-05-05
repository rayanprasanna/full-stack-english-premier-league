package com.rayan.english_premier_league.backend.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name = "football_clubs")
public class FootballClubEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private String name;
    private String location;
    private int numberOfMatchPlayed;
    private int wins;
    private int draws;
    private int defeats;
    private int goalsFor;
    private int goalsAgainst;
    private int goalDifference;
    private int points;
}
