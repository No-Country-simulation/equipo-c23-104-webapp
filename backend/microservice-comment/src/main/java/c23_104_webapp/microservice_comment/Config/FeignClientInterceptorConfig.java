package c23_104_webapp.microservice_comment.Config;

import feign.RequestInterceptor;
import feign.RequestTemplate;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.beans.factory.annotation.Value;

@Component
@RequiredArgsConstructor
public class FeignClientInterceptorConfig implements RequestInterceptor {

    private final HttpServletRequest request;

    @Value("${jwt.header}")
    private String authHeader;

    @Override
    public void apply(RequestTemplate requestTemplate) {
        String token = request.getHeader(authHeader);
        if (token != null) {
            requestTemplate.header(authHeader, token);
        }
    }
}
