package c23_104_webapp.microservice_comment.Repositories;

import c23_104_webapp.microservice_comment.Entities.Comment;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface CommentRepository extends JpaRepository<Comment,Long> {
    Page<Comment> findByIdPostAndIsDeletedFalse(Long idPost, Pageable pageable);
    @Query("SELECT c FROM Comment c JOIN c.interactions i WHERE i.idUser = :userId AND c.isDeleted = false")
    Page<Comment> findCommentsWithUserInteraction(@Param("userId") Long userId, Pageable pageable);
}
