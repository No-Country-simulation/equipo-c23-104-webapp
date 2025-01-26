package c23_104_webapp.microservice_post.Repositories;

import c23_104_webapp.microservice_post.Entities.Community;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface CommunityRepository extends JpaRepository<Community,Long> {
    @Query("SELECT CASE WHEN EXISTS (SELECT 1 FROM Community c JOIN c.idUsers u WHERE c.id = :communityId AND u = :userId) THEN true ELSE false END")
    boolean isUserInCommunity(@Param("communityId") Long communityId, @Param("userId") Long userId);
}
