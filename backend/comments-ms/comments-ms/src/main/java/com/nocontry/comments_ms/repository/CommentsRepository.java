package com.nocontry.comments_ms.repository;

import com.nocontry.comments_ms.entity.Comment;
import feign.Param;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CommentsRepository  extends JpaRepository<Comment, Long> {

    List<Comment> findByPostId(Long postId);

    @Query(
            value = """
        WITH RECURSIVE CommentHierarchy AS (
            SELECT *
            FROM comment
            WHERE comment_id = :commentId
            UNION ALL
            SELECT c.*
            FROM comment c
            INNER JOIN CommentHierarchy ch
            ON c.parent_comment_id = ch.comment_id
        )
        SELECT *
        FROM CommentHierarchy
        ORDER BY created_at
        """,
            nativeQuery = true
    )
    List<Comment> findCommentsHierarchy(@Param("commentId") Long commentId);
}
