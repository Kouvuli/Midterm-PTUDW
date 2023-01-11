package com.example.back.Entities;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.sql.Timestamp;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "questions")
public class Question implements Comparable<Question>{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String question;

    @Column(name = "create_at")
    private Timestamp createAt;

    private String answer;

    private String type;

    @ManyToOne
    @JoinColumn(name = "presentation_id", referencedColumnName = "id")
    private Presentation presentation;


    @OneToMany(mappedBy = "question")
    @JsonIgnore
    private Set<Answer> options =new HashSet<>();



    public Question() {
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getAnswer() {
        return answer;
    }

    public void setAnswer(String answer) {
        this.answer = answer;
    }
    public Presentation getPresentation() {
        return presentation;
    }

    public void setPresentation(Presentation presentation) {
        this.presentation = presentation;
    }

    public Set<Answer> getOptions() {
        return options;
    }

    public void setOptions(Set<Answer> options) {
        this.options = options;
    }


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getQuestion() {
        return question;
    }

    public void setQuestion(String question) {
        this.question = question;
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
