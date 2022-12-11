package com.example.back.Repositories;

import com.example.back.Entities.Presentation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;


@Repository
public interface PresentationRepository extends JpaRepository<Presentation,Long> {

    Optional<Presentation> findByTitle(String title);
}
