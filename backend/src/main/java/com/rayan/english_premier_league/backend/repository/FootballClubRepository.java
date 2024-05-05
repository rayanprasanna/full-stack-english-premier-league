package com.rayan.english_premier_league.backend.repository;

import com.rayan.english_premier_league.backend.entity.FootballClubEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FootballClubRepository extends JpaRepository<FootballClubEntity, Long> {
}
