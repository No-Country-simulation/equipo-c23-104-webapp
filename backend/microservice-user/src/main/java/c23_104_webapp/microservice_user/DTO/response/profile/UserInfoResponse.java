package c23_104_webapp.microservice_user.DTO.response.profile;

import java.util.Set;

public record UserInfoResponse (Long id,
                                String name,
                                String username,
                                String email,
                                String description,
                                String urlProfile,
                                Set<String> communities,
                                int followersCount,
                                int followingCount){
}