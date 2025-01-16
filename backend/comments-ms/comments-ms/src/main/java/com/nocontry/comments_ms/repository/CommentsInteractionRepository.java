package com.nocontry.comments_ms.repository;

import com.nocontry.comments_ms.entity.CommentInteraction;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CommentsInteractionRepository extends JpaRepository<CommentInteraction, Long>{
    List<CommentInteraction> findByCommentId(Long commentId);
    List<CommentInteraction> findByUserId(Long userId);
    void deleteByInteractionId(Long interactionId);
}
