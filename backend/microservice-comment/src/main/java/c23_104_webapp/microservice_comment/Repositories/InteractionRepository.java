package c23_104_webapp.microservice_comment.Repositories;

import c23_104_webapp.microservice_comment.Entities.Comment;
import c23_104_webapp.microservice_comment.Entities.Interaction;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Set;

@Repository
public interface InteractionRepository extends JpaRepository<Interaction,Long> {
    boolean existsByCommentAndIdUser(Comment comment,Long idUser);
    void deleteByCommentAndIdUser(Comment comment, Long idUser);
    @Query("SELECT i.idUser FROM Interaction i WHERE i.comment = :comment")
    Set<Long> findUserIdsByComment(@Param("comment") Comment comment);
}
