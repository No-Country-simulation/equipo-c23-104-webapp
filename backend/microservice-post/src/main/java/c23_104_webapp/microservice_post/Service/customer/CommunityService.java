package c23_104_webapp.microservice_post.Service.customer;

import c23_104_webapp.microservice_post.DTO.response.community.CommunityDTO;
import c23_104_webapp.microservice_post.Entities.Community;

public interface CommunityService {
    CommunityDTO getCommunities();
    Community createCommunity(Community community);
    void joinCommunity(Long id);
    void leaveCommunity(Long id);
}
