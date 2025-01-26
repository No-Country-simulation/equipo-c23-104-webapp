package c23_104_webapp.microservice_post.Service.customer.Impl;

import c23_104_webapp.microservice_post.DTO.response.customer.CommunityDTO;
import c23_104_webapp.microservice_post.Entities.Community;
import c23_104_webapp.microservice_post.Exception.ApiException;
import c23_104_webapp.microservice_post.Repositories.APIClient.UserAPIClient;
import c23_104_webapp.microservice_post.Repositories.CommunityRepository;
import c23_104_webapp.microservice_post.Security.UserContext;
import c23_104_webapp.microservice_post.Service.customer.CommunityService;
import io.github.resilience4j.circuitbreaker.annotation.CircuitBreaker;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class CommunityServiceImpl implements CommunityService {

    private final CommunityRepository communityRepository;
    private final UserAPIClient userAPIClient;
    private final UserContext userContext;

    @Override
    public List<CommunityDTO> getCommunities() {
        List<Community> communities = communityRepository.findAll();
        List<CommunityDTO> communityDTOS = new ArrayList<>();

        if(communities.isEmpty()){
            throw new ApiException("Communities not found",HttpStatus.BAD_REQUEST);
        }

        for(Community community: communities){
            communityDTOS.add(CommunityDTO.fromCommunity(community));
        }

        return communityDTOS;
    }

    @Override
    public CommunityDTO findCommunityById(Long id) {
        Community community = communityRepository.findById(id)
                .orElseThrow(() ->new ApiException("Community not found",HttpStatus.BAD_REQUEST));

        return CommunityDTO.fromCommunity(community);
    }

    @Override
    public Community createCommunity(Community community) {
        return communityRepository.save(community);
    }

    @Override
    @CircuitBreaker(name = "microservice-user", fallbackMethod = "fallBackJoinCommunity")
    @Transactional
    public void joinCommunity(Long id){
        Community community = communityRepository.findById(id)
                .orElseThrow(() ->new ApiException("Community not found",HttpStatus.BAD_REQUEST));

        try {
            userAPIClient.joinCommunity(community.getName());
        } catch (Exception e) {
            throw new ApiException("Error joining community: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }

        Long userId = this.getUserIdFromUserLogged();

        if(community.getIdUsers().contains(userId)){
            throw new ApiException("User is already part of the community", HttpStatus.BAD_REQUEST);
        }

        community.getIdUsers().add(userId);
        // TODO: Implement a TRIGGER in the database to update the number of members and avoid using .size().
        community.setMemberCount((long) community.getIdUsers().size());
        communityRepository.save(community);

    }

    public void fallBackJoinCommunity(Long id, Throwable throwable) {
        log.error("Fallback triggered for joinCommunity. Community ID: {}. Error: {}", id, throwable.getMessage(), throwable);
        // TODO: Verify error messages, it is thrown when a user already belongs to a community but it is not a service error.
        throw new ApiException("Unable to join community due to an issue with the user service.", HttpStatus.SERVICE_UNAVAILABLE);
    }

    @Override
    @CircuitBreaker(name = "microservice-user", fallbackMethod = "fallBackLeaveCommunity")
    @Transactional
    public void leaveCommunity(Long id) {
        Community community = communityRepository.findById(id)
                .orElseThrow(() ->new ApiException("Community not found",HttpStatus.BAD_REQUEST));

        try {
            userAPIClient.leaveCommunity(community.getName());
        } catch (Exception e) {
            throw new ApiException("Error leaving community: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }

        Long userId = this.getUserIdFromUserLogged();

        if(!community.getIdUsers().contains(userId)){
            throw new ApiException("The user is not part of this community", HttpStatus.BAD_REQUEST);
        }

        community.getIdUsers().remove(userId);
        // TODO: Implement a TRIGGER in the database to update the number of members and avoid using .size().
        community.setMemberCount((long) community.getIdUsers().size());
        communityRepository.save(community);
    }

    public void fallBackLeaveCommunity(Long id, Throwable throwable) {
        log.error("Fallback triggered for leaveCommunity. Community ID: {}. Error: {}", id, throwable.getMessage(), throwable);
        throw new ApiException("Unable to leave community due to an issue with the user service.", HttpStatus.SERVICE_UNAVAILABLE);
    }

    private Long getUserIdFromUserLogged(){
        return userContext.getUserId();
    }


}
