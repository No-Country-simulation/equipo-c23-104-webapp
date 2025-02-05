package c23_104_webapp.microservice_post.Service.customer;

import c23_104_webapp.microservice_post.DTO.response.customer.CommunityDTO;
import c23_104_webapp.microservice_post.Entities.Community;

import java.util.List;

public interface CommunityService {
    List<CommunityDTO> getCommunities();
    CommunityDTO findCommunityById(Long id);
    Community createCommunity(Community community);
    void joinCommunity(Long id);
    void leaveCommunity(Long id);
}
