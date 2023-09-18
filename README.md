# Cake Ecommerce Website Documentation

Welcome to the documentation for the Cake Ecommerce Website. This document provides an overview of the website's features, setup instructions, and other relevant information.

## Table of Contents

1. [Introduction](#introduction)
2. [Features](#features)
3. [Installation](#installation)
4. [Usage](#usage)
5. [Tech Stack](#tech-stack)
6. [Contributing](#contributing)
7. [License](#license)

## Introduction

The Cake Ecommerce Website is an online platform where users can browse, order, and review delicious cakes. It's built using a modern tech stack and is designed to provide a seamless cake shopping experience.

## Features

- **Browse Cakes**: Users can view a catalog of available cakes with details such as name, price, and description.

- **Search and Filter**: Users can search for specific cakes and filter them by various criteria, such as cake type, flavor, and price range.

- **Shopping Cart**: Users can add cakes to their shopping cart, review their selections, and proceed to checkout.

- **User Authentication**: Secure user authentication and registration system to manage user accounts.

- **Product Reviews**: Users can leave reviews and ratings for cakes they've purchased.

- **Admin Dashboard**: An admin panel for managing cakes, orders, and user accounts.

## Installation

To set up the Cake Ecommerce Website on your local machine, follow these steps:

1. Clone the repository:

    ```bash
    git clone https://github.com/rosanno/cake-shop
    cd cake-shop
    ```

2. Install dependencies for both the frontend and backend:

    ```bash
    # Install frontend dependencies
    cd admin
    npm install

    # Install frontend dependencies
    cd client
    npm install

    # Install backend dependencies
    cd server
    npm install
    ```

3. Configure environment variables by creating a `.env` file in the `server` directory.

## Usage

To run the Cake Ecommerce Website:

1. Start the backend server:

    ```bash
    # In the server directory
    npm dev
    ```

2. Start the frontend application:

    ```bash
    # In the client directory
    npm dev
    ```

3. Start the frontend application:

    ```bash
    # In the admin directory
    npm dev
    ```

4. Access the website in your web browser at `http://localhost:5173/`.

## Tech Stack

The Cake Ecommerce Website is built using the following technologies:

- **Frontend**:
  - React.js
  - Redux Toolkit
  - Tailwind CSS
  - chakraUI

- **Backend**:
  - Node.js
  - jwt authentication
  - Express.js
  - MongoDB

## Contributing

We welcome contributions to improve the Cake Ecommerce Website. If you'd like to contribute, please follow these guidelines:

1. Fork the repository on GitHub.
2. Clone your forked repository to your local machine.
3. Create a new branch for your feature or bug fix.
4. Make your changes and commit them with clear and concise messages.
5. Push your changes to your GitHub repository.
6. Create a pull request to the main repository's `main` branch.

## License

This project is licensed under the [MIT License](LICENSE).

---

Thank you for using the Cake Ecommerce Website! If you have any questions or need assistance, feel free to contact us. Happy cake shopping!
