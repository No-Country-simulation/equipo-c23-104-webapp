package c23_104_webapp.microservice_user.Repositories;

import c23_104_webapp.microservice_user.Entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    boolean existsByEmailIgnoreCase(String email);
    Optional<User> findByEmail(String email);
    boolean existsByHandleUsernameIgnoreCase(String handleUsername);
    User getReferenceByEmailIgnoreCase(String email);
}
