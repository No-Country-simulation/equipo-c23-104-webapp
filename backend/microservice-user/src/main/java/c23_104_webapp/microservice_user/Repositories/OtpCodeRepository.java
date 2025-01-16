package c23_104_webapp.microservice_user.Repositories;

import c23_104_webapp.microservice_user.Entities.OtpCode;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface OtpCodeRepository extends JpaRepository<OtpCode, Long> {
    @Query("select o from OtpCode o where upper(o.user.email) = upper(?1) and o.code = ?2 and o.used = false")
    Optional<OtpCode> findUnusedOtpCodeByUserEmail(String email, String code);
}
