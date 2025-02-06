package c23_104_webapp.microservice_user.Service.customer;

import c23_104_webapp.microservice_user.DTO.request.profile.EditProfileRequest;
import c23_104_webapp.microservice_user.DTO.response.profile.UserInfoGeneralResponse;
import c23_104_webapp.microservice_user.DTO.response.profile.UserInfoResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.ArrayList;

public interface UserService {
    UserInfoResponse getLoggedInUserDetails();
    UserInfoResponse getUserInfoByEmail(String email);
    UserInfoResponse getUserById(Long id);
    UserInfoResponse getUserInfoByHandleUsername(String handleUsername);
    UserInfoResponse editUserProfile(EditProfileRequest editProfileRequest);
    Page<UserInfoGeneralResponse> getUsersInfo(ArrayList<Long> userIds, Pageable pageable);
    void joinCommunity(String community);
    void leaveCommunity(String community);
}
