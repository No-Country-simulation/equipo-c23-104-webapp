package c23_104_webapp.microservice_comment.Service.event;

import lombok.RequiredArgsConstructor;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class CommentEventProducer {

    private final KafkaTemplate<String, Long> kafkaTemplate;
    private static final String TOPIC = "comment-created";

    public void sendCommentCreatedEvent(Long postId) {
        kafkaTemplate.send(TOPIC, postId);
    }

    public void sendCommentDeletedEvent(Long postId) {
        kafkaTemplate.send("comment-deleted", postId);
    }
}
