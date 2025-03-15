# Food Delivery App

This project is a full-stack food delivery application built with React, Vite, Node.js, Express, and MongoDB. It allows users to browse a menu, add items to their cart, place orders, and track their orders. The application also includes an admin panel for managing food items and orders.

## Features

### Client
- Browse menu items by category
- Add items to the cart
- View cart and proceed to checkout
- Place orders and make payments
- Track order status
- User authentication (signup, login, logout)

### Admin
- Add new food items
- List all food items
- Remove food items
- View and update order status

## API Endpoints

### User
- `POST /api/user/signup` - Register a new user
- `POST /api/user/login` - Login a user
- `GET /api/user/logout` - Logout a user

### Food
- `POST /api/food/add` - Add a new food item (Admin only)
- `GET /api/food/list` - Get all food items
- `DELETE /api/food/remove` - Remove a food item (Admin only)

### Cart
- `POST /api/cart/add` - Add an item to the cart
- `POST /api/cart/remove` - Remove an item from the cart
- `GET /api/cart/list` - Get the current cart

### Order
- `POST /api/order/place` - Place a new order
- `POST /api/order/verify` - Verify payment status
- `GET /api/order/userorders` - Get orders for the logged-in user
- `GET /api/order/listorders` - Get all orders (Admin only)
- `PATCH /api/order/status` - Update order status (Admin only)

## Running the Project

### Prerequisites
- Node.js
- MongoDB
- Cloudinary account (for image uploads)
- Stripe account (for payment processing)

### Steps

1. Clone the repository:
    ```sh
    git clone <repository-url>
    cd Food-Delivery
    ```

2. Set up environment variables:
    - Create a `.env` file in the `server` directory with the following content:
        ```env
        PORT=4000
        URL=<your-mongodb-url>
        JWT_KEY=<your-jwt-secret>
        CLOUDINARY_CLOUD_NAME=<your-cloudinary-cloud-name>
        CLOUDINARY_API_KEY=<your-cloudinary-api-key>
        CLOUDINARY_API_SECRET=<your-cloudinary-api-secret>
        STRIPE_KEY=<your-stripe-key>
        CLIENT=http://localhost:5173
        ```

    - Create a  file in the  directory with the following content:
        ```env
        VITE_SERVER=http://localhost:4000
        ```

3. Install dependencies:
    - For the server:
        ```sh
        cd server
        npm install
        ```

    - For the client:
        ```sh
        cd ../client
        npm install
        ```

    - For the admin panel:
        ```sh
        cd ../admin
        npm install
        ```

4. Run the server:
    ```sh
    cd server
    npm run server
    ```

5. Run the client:
    ```sh
    cd ../client
    npm run dev
    ```

6. Run the admin panel:
    ```sh
    cd ../admin
    npm run dev
    ```

7. Open the client application in your browser at `http://localhost:5173` and the admin panel at `http://localhost:5174`.
