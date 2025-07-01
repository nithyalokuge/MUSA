# Musa

**Musa** is a mobile-first museum website designed for deaf users who communicate using Irish Sign Language (ISL). The web-app features ISL interpretation videos for artifacts, interactive 3D renderings for closer exploration, and puzzle games or quizzes to support engagement and information retention.

This group project is part of the **"Research Project" module (CS7043)** of the **MSc in Interactive Digital Media** at **Trinity College Dublin**.

## Table of Contents

1. [Features](#features)
2. [Technologies](#technologies)
3. [Roles](#roles)
4. [Getting started](#getting-started)
    - [Installation prerequisites](#installation-prerequisites)
    - [Installation steps](#installation-steps)
    - [.env.example](#envexample)
5. [Code organisation](#code-organisation)
6. [Deployment](#deployment)
---
## Features 
Users can:

---

## Technologies
- **Frontend**:  
  - HTML5, EJS, CSS3, JavaScript;
  - [Bootstrap](https://getbootstrap.com/) for responsive design;

- **Backend**:  
  - [Node.js](https://nodejs.org/) for the server-side;
  - [Express.js](https://expressjs.com/) for building the APIs;
  - [MySQL (managed via phpMyAdmin)](http://localhost/MAMP/) for the relational database.

---

## Roles 
- Lucy Jacobson: UI/UX Designer
- Kiera O'Hara: Content Creator
- Robyn Quigley: Project Manager
- Xinkai Ge: 3D Modeler, Programming - Frontend (HTML5, CSS3, JavaScript)
- Nithya Samadhi Lokuge: Programming lead - Frontend (HTML5, EJS, CSS3, Bootstrap, JavaScript), Database structure, Backend
  
---

## Getting Started

### Installation prerequisites 
**Before running **Musa**, ensure you have the following installed:**  
- [Node.js](https://nodejs.org/) (for running the backend)  

### Installation steps
**1. Download the repository**.

**2. Install all dependencies**: 
```bash
npm i
```
**3. Set environment variables**: update the `.env` file in the root directory and populate it with the necessary values. You can refer to the [`.env.example`](#envexample) file for guidance.

**4. Run the project**: 
```bash
npm start
```

**5. Visit** http://localhost:PORT **and explore Musa**: 

*Note*: Instead of PORT, insert the PORT number you specified in the `.env` file.

### .env.example

```env
# MAMP MySQL configuration
DB_HOST = localhost          # Default for MAMP
DB_USER = root               # Default for MAMP
DB_PASSWORD = root           # Default for MAMP
DB_NAME = musa            
DB_PORT = 3306               # Default MySQL port

# Server port (Change if needed)
PORT = 5500
```
---

## Code organisation

- `public`: stores all static files such as CSS, images, videos and front-end JavaScript.
- `views`: contains the files that define the UI of the application. It uses the EJS template engine for dynamic content rendering.
    - `partials`: stores reusable view components such as headers, the sidebar, and the footer.
- `index.js`: this file is the entry point of the application. It initialises the server, and sets up routes.

---

## Deployment

---
