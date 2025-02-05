package c23_104_webapp.microservice_post.DTO.response.customer;

public record UserInfoResponse (Long id,
                                String name,
                                String username,
                                String email,
                                String urlProfile){
}
