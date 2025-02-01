package c23_104_webapp.microservice_comment.Entities;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Entity
@Builder
public class Comment {

    @Id
    @GeneratedValue
    private Long id;
    @Column(nullable = false)
    private Long idUser;
    @Column(nullable = false)
    private Long idPost;
    @Column(nullable = true)
    private Long idCommentParent = 0L;
    @Column(nullable = false)
    private String content;
    private LocalDateTime date;
    @ElementCollection
    private List<String> imgUrls;
    @Column(nullable = false)
    private Long interactionCount = 0L;
    @Column(nullable = false)
    private Long repliesCount = 0L;
    @OneToMany(mappedBy = "comment", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Interaction> interactions;
    @Column(nullable = false)
    private Boolean isDeleted;

}
