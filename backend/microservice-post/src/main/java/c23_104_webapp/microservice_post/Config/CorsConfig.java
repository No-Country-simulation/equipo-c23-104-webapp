package c23_104_webapp.microservice_post.Config;

import org.springframework.context.annotation.Configuration;
import org.springframework.lang.NonNull;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CorsConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(@NonNull CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOrigins("*") // Permite todos los orígenes
                .allowedMethods("GET", "POST", "PUT", "DELETE", "PATCH") // Permite estos métodos
                .allowedHeaders("Authorization", "Content-Type") // Permite encabezados como Authorization
                .allowCredentials(true); // Permite el uso de credenciales (si se usan cookies o encabezados Authorization)
    }
}


