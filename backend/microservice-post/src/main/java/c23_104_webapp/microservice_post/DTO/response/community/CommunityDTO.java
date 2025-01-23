package c23_104_webapp.microservice_post.DTO.response.community;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CommunityDTO {
    private Long id;
    private String name;
}
