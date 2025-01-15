package c23_104_webapp.microservice_user.Repositories;


import c23_104_webapp.microservice_user.Entities.ResetToken;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ResetTokenRepository extends JpaRepository<ResetToken, Long> {

    @Query("select r from ResetToken r where upper(r.user.email) = upper(?1) and r.token = ?2 and r.used = false")
    Optional<ResetToken> findUnusedTokenByUserEmail(String email, String resetToken);
}
