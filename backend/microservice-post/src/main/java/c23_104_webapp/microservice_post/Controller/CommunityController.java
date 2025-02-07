package c23_104_webapp.microservice_post.Controller;

import c23_104_webapp.microservice_post.DTO.response.GenericResponse;
import c23_104_webapp.microservice_post.DTO.response.customer.CommunityDTO;
import c23_104_webapp.microservice_post.Entities.Community;
import c23_104_webapp.microservice_post.Service.customer.CommunityService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "*")
@RequiredArgsConstructor
@RequestMapping("/api/community")
public class CommunityController {

    private final CommunityService communityService;

    @PostMapping("/create")
    public ResponseEntity<Community> createCommunity(@RequestBody @Valid Community community){
        return ResponseEntity.ok(communityService.createCommunity(community));
    }

    @PatchMapping("/join/{id}")
    public ResponseEntity<GenericResponse> joinCommunity(@PathVariable Long id){
        communityService.joinCommunity(id);
        return ResponseEntity.ok(new GenericResponse("Joined the community successfully"));
    }

    @PatchMapping("/leave/{id}")
    public ResponseEntity<GenericResponse> leaveCommunity(@PathVariable Long id){
        communityService.leaveCommunity(id);
        return ResponseEntity.ok(new GenericResponse("Left the community successfully"));
    }

    @GetMapping("/all")
    public ResponseEntity<List<CommunityDTO>> getCommunities(){
        return ResponseEntity.ok(communityService.getCommunities());
    }

    @GetMapping("/id/{id}")
    public ResponseEntity<CommunityDTO> findCommunity(@PathVariable Long id){
        return ResponseEntity.ok(communityService.findCommunityById(id));
    }

}
