package com.nocontry.comments_ms.mapper;

import com.nocontry.comments_ms.dto.CommentInteractionDto;
import com.nocontry.comments_ms.entity.CommentInteraction;

import java.util.List;
import java.util.stream.Collectors;

public class CommentInteractionMapper {

    public static <T> T toDto(CommentInteraction interaction, Class<T> dtoClass) {
        if (dtoClass == CommentInteractionDto.class) {
            CommentInteractionDto dto = new CommentInteractionDto();
            dto.setInteractionId(interaction.getInteractionId());
            dto.setCommentId(interaction.getCommentId());
            dto.setUserId(interaction.getUserId());
            dto.setCreatedAt(interaction.getCreatedAt());
            return dtoClass.cast(dto);
        }
        throw new IllegalArgumentException("Unsupported DTO type: " + dtoClass.getName());
    }

    public static <T> T toEntity(CommentInteractionDto interactionDto, Class<T> entityClass) {
        if (entityClass == CommentInteraction.class) {
            CommentInteraction entity = new CommentInteraction();
            entity.setInteractionId(interactionDto.getInteractionId());
            entity.setCommentId(interactionDto.getCommentId());
            entity.setUserId(interactionDto.getUserId());
            entity.setCreatedAt(interactionDto.getCreatedAt());
            return entityClass.cast(entity);
        }
        throw new IllegalArgumentException("Unsupported Entity type: " + entityClass.getName());
    }

}
