package com.example.back.Repositories;

import com.example.back.Entities.ChatAnswer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ChatAnswerRepository extends JpaRepository<ChatAnswer,Long> {

}
