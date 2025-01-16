package com.nocontry.comments_ms.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter @Setter @AllArgsConstructor @NoArgsConstructor
public class CommentInteraction extends BaseEntity{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="interaction_id")
    private Long interactionId;

    @Column(name = "comment_id", nullable = false)
    private Long commentId;


    @Column(name = "user_id", nullable = false)
    private Long userId;

}
