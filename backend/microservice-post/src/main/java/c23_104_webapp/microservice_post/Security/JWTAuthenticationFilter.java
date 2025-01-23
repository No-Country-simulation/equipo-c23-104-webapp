package c23_104_webapp.microservice_post.Security;

import c23_104_webapp.microservice_post.Exception.ApiException;
import c23_104_webapp.microservice_post.Repositories.APIClient.UserAPIClient;
import c23_104_webapp.microservice_post.Service.authentication.TokenService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

import static c23_104_webapp.microservice_post.Util.Constants.UNPROTECTED_PATHS;

@Component
@RequiredArgsConstructor
@Slf4j
public class JWTAuthenticationFilter extends OncePerRequestFilter {

    private final TokenService tokenService;
    private final UserDetailsService userDetailsService;
    private final UserAPIClient userServiceClient;

    @Value("${jwt.header}")
    private String authHeader;

    @Value("${jwt.prefix}")
    private String authPrefix;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response,
                                    FilterChain filterChain) throws ServletException, IOException {


        String uri = request.getRequestURI().replaceFirst("/", "");

        boolean isUnprotectedPath = UNPROTECTED_PATHS.stream().anyMatch(uri::matches);

        if (isUnprotectedPath) {
            filterChain.doFilter(request, response);
            return;
        }

        final String authHeaderValue = request.getHeader(authHeader);

        try {
            if (authHeaderValue == null || !authHeaderValue.startsWith(authPrefix)) {
                filterChain.doFilter(request, response);
                return;
            }

            ResponseEntity<Boolean> blacklistResponse = userServiceClient.checkBlacklist(authHeaderValue);
            if (blacklistResponse.getBody() != null && blacklistResponse.getBody()) {
                throw new ApiException("Token is blacklisted", HttpStatus.BAD_REQUEST);
            }

            String token = authHeaderValue.substring(authPrefix.length());
            String userEmail = tokenService.extractUsername(token);

            if (userEmail != null) {
                UserDetails user = userDetailsService.loadUserByUsername(userEmail);
                if (tokenService.isTokenValid(token, user)) {
                    UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(
                            user, null, user.getAuthorities());
                    SecurityContextHolder.getContext().setAuthentication(authToken);
                } else {
                    throw new ApiException("Token is invalid", HttpStatus.BAD_REQUEST);
                }
            }

        } catch (Exception e) {
            log.error("Error processing JWT token: ", e);
            throw new ApiException("Error processing JWT token", HttpStatus.BAD_REQUEST);
        }

        filterChain.doFilter(request, response);
    }
}
