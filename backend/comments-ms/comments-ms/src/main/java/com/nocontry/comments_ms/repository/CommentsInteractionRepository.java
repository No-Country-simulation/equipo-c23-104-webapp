package com.nocontry.comments_ms.repository;

import com.nocontry.comments_ms.entity.CommentInteraction;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;

import java.util.List;

public interface CommentsInteractionRepository extends JpaRepository<CommentInteraction, Long>{
    List<CommentInteraction> findByCommentId(Long commentId);
    List<CommentInteraction> findByUserId(Long userId);

    @Transactional
    @Modifying
    void deleteByCommentIdAndUserId(Long commentId, Long userId);
}
