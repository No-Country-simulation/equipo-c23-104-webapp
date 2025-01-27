package c23_104_webapp.microservice_post.Repositories;

import c23_104_webapp.microservice_post.Entities.Post;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PostRepository extends JpaRepository<Post,Long> {
    Page<Post> findByCommunityId(Long communityId,Pageable pageable);
    Page<Post> findByCommunityNameIn(List<String> names, Pageable pageable);
    Page<Post> findByIdUser(Long idUser, Pageable pageable);
}
