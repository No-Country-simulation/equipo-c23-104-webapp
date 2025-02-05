package c23_104_webapp.microservice_comment.Controller;

import c23_104_webapp.microservice_comment.DTO.GenericResponse;
import c23_104_webapp.microservice_comment.DTO.response.customer.UserInfoResponse;
import c23_104_webapp.microservice_comment.Service.customer.InteractionService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/interaction")
public class InteractionController {

    private final InteractionService interactionService;

    @PostMapping("/create/comment/{id}")
    public ResponseEntity<GenericResponse> createInteraction(@PathVariable Long id){
        interactionService.createInteraction(id);
        return ResponseEntity.ok(new GenericResponse("Interaction created"));
    }

    @GetMapping("/get/comment/{id}")
    public ResponseEntity<Page<UserInfoResponse>> getInteractionsByComment(@PathVariable Long id, Pageable pageable){
        return ResponseEntity.ok(interactionService.getInteractionsByComment(id,pageable));
    }
}
