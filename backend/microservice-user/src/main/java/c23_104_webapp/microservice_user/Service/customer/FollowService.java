package c23_104_webapp.microservice_user.Service.customer;

import c23_104_webapp.microservice_user.DTO.response.profile.UserInfoGeneralResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface FollowService {
    void followUser(Long id);
    Page<UserInfoGeneralResponse> getUsersFollowing(Pageable pageable);
    Page<UserInfoGeneralResponse> getUsersFollowers(Pageable pageable);
}
