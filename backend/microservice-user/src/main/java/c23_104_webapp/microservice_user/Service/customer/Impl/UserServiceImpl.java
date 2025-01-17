package c23_104_webapp.microservice_user.Service.customer.Impl;

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

import java.util.Optional;

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

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User user = (User) authentication.getPrincipal();

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

    private UserInfoResponse buildUserInfoResponse(User user) {
        return new UserInfoResponse(user.getId(),
                                    user.getName(),
                                    user.getHandleUsername(),
                                    user.getEmail(),
                                    user.getDescription(),
                                    user.getUrlProfile());
    }
}
