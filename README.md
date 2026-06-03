# Full Stack Inventory Management System

## Overview

The Full Stack Inventory Management System is a web application designed to manage products, customers, and orders while maintaining accurate inventory levels. The application provides a dashboard for monitoring inventory statistics and enforces business rules such as stock validation and unique customer/product constraints.

This project is built using a modern full-stack architecture with FastAPI for the backend, React for the frontend, PostgreSQL as the database, Docker for containerization, Render for backend deployment, and Vercel for frontend deployment.

---

## Features

### Dashboard

* View total number of products
* View total number of customers
* View total number of orders
* View low-stock products count

### Product Management

* Create products
* View all products
* Update product details
* Delete products
* Unique SKU validation
* Inventory stock tracking

### Customer Management

* Create customers
* View all customers
* Update customer details
* Delete customers
* Unique email validation

### Order Management

* Create customer orders
* Automatic order total calculation
* Automatic inventory deduction after successful order creation
* Stock availability validation before order placement
* Prevention of orders exceeding available stock

---

## Technology Stack

### Backend

* FastAPI
* SQLAlchemy
* Pydantic
* PostgreSQL
* Uvicorn

### Frontend

* React
* Vite
* Axios
* React Router

### DevOps & Deployment

* Docker
* Docker Compose
* Render
* Vercel
* Docker Hub

---

## Project Structure

```text
Full-Stack-Inventory-Management-System/
│
├── backend/
│   ├── app/
│   │   ├── models/
│   │   ├── routers/
│   │   ├── schemas/
│   │   ├── database.py
│   │   └── main.py
│   │
│   ├── Dockerfile
│   ├── requirements.txt
│   └── .env
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   └── services/
│   │
│   ├── Dockerfile
│   ├── package.json
│   └── vite.config.js
│
├── docker-compose.yml
└── README.md
```

---

## Database Design

### Product

| Field          | Type            |
| -------------- | --------------- |
| id             | Integer         |
| name           | String          |
| sku            | String (Unique) |
| price          | Float           |
| stock_quantity | Integer         |

### Customer

| Field | Type            |
| ----- | --------------- |
| id    | Integer         |
| name  | String          |
| email | String (Unique) |

### Order

| Field        | Type    |
| ------------ | ------- |
| id           | Integer |
| customer_id  | Integer |
| total_amount | Float   |

### Order Item

| Field      | Type    |
| ---------- | ------- |
| id         | Integer |
| order_id   | Integer |
| product_id | Integer |
| quantity   | Integer |
| price      | Float   |

---

## Business Rules Implemented

### Product Rules

* Product SKU must be unique
* Product price must be greater than zero
* Stock quantity cannot be negative

### Customer Rules

* Customer email must be unique
* Valid email format is required

### Order Rules

* Customer must exist before placing an order
* Product must exist before ordering
* Ordered quantity cannot exceed available stock
* Stock is automatically reduced after successful order creation
* Total order amount is automatically calculated

---

## API Endpoints

### Products

| Method | Endpoint       | Description       |
| ------ | -------------- | ----------------- |
| GET    | /products      | Get all products  |
| GET    | /products/{id} | Get product by ID |
| POST   | /products      | Create product    |
| PUT    | /products/{id} | Update product    |
| DELETE | /products/{id} | Delete product    |

### Customers

| Method | Endpoint        | Description        |
| ------ | --------------- | ------------------ |
| GET    | /customers      | Get all customers  |
| GET    | /customers/{id} | Get customer by ID |
| POST   | /customers      | Create customer    |
| PUT    | /customers/{id} | Update customer    |
| DELETE | /customers/{id} | Delete customer    |

### Orders

| Method | Endpoint | Description    |
| ------ | -------- | -------------- |
| GET    | /orders  | Get all orders |
| POST   | /orders  | Create order   |

### Dashboard

| Method | Endpoint   | Description          |
| ------ | ---------- | -------------------- |
| GET    | /dashboard | Dashboard statistics |

---

## Local Setup

### Clone Repository

```bash
git clone https://github.com/Shruti-666/Full-Stack-Inventory-Management-System.git

cd Full-Stack-Inventory-Management-System
```

### Backend Setup

```bash
cd backend

python -m venv venv

venv\Scripts\activate

pip install -r requirements.txt

uvicorn app.main:app --reload
```

Backend runs on:

```text
http://localhost:8000
```

Swagger Documentation:

```text
http://localhost:8000/docs
```

### Frontend Setup

```bash
cd frontend

npm install

npm run dev
```

Frontend runs on:

```text
http://localhost:5174
```

---

## Docker Setup

### Build Containers

```bash
docker compose up --build
```

### Run Containers

```bash
docker compose up
```

### Stop Containers

```bash
docker compose down
```

---

## Environment Variables

### Backend (.env)

```env
DB_HOST=localhost
DB_PORT=5432
DB_NAME=inventory_db
DB_USER=postgres
DB_PASSWORD=postgres123
```

---

## Deployment

### Frontend (Vercel)

Frontend URL:

```text
https://YOUR-VERCEL-URL.vercel.app
```

### Backend (Render)

Backend URL:

```text
https://full-stack-inventory-management-system.onrender.com
```

### Swagger Documentation

```text
https://full-stack-inventory-management-system.onrender.com/docs
```

### Docker Hub Image

```text
https://hub.docker.com/r/shrutivats05/inventory-backend
```

---

## Screenshots
* Dashboard
  <img width="1395" height="642" alt="image" src="https://github.com/user-attachments/assets/91513733-1422-4991-a88c-e68fe889d96c" />

* Products Page
  <img width="1400" height="686" alt="image" src="https://github.com/user-attachments/assets/7f1962fc-eed5-435d-b512-31032f3d3329" />

* Customers Page
  <img width="1390" height="653" alt="image" src="https://github.com/user-attachments/assets/57a49613-9293-4dfd-b7e8-474622eb01ad" />

* Orders Page
  <img width="1389" height="622" alt="image" src="https://github.com/user-attachments/assets/2bb43102-0429-44a1-a0fa-7955b1980fa3" />

---

## Future Enhancements

* User Authentication and Authorization
* Role-Based Access Control
* Order History Tracking
* Product Search and Filtering
* Inventory Alerts
* Reporting and Analytics
* Export to Excel/PDF

---

