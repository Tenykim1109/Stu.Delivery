package com.ssafy.db.entity;

import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import lombok.Getter;
import lombok.Setter;

@Entity(name = "goal")
@Getter
@Setter
public class Goal extends BaseEntity {

    @ManyToOne
    private User user;

    private String content;
    private Boolean done;
}