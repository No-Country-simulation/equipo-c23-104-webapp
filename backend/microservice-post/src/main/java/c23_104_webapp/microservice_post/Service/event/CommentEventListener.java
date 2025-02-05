package c23_104_webapp.microservice_post.Service.event;

import c23_104_webapp.microservice_post.Entities.Post;
import c23_104_webapp.microservice_post.Repositories.PostRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class CommentEventListener {

    private final PostRepository postRepository;

    @KafkaListener(topics = "comment-created", groupId = "post-service-group")
    public void handleCommentCreatedEvent(Long postId) {
        updateRepliesCount(postId, 1);
    }

    @KafkaListener(topics = "comment-deleted", groupId = "post-service-group")
    public void handleCommentDeletedEvent(Long postId) {
        updateRepliesCount(postId, -1);
    }

    private void updateRepliesCount(Long postId, int delta) {
        Post post = postRepository.findById(postId)
                .orElseThrow(() -> new RuntimeException("Post not found"));
        post.setRepliesCount(post.getRepliesCount() + delta);
        postRepository.save(post);
    }
}
