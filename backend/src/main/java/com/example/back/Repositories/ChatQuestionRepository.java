package com.example.back.Repositories;

import com.example.back.Entities.ChatQuestion;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ChatQuestionRepository extends JpaRepository<ChatQuestion,Long> {
    Page<ChatQuestion> findAllByPresentationId(Pageable pageable, Long id);
}
