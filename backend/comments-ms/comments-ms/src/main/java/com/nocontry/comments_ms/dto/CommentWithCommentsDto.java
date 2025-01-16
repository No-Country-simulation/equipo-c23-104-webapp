package com.nocontry.comments_ms.dto;

import com.nocontry.comments_ms.entity.Comment;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class CommentWithCommentsDto  extends  CommentDto{
    private List<CommentDto> replies = new ArrayList<>();
}
