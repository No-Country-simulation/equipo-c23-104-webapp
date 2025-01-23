package c23_104_webapp.microservice_user.Service.customer;

import c23_104_webapp.microservice_user.DTO.request.profile.EditProfileRequest;
import c23_104_webapp.microservice_user.DTO.response.profile.UserInfoResponse;

public interface UserService {
    UserInfoResponse getLoggedInUserDetails();
    UserInfoResponse getUserInfoByEmail(String email);
    UserInfoResponse getUserById(Long id);
    UserInfoResponse getUserInfoByHandleUsername(String handleUsername);
    UserInfoResponse editUserProfile(EditProfileRequest editProfileRequest);
    UserInfoResponse joinCommunity(String community);
}
