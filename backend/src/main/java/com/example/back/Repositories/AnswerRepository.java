package com.example.back.Repositories;

import com.example.back.Entities.Answer;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface AnswerRepository extends JpaRepository<Answer,Long> {

    List<Answer> findAnswerByQuestionId(Sort sort,Long id);
}
