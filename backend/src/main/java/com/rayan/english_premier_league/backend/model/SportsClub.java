package com.rayan.english_premier_league.backend.model;

import lombok.Getter;

@Getter
public abstract class SportsClub {
    private final long id;
    private final String name;
    private final String location;

    public SportsClub(long id, String name, String location) {
        this.id = id;
        this.name = name;
        this.location = location;
    }
}
