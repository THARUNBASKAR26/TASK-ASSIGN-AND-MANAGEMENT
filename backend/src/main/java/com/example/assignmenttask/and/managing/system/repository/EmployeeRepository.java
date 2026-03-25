package com.example.assignmenttask.and.managing.system.repository;

import com.example.assignmenttask.and.managing.system.entity.Employee;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EmployeeRepository extends JpaRepository<Employee, Long> {
}
