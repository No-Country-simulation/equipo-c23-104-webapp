package c23_104_webapp.microservice_post.Entities;

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
@Table(name = "post")
public class Post {

    @Id
    @GeneratedValue
    private Long id;
    @Column(nullable = false)
    private Long idUser;
    @Column(nullable = false)
    private String content;
    @Column(nullable = false)
    private LocalDateTime date;
    @ElementCollection
    private List<String> imgUrls;
    @Column(nullable = false)
    private Long interactionCount = 0L;
    @OneToMany(mappedBy = "post", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Interaction> interactions;
    @ManyToOne
    private Community community;
    @Column(nullable = false)
    private Boolean isDeleted;

}
