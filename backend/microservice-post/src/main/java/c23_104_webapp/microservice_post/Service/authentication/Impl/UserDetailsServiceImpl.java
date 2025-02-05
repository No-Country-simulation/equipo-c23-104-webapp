package c23_104_webapp.microservice_post.Service.authentication.Impl;

import c23_104_webapp.microservice_post.DTO.response.authentication.UserDetailsDTO;
import c23_104_webapp.microservice_post.Repositories.APIClient.UserAPIClient;
import io.github.resilience4j.circuitbreaker.annotation.CircuitBreaker;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.security.core.authority.SimpleGrantedAuthority;

@Service
@RequiredArgsConstructor
@Slf4j
public class UserDetailsServiceImpl implements UserDetailsService {

    private final UserAPIClient userServiceClient;

    @Value("${jwt.prefix}")
    private String authPrefix;

    @Value("${jwt.header}")
    private String authHeader;

    @Override
    @CircuitBreaker(name = "microservice-user", fallbackMethod = "fallBackLoadUserByUsername")
    @Transactional
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        try {
            log.info("Fetching user details for: {}", username);
            ResponseEntity<UserDetailsDTO> response = userServiceClient.getUserDetails(username);

            if (response.getStatusCode() == HttpStatus.OK && response.getBody() != null) {
                UserDetailsDTO userDetailsDTO = response.getBody();

                return org.springframework.security.core.userdetails.User.builder()
                        .username(userDetailsDTO.getUsername())
                        .password(userDetailsDTO.getPassword())
                        .authorities(userDetailsDTO.getAuthorities().stream()
                                .map(SimpleGrantedAuthority::new)
                                .toList())
                        .accountExpired(!userDetailsDTO.isAccountNonExpired())
                        .accountLocked(!userDetailsDTO.isAccountNonLocked())
                        .credentialsExpired(!userDetailsDTO.isCredentialsNonExpired())
                        .disabled(!userDetailsDTO.isEnabled())
                        .build();
            } else {
                throw new UsernameNotFoundException("User not found: " + username);
            }
        } catch (Exception e) {
            log.error("Error fetching user details: {}", e.getMessage(), e);
            throw new UsernameNotFoundException("Failed to fetch user details: " + username, e);
        }
    }

    public UserDetails fallBackLoadUserByUsername(String username, Throwable throwable) {
        log.error("Fallback triggered for loadUserByUsername. Username: {}. Error: {}", username, throwable.getMessage(), throwable);
        throw new UsernameNotFoundException("User service is unavailable. Unable to fetch user: " + username, throwable);
    }
}