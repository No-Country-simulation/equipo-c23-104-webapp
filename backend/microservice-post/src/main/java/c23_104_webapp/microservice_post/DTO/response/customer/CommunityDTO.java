package c23_104_webapp.microservice_post.DTO.response.customer;


import c23_104_webapp.microservice_post.Entities.Community;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CommunityDTO{
    private Long id;
    private String name;
    private Long members;

    public static CommunityDTO fromCommunity(Community community){
        if(community == null){
            return null;
        }

        return new CommunityDTO(
                community.getId(),
                community.getName(),
                community.getMemberCount()
        );
    }
}
