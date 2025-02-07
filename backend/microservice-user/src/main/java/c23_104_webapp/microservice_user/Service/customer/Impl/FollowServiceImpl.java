package c23_104_webapp.microservice_user.Service.customer.Impl;

import c23_104_webapp.microservice_user.DTO.response.profile.UserInfoGeneralResponse;
import c23_104_webapp.microservice_user.Entities.Follow;
import c23_104_webapp.microservice_user.Entities.User;
import c23_104_webapp.microservice_user.Exception.ApiException;
import c23_104_webapp.microservice_user.Repositories.FollowRepository;
import c23_104_webapp.microservice_user.Repositories.UserRepository;
import c23_104_webapp.microservice_user.Service.customer.FollowService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Objects;

@Service
@RequiredArgsConstructor
public class FollowServiceImpl implements FollowService {

    private final FollowRepository followRepository;
    private final UserRepository userRepository;

    @Override
    @Transactional
    public void followUser(Long id) {
        User userFollower = this.getUserLogged();
        User userFollowing = userRepository.findById(id).orElseThrow(()-> new ApiException("User not found", HttpStatus.BAD_REQUEST));

        if(Objects.equals(userFollower.getId(), userFollowing.getId())){
            throw new ApiException("The user to follow is yourself, is the same ID with the user logged ",HttpStatus.BAD_REQUEST);
        }

        if(followRepository.existsByFollower_IdAndFollowing_Id(userFollower.getId(),userFollowing.getId())){
            Follow follow = followRepository.findByFollower_IdAndFollowing_Id(userFollower.getId(),userFollowing.getId())
                    .orElseThrow(()-> new ApiException("Follow relationship not found",HttpStatus.BAD_REQUEST));
            followRepository.delete(follow);
        } else {
            Follow follow = this.createFollow(userFollower,userFollowing);
            followRepository.save(follow);
        }
    }

    @Override
    public Page<UserInfoGeneralResponse> getUsersFollowing(Pageable pageable, Long id) {
        Page<Follow> followPage = followRepository.findByFollower_Id(id, pageable);

        List<UserInfoGeneralResponse> userInfoForPostResponses = followPage.getContent().stream()
                .map(follow -> mapToUserInfoGeneralResponse(follow, true))
                .toList();

        return new PageImpl<>(userInfoForPostResponses, pageable, followPage.getTotalElements());
    }

    @Override
    public Page<UserInfoGeneralResponse> getUsersFollowers(Pageable pageable, Long id) {
        Page<Follow> followPage = followRepository.findByFollowing_Id(id, pageable);

        List<UserInfoGeneralResponse> userInfoForPostResponses = followPage.getContent().stream()
                .map(follow -> mapToUserInfoGeneralResponse(follow, false))
                .toList();

        return new PageImpl<>(userInfoForPostResponses, pageable, followPage.getTotalElements());
    }

    private UserInfoGeneralResponse mapToUserInfoGeneralResponse(Follow follow, boolean isFollowing) {
        User user = isFollowing ? follow.getFollowing() : follow.getFollower();
        return new UserInfoGeneralResponse(
                user.getId(),
                user.getName(),
                user.getHandleUsername(),
                user.getEmail(),
                user.getUrlProfile()
        );
    }

    private Follow createFollow(User userFollower,User userFollowing){
        return Follow.builder()
                .follower(userFollower)
                .following(userFollowing)
                .build();
    }

    private User getUserLogged() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        return (User) authentication.getPrincipal();
    }

}
