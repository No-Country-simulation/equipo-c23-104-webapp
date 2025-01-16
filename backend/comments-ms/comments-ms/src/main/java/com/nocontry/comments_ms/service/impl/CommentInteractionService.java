package com.nocontry.comments_ms.service.impl;

import com.nocontry.comments_ms.dto.CommentInteractionDto;
import com.nocontry.comments_ms.entity.CommentInteraction;
import com.nocontry.comments_ms.mapper.CommentInteractionMapper;
import com.nocontry.comments_ms.repository.CommentsInteractionRepository;
import com.nocontry.comments_ms.service.ICommentInteractionService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class CommentInteractionService  implements ICommentInteractionService {

    @Autowired
    private final CommentsInteractionRepository commentInteractionRepository;

    @Override
    public boolean addInteraction(CommentInteractionDto interactionDTO) {
        CommentInteraction commentInteraction = CommentInteractionMapper.toEntity(interactionDTO, CommentInteraction.class);
        commentInteractionRepository.save(commentInteraction);
        return true;
    }

    @Override
    public boolean removeInteraction(CommentInteractionDto interactionDTO) {
        commentInteractionRepository.deleteByCommentIdAndUserId(interactionDTO.getCommentId(), interactionDTO.getUserId());
        return true;
    }
}
