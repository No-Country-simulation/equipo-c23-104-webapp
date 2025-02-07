package c23_104_webapp.microservice_user.Service.customer.Impl;

import c23_104_webapp.microservice_user.DTO.request.profile.EditProfileRequest;
import c23_104_webapp.microservice_user.DTO.response.profile.UserInfoGeneralResponse;
import c23_104_webapp.microservice_user.DTO.response.profile.UserInfoResponse;
import c23_104_webapp.microservice_user.Entities.User;
import c23_104_webapp.microservice_user.Exception.ApiException;
import c23_104_webapp.microservice_user.Repositories.FollowRepository;
import c23_104_webapp.microservice_user.Repositories.UserRepository;
import c23_104_webapp.microservice_user.Service.customer.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;


@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserDetailsService, UserService {

    private final UserRepository userRepository;
    private final FollowRepository followRepository;

    @Override
    @Transactional(readOnly = true)
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return userRepository.findByEmail(username)
                .orElseThrow(() ->
                        new ApiException("User not found for the given identifier: " + username,
                                new UsernameNotFoundException(username), HttpStatus.BAD_REQUEST));
    }

    @Override
    public UserInfoResponse getLoggedInUserDetails() {
        User user = this.getUserLogged();

        return buildUserInfoResponse(user);
    }

    @Override
    public UserInfoResponse getUserInfoByEmail(String email) {
        User user =  userRepository.findByEmail(email).orElseThrow(() ->
                new ApiException("User not found for the given identifier: " + email,
                        new UsernameNotFoundException(email), HttpStatus.BAD_REQUEST));

        return buildUserInfoResponse(user);
    }

    @Override
    public UserInfoResponse getUserById(Long id) {
        User user = userRepository.findById(id).orElseThrow(()->
                new ApiException("User not found for the given id", HttpStatus.BAD_REQUEST));

        return buildUserInfoResponse(user);
    }

    @Override
    public UserInfoResponse getUserInfoByHandleUsername(String handleUsername) {
        User user = userRepository.findByHandleUsername(handleUsername).orElseThrow(()->
                new ApiException("User not found for the given username", HttpStatus.BAD_REQUEST));

        return buildUserInfoResponse(user);
    }

    @Override
    @Transactional
    public UserInfoResponse editUserProfile(EditProfileRequest editProfileRequest) {

        User user = this.getUserLogged();

        // TODO: Improve the logic for the method to edit a user.

        if(editProfileRequest.nameEdit() != null){
            user.setName(editProfileRequest.nameEdit());
        }
        if(editProfileRequest.descriptionEdit() != null){
            user.setDescription(editProfileRequest.descriptionEdit());
        }
        if(editProfileRequest.urlProfileEdit() != null){
            user.setUrlProfile(editProfileRequest.urlProfileEdit());
        }

        userRepository.save(user);

        return buildUserInfoResponse(user);

    }

    @Override
    public Page<UserInfoGeneralResponse> getUsersInfo(ArrayList<Long> userIds, Pageable pageable) {
        List<User> users = userRepository.findAllById(userIds);

        List<UserInfoGeneralResponse> userInfoForPostResponses = users.stream()
                .map(user -> new UserInfoGeneralResponse(user.getId(), user.getName(),
                        user.getHandleUsername(), user.getEmail(), user.getUrlProfile()))
                .collect(Collectors.toList());

        return new PageImpl<>(userInfoForPostResponses, pageable, users.size());
    }

    @Override
    @Transactional
    public void joinCommunity(String community) {
        User user = this.getUserLogged();

        if (user.getCommunities().contains(community)) {
            throw new ApiException("User is already part of the community", HttpStatus.BAD_REQUEST);
        }

        user.getCommunities().add(community);
        user.setCommunities(user.getCommunities());
        userRepository.save(user);

    }

    @Override
    @Transactional
    public void leaveCommunity(String community) {
        User user = this.getUserLogged();

        if (!user.getCommunities().contains(community)) {
            throw new ApiException("The user is not part of this community", HttpStatus.BAD_REQUEST);
        }

        user.getCommunities().remove(community);
        user.setCommunities(user.getCommunities());
        userRepository.save(user);

    }

    private UserInfoResponse buildUserInfoResponse(User user) {

        int followersCount = followRepository.countByFollowing_Id(user.getId());
        int followingCount = followRepository.countByFollower_Id(user.getId());

        return new UserInfoResponse(user.getId(),
                                    user.getName(),
                                    user.getHandleUsername(),
                                    user.getEmail(),
                                    user.getDescription(),
                                    user.getUrlProfile(),
                                    user.getCommunities(),
                                    followersCount,
                                    followingCount
        );
    }

    private User getUserLogged() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        return (User) authentication.getPrincipal();
    }
}
