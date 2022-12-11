package com.example.back.Repositories;

import com.example.back.Entities.Answer;
import com.example.back.Entities.Question;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface QuestionRepository extends JpaRepository<Question,Long> {
}
