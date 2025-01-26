package c23_104_webapp.microservice_post.Entities;

import jakarta.persistence.*;
import lombok.*;

import java.util.HashSet;
import java.util.Set;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Entity
@Builder
@Table(name = "community")
public class Community {

    @Id
    @GeneratedValue
    private Long id;
    @Column(nullable = false)
    private String name;

    @ElementCollection
    @CollectionTable(
            name = "community_users",
            joinColumns = @JoinColumn(name = "community_id")
    )
    @Column(name = "user_id")
    private Set<Long> idUsers = new HashSet<>();
    @Column(nullable = false)
    private Long memberCount = 0L;
}
