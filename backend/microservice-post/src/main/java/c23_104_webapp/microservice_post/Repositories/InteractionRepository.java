package c23_104_webapp.microservice_post.Repositories;

import c23_104_webapp.microservice_post.Entities.Interaction;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface InteractionRepository extends JpaRepository<Interaction,Long> {
}
