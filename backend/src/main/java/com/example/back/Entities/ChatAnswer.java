package com.example.back.Entities;


import javax.persistence.*;
import java.sql.Timestamp;

@Entity
@Table(name = "chat_answer")
public class ChatAnswer implements Comparable<Question>{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String answer;

    private String author;

    @Column(name = "create_at")
    private Timestamp createAt;

    @ManyToOne
    @JoinColumn(name = "question_id", referencedColumnName = "id")
    private ChatQuestion question;

    public ChatAnswer() {
    }

    public String getAuthor() {
        return author;
    }

    public void setAuthor(String author) {
        this.author = author;
    }

    public ChatQuestion getQuestion() {
        return question;
    }

    public void setQuestion(ChatQuestion question) {
        this.question = question;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getAnswer() {
        return answer;
    }

    public void setAnswer(String answer) {
        this.answer = answer;
    }

    public Timestamp getCreateAt() {
        return createAt;
    }

    public void setCreateAt(Timestamp createAt) {
        this.createAt = createAt;
    }

    @Override
    public int compareTo(Question o) {
        return this.getCreateAt().compareTo(o.getCreateAt());
    }
}
