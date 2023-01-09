package com.example.back.Repositories;

import com.example.back.Entities.ChatQuestion;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ChatQuestionRepository extends JpaRepository<ChatQuestion,Long> {

}
