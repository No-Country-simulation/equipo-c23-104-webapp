package c23_104_webapp.microservice_user.Service.customer.Impl;

import c23_104_webapp.microservice_user.DTO.request.profile.EditProfileRequest;
import c23_104_webapp.microservice_user.DTO.response.profile.UserInfoResponse;
import c23_104_webapp.microservice_user.Entities.User;
import c23_104_webapp.microservice_user.Exception.ApiException;
import c23_104_webapp.microservice_user.Repositories.UserRepository;
import c23_104_webapp.microservice_user.Service.customer.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashSet;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserDetailsService, UserService {

    private final UserRepository userRepository;

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
    @Transactional
    public UserInfoResponse joinCommunity(String community) {
        User user = this.getUserLogged();

        if (user.getCommunities().contains(community)) {
            throw new ApiException("User is already part of the community", HttpStatus.BAD_REQUEST);
        }

        user.getCommunities().add(community);
        user.setCommunities(user.getCommunities());
        userRepository.save(user);

        return buildUserInfoResponse(user);
    }

    private UserInfoResponse buildUserInfoResponse(User user) {
        return new UserInfoResponse(user.getId(),
                                    user.getName(),
                                    user.getHandleUsername(),
                                    user.getEmail(),
                                    user.getDescription(),
                                    user.getUrlProfile(),
                                    user.getCommunities());
    }

    private User getUserLogged() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        return (User) authentication.getPrincipal();
    }
}
