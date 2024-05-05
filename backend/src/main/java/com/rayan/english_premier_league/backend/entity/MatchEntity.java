package com.rayan.english_premier_league.backend.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name = "league_matches")
public class MatchEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private String date;
    private String club1Name;
    private String club2Name;
    private int club1Score;
    private int club2Score;
}
