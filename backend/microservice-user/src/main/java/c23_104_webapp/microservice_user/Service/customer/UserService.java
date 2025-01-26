package c23_104_webapp.microservice_user.Service.customer;

import c23_104_webapp.microservice_user.DTO.request.profile.EditProfileRequest;
import c23_104_webapp.microservice_user.DTO.response.profile.UserInfoForPostResponse;
import c23_104_webapp.microservice_user.DTO.response.profile.UserInfoResponse;

import java.util.ArrayList;
import java.util.List;

public interface UserService {
    UserInfoResponse getLoggedInUserDetails();
    UserInfoResponse getUserInfoByEmail(String email);
    UserInfoResponse getUserById(Long id);
    UserInfoResponse getUserInfoByHandleUsername(String handleUsername);
    UserInfoResponse editUserProfile(EditProfileRequest editProfileRequest);
    List<UserInfoForPostResponse> getUsersInfoForPost(ArrayList<Long> userIds);
    void joinCommunity(String community);
    void leaveCommunity(String community);
}
