package c23_104_webapp.microservice_post.Entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import lombok.*;

import java.util.HashSet;
import java.util.Set;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Entity
@Builder
public class Community {

    @Id
    @GeneratedValue
    private Long id;
    @Column(nullable = false)
    private String name;

    private Set<String> username = new HashSet<>();
    @Column(nullable = false)
    private Long memberCount;
}
