package c23_104_webapp.microservice_user.DTO.response.profile;

public record UserInfoGeneralResponse(Long id,
                                      String name,
                                      String username,
                                      String email,
                                      String urlProfile){
}