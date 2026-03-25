package com.example.assignmenttask.and.managing.system.dto;

import com.example.assignmenttask.and.managing.system.entity.TaskStatus;
import lombok.Data;

import java.time.LocalDate;

@Data
public class TaskRequest {
    private String title;
    private String description;
    private TaskStatus status;
    private Long assignedToId;   // Can be null
    private Long createdById;    // Required
    private LocalDate dueDate;
}
