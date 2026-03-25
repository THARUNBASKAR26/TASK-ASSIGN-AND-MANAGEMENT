# Task Assignment & Management System 🚀

A modern, full-stack application for managing and assigning tasks to employees. The system is built with a **Java Spring Boot** backend, a **MySQL** database, and a beautiful glassmorphic **React + Vite** frontend.

![Task Dashboard](https://img.shields.io/badge/Project-FullStack-blue)
![Spring Boot](https://img.shields.io/badge/Backend-Spring%20Boot-green)
![React](https://img.shields.io/badge/Frontend-React-61dafb)

## ✨ Features
- **Employee Management:** Register and view employees within the organization.
- **Task Dashboard:** Create, view, and organize tasks efficiently.
- **Task Assignment:** Assign tasks strictly to existing employees.
- **Validation Rules Engine:** 
  - Due dates cannot be set in the past.
  - Only the original creator of a task has the permission to delete it.
- **Dynamic Frontend UI:** Premium Dark-Mode design with smooth CSS micro-interactions and glassmorphism styling.
- **RESTful APIs:** Complete API layer exposed and documented with **Swagger UI**.

## 🛠️ Tech Stack
- **Frontend:** React, Vite, React Router, Axios, CSS Variables (Custom Design System).
- **Backend:** Java 17+, Spring Boot 3.x, Spring Data JPA, Hibernate, OpenAPI (Swagger).
- **Database:** MySQL.

---

## 🚀 Getting Started

### 1. Prerequisites
- Node.js (v20+ recommended)
- Java Development Kit (JDK 17+)
- MySQL Server running locally on port 3306

### 2. Database Setup
Ensure you have MySQL running. The application is configured to automatically create the database schema on boot.
- **Database:** `task_management_db`
- **Username:** `root`
- **Password:** `1234`
*(If your credentials differ, update them in `backend/src/main/resources/application.properties`)*

### 3. Running the Backend (Spring Boot)
Open a terminal and navigate to the `backend` directory:
```bash
cd backend
./mvnw spring-boot:run
```
The backend server will start on `http://localhost:8080`.
- **API Documentation (Swagger):** `http://localhost:8080/swagger-ui.html`

### 4. Running the Frontend (React)
Open a separate terminal and navigate to the `frontend` directory:
```bash
cd frontend
npm install
npm run dev
```
The application will be accessible at `http://localhost:5173`.

## 🤝 Contributing
Contributions, issues, and feature requests are welcome! Feel free to check the issues page.
