package c23_104_webapp.microservice_user.Security;


import c23_104_webapp.microservice_user.Exception.ApiException;
import c23_104_webapp.microservice_user.Service.authentication.TokenService;
import io.jsonwebtoken.JwtException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;
import org.springframework.web.servlet.HandlerExceptionResolver;

import java.io.IOException;

import static c23_104_webapp.microservice_user.Util.Constants.UNPROTECTED_PATHS;


@Component
@RequiredArgsConstructor
@Slf4j
public class JWTAuthenticationFilter extends OncePerRequestFilter {


    private final TokenService tokenService;
    private final UserDetailsService userDetailsService;
    private final HandlerExceptionResolver handlerExceptionResolver;
    private final JWTBlacklistManager jwtBlacklistManager;

    @Value("${jwt.header}")
    private String authHeader;

    @Value("${jwt.prefix}")
    private String authPrefix;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response,
                                    FilterChain filterChain) throws ServletException, IOException {

        //response.setHeader("ngrok-skip-browser-warning", "06429");

        if ("OPTIONS".equalsIgnoreCase(request.getMethod())) {
            response.setStatus(HttpServletResponse.SC_OK);
            return;
        }

        String uri = request.getRequestURI().replaceFirst("/", "");
        boolean isUnprotectedPath = UNPROTECTED_PATHS.stream().anyMatch(uri::matches);

        if (isUnprotectedPath) {
            filterChain.doFilter(request, response);
            return;
        }

        final String authHeaderValue = request.getHeader(authHeader);

        try {
            if (authHeaderValue == null || !authHeaderValue.startsWith(authPrefix)
                    || jwtBlacklistManager.isBlackListed(authHeaderValue)) {
                throw ApiException.accessDenied();
            }

            final String token = authHeaderValue.substring(authPrefix.length());
            final String userEmail = tokenService.extractUsername(token);

            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

            if (userEmail != null && authentication == null) {
                UserDetails user = userDetailsService.loadUserByUsername(userEmail);

                if (tokenService.isTokenValid(token, user)) {
                    UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(
                            user, null, user.getAuthorities());

                    authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                    SecurityContextHolder.getContext().setAuthentication(authToken);
                } else {
                    throw ApiException.accessDenied();
                }
            } else {
                throw ApiException.accessDenied();
            }
            filterChain.doFilter(request, response);
        } catch (ApiException | JwtException e) {
            handlerExceptionResolver.resolveException(request, response, null, e);
        } catch (Exception e) {
            log.error("Error ", e);
            throw e;
        }
    }
}