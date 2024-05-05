package com.rayan.english_premier_league.backend.repository;

import com.rayan.english_premier_league.backend.entity.MatchEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LeagueMatchRepository extends JpaRepository<MatchEntity, Long> {
}
