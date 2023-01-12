package com.example.back.Repositories;

import com.example.back.Entities.Answer;
import com.example.back.Entities.Question;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface QuestionRepository extends JpaRepository<Question,Long> {

    List<Question> findQuestionByPresentationId(Sort sort,Long id);

}
