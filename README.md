# learn_mern_stack

A learning / boilerplate project for the MERN stack (MongoDB, Express, React, Node.js).

---

## Table of Contents

- [About](#about)  
- [Features](#features)  
- [Tech Stack](#tech-stack)  
- [Project Structure](#project-structure)  
- [Getting Started](#getting-started)  
  - [Prerequisites](#prerequisites)  
  - [Installation](#installation)  
  - [Running](#running)

---

## About

This repository is built as a learning project to explore and practice building a full-stack application using the MERN stack. It demonstrates how to connect a React frontend to an Express + Node.js backend, perform CRUD operations, and interact with MongoDB.

You can use it as a starting point (boilerplate) or learning resource.

---

## Features

Here are some of the (expected / placeholder) features this project supports or may support:

- CRUD operations (Create, Read, Update, Delete)  
- RESTful API endpoints  
- React frontend consuming the API  
- Error handling & validation  
- Environment configuration  
- Optionally: authentication, authorization, middleware, etc.

---

## Tech Stack

- **Backend**: Node.js, Express  
- **Database**: MongoDB (with Mongoose)  
- **Frontend**: React  
- **Utilities / Tooling**: dotenv, nodemon (development), etc.

---

## Project Structure


- `backend/` — contains the server side code  
- `frontend/` — contains the React app  

---

## Getting Started

### Prerequisites

Make sure you have the following installed locally:

- Node.js (v14+ recommended)  
- npm or yarn  
- MongoDB (locally or remote)  

### Installation

1. Clone the repo  
   ```bash
   git clone https://github.com/Naing-Lynn-Aung/learn_mern_stack.git
   cd learn_mern_stack

   cd backend
     npm install
   # Create a .env file in the backend folder:
     PORT = YOUR_BACKEND_PORT
     JWT_SECRET = YOUR_JWT_SECRET
     MAIL_HOST = YOUR_MAIL_HOST
     MAIL_PORT = YOUR_MAIL_PORT
     MAIL_AUTH_USER = YOUR_MAIL_AUTH_USER
     MAIL_AUTH_PASS = YOUR_MAIL_AUTH_PASS
   cd ../frontend
     npm install
   # Create a .env file in the backend folder:
     VITE_BACKEND_URL = YOUR_VITE_BACKEND_URL
     VITE_BACKEND_ASSET_URL = YOUR_VITE_BACKEND_ASSET_URL
   
  ### Running
  # Backend
    cd backend
    npm run dev
  # Frontend
    cd ../frontend
    npm start


