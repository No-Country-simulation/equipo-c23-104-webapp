package c23_104_webapp.microservice_post.Config;

import org.springframework.context.annotation.Configuration;
import org.springframework.lang.NonNull;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CorsConfig implements WebMvcConfigurer {

    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**") // Aplica a todas las rutas
                .allowedOrigins("*") // Permite todos los orígenes
                .allowedMethods("GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS", "HEAD") // Permite todos los métodos HTTP
                .allowedHeaders("*") // Permite todos los encabezados
                .exposedHeaders("Authorization") // Expone el encabezado Authorization, útil para las respuestas
                .allowCredentials(true); // Permite credenciales, como cookies o encabezados de autenticación
    }
}


