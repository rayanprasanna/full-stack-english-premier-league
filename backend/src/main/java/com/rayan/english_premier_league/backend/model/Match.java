package com.rayan.english_premier_league.backend.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
@AllArgsConstructor
public class Match {
    private long id;
    private String date;
    private String club1Name;
    private String club2Name;
    private int club1Score;
    private int club2Score;
}
