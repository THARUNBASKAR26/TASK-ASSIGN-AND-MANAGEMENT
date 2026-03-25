package com.example.assignmenttask.and.managing.system.service;

import com.example.assignmenttask.and.managing.system.dto.TaskRequest;
import com.example.assignmenttask.and.managing.system.entity.Employee;
import com.example.assignmenttask.and.managing.system.entity.Task;
import com.example.assignmenttask.and.managing.system.entity.TaskStatus;
import com.example.assignmenttask.and.managing.system.repository.EmployeeRepository;
import com.example.assignmenttask.and.managing.system.repository.TaskRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
@RequiredArgsConstructor
public class TaskService {

    private final TaskRepository taskRepository;
    private final EmployeeRepository employeeRepository;

    public Task createTask(TaskRequest request) {
        // Rule: Due date cannot be in past
        if (request.getDueDate() != null && request.getDueDate().isBefore(LocalDate.now())) {
            throw new IllegalArgumentException("Due date cannot be in the past");
        }

        Employee creator = employeeRepository.findById(request.getCreatedById())
                .orElseThrow(() -> new IllegalArgumentException("Creator employee not found"));

        Employee assignee = null;
        if (request.getAssignedToId() != null) {
            // Rule: Cannot assign task to non-existing employee
            assignee = employeeRepository.findById(request.getAssignedToId())
                    .orElseThrow(() -> new IllegalArgumentException("Assigned employee not found"));
        }

        Task task = Task.builder()
                .title(request.getTitle())
                .description(request.getDescription())
                .status(request.getStatus() != null ? request.getStatus() : TaskStatus.TODO)
                .dueDate(request.getDueDate())
                .createdBy(creator)
                .assignedTo(assignee)
                .build();

        return taskRepository.save(task);
    }

    public Task updateTaskStatus(Long taskId, TaskStatus status) {
        Task task = taskRepository.findById(taskId)
                .orElseThrow(() -> new IllegalArgumentException("Task not found"));
        task.setStatus(status);
        return taskRepository.save(task);
    }
    
    public Task assignTask(Long taskId, Long employeeId) {
        Task task = taskRepository.findById(taskId)
                .orElseThrow(() -> new IllegalArgumentException("Task not found"));
        Employee assignee = employeeRepository.findById(employeeId)
                .orElseThrow(() -> new IllegalArgumentException("Assigned employee not found"));
        task.setAssignedTo(assignee);
        return taskRepository.save(task);
    }

    public List<Task> getTasksByEmployee(Long employeeId) {
        // Verify employee exists first
        if (!employeeRepository.existsById(employeeId)) {
            throw new IllegalArgumentException("Employee not found");
        }
        return taskRepository.findByAssignedToId(employeeId);
    }

    public List<Task> getAllTasks() {
        return taskRepository.findAll();
    }

    public void deleteTask(Long taskId, Long requestorId) {
        Task task = taskRepository.findById(taskId)
                .orElseThrow(() -> new IllegalArgumentException("Task not found"));
        
        // Rule: Only creator can delete task
        if (!task.getCreatedBy().getId().equals(requestorId)) {
            throw new SecurityException("Only the creator of the task can delete it");
        }
        
        taskRepository.delete(task);
    }
}
