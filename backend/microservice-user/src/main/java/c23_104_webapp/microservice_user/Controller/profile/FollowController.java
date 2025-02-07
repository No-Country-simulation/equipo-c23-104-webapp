package c23_104_webapp.microservice_user.Controller.profile;

import c23_104_webapp.microservice_user.DTO.GenericResponse;
import c23_104_webapp.microservice_user.DTO.response.profile.UserInfoGeneralResponse;
import c23_104_webapp.microservice_user.Service.customer.FollowService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "*")
@RequiredArgsConstructor
@RequestMapping("/api/follow")
public class FollowController {

    private final FollowService followService;

    @PostMapping("/user/{id}")
    public ResponseEntity<GenericResponse> followUser(@PathVariable Long id){
        followService.followUser(id);
        return ResponseEntity.ok(new GenericResponse("Follow or unfollow action completed"));
    }

    @GetMapping("/following/{id}")
    public ResponseEntity<Page<UserInfoGeneralResponse>> getUsersFollowing(Pageable pageable,@PathVariable Long id){
        return ResponseEntity.ok(followService.getUsersFollowing(pageable,id));
    }

    @GetMapping("/followers/{id}")
    public ResponseEntity<Page<UserInfoGeneralResponse>> getUsersFollowers(Pageable pageable,@PathVariable Long id){
        return ResponseEntity.ok(followService.getUsersFollowers(pageable,id));
    }
}
