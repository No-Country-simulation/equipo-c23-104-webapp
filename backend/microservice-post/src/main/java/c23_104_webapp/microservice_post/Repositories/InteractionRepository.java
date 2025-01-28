package c23_104_webapp.microservice_post.Repositories;

import c23_104_webapp.microservice_post.Entities.Interaction;
import c23_104_webapp.microservice_post.Entities.Post;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Set;

@Repository
public interface InteractionRepository extends JpaRepository<Interaction,Long> {
    boolean existsByPostAndIdUser(Post post, Long idUser);
    void deleteByPostAndIdUser(Post post, Long idUser);
    @Query("SELECT i.idUser FROM Interaction i WHERE i.post = :post")
    Set<Long> findUserIdsByPost(@Param("post") Post post);
}
