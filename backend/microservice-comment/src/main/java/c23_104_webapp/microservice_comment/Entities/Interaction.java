package c23_104_webapp.microservice_comment.Entities;

import c23_104_webapp.microservice_comment.Entities.ENUM.InteractionType;
import jakarta.persistence.*;
import lombok.*;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Entity
@Builder
@Table(name = "interaction")
public class Interaction {

    @Id
    @GeneratedValue
    private Long id;
    @Enumerated(EnumType.STRING)
    private InteractionType interactionType;
    @ManyToOne
    private Comment comment;
    @Column(nullable = false)
    private Long idUser;
}
