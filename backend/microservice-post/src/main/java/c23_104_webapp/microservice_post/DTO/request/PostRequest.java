package c23_104_webapp.microservice_post.DTO.request;

import c23_104_webapp.microservice_post.Entities.Community;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.util.List;

public record PostRequest(@NotBlank(message = "Content cannot be empty") String content,
                          @NotNull(message = "Community cannot be null")Community community,
                          List<String> imgUrls) {
}
