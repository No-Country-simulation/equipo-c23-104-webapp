package c23_104_webapp.microservice_post.Controller;

import c23_104_webapp.microservice_post.DTO.response.GenericResponse;
import c23_104_webapp.microservice_post.DTO.response.customer.UserInfoResponse;
import c23_104_webapp.microservice_post.Service.customer.InteractionService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.data.domain.Page;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/interaction")
public class InteractionController {

    private final InteractionService interactionService;

    @PostMapping("/create/post/{id}")
    public ResponseEntity<GenericResponse> createInteraction(@PathVariable Long id){
        interactionService.createInteraction(id);
        return ResponseEntity.ok(new GenericResponse("Interaction created"));
    }

    @GetMapping("/get/post/{id}")
    public ResponseEntity<Page<UserInfoResponse>> getInteractionsByPost(@PathVariable Long id, Pageable pageable){
        return ResponseEntity.ok(interactionService.getInteractionsByPost(id,pageable));
    }
}
