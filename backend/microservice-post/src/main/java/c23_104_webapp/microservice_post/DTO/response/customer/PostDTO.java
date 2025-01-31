package c23_104_webapp.microservice_post.DTO.response.customer;

import c23_104_webapp.microservice_post.Entities.Post;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class PostDTO {

    private Long id;
    private String nameUser;
    private String username;
    private String urlProfile;
    private String content;
    private LocalDateTime postDate;
    private List<String> imgUrls;
    private Long interactionCount;
    private String communityName;

    public static PostDTO fromPost(Post post,UserInfoResponse userInfoResponse){
        if(post == null){
            return null;
        }

        return new PostDTO(
                post.getId(),
                userInfoResponse.name(),
                userInfoResponse.username(),
                userInfoResponse.urlProfile(),
                post.getContent(),
                post.getDate(),
                post.getImgUrls(),
                post.getInteractionCount(),
                post.getCommunity().getName()
        );
    }
}
