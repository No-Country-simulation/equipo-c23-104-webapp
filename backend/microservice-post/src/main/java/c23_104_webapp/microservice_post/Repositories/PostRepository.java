package c23_104_webapp.microservice_post.Repositories;

import c23_104_webapp.microservice_post.Entities.Post;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface PostRepository extends JpaRepository<Post,Long> {
    Page<Post> findByCommunityIdAndIsDeletedFalse(Long communityId, Pageable pageable);
    Page<Post> findByCommunityNameInAndIsDeletedFalse(List<String> names, Pageable pageable);
    Page<Post> findByIdUserAndIsDeletedFalse(Long idUser, Pageable pageable);
    Optional<Post> findByIdAndIdUserAndIsDeletedFalse(Long id, Long idUser);
    @Query("SELECT p FROM Post p JOIN p.interactions i WHERE i.idUser = :userId AND p.isDeleted = false")
    Page<Post> findPostsWithUserInteraction(@Param("userId") Long userId, Pageable pageable);
}
