package com.nocontry.comments_ms.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter @Setter @AllArgsConstructor @NoArgsConstructor
public class CommentInteraction extends  BaseEntity{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="interaction_id")
    private Long interactionId;

    @Column(name="user_id")
    private Long userId;

    @Column(name="comment_id")
    private Long commentId;
}
