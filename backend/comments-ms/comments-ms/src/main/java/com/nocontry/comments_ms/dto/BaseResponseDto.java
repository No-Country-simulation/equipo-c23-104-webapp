package com.nocontry.comments_ms.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;

@Data
@AllArgsConstructor
public class BaseResponseDto<T> {
    @Schema(description = "Indicates the success or failure of the operation", example = "success")
    private String status;

    @Schema(description = "A message providing additional information about the response", example = "Operation completed successfully.")
    private String message;

    @Schema(description = "The data returned from the API call, if any", example = "{ \"id\": 123, \"name\": \"Example\" }")
    private List<T> data;

}

