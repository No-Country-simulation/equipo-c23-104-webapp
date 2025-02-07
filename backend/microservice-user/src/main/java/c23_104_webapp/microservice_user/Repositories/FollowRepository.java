package c23_104_webapp.microservice_user.Repositories;

import c23_104_webapp.microservice_user.Entities.Follow;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface FollowRepository extends JpaRepository<Follow,Long> {
    boolean existsByFollower_IdAndFollowing_Id(Long followerId, Long followingId);
    Optional<Follow> findByFollower_IdAndFollowing_Id(Long followerId, Long followingId);
    Page<Follow> findByFollower_Id(Long followerId, Pageable pageable);
    Page<Follow> findByFollowing_Id(Long followingId, Pageable pageable);
    int countByFollowing_Id(Long followingId);
    int countByFollower_Id(Long followerId);
}
