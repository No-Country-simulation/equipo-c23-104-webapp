package c23_104_webapp.microservice_user.DTO.response.dashboard;

public record UserDetailsResponse(String name,
                                  String email,
                                  String hashedPassword) {
}
