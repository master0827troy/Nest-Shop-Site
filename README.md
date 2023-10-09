# Shop Nest Ecommerce Web App

This is an ecommerce web application built using React, React Router, Redux Toolkit, Tailwind CSS, and Firebase Firestore as the database.

## Features

- **Browse Categories**: Users can browse different categories from the sidebar such as electronics, clothing, books, etcor view all categories at once.
- **Home Page**: The home page displays popular categories, promotions, top brands, and popular products.
- **Product Details**: Users can view detailed information about a product, including rating, description, total number of reviews, available stock, and reviews written by other users.
- **Product Reviews**: Users can write reviews for products and view their own product reviews.
- **Search**: Users can search for specific items.
- **Filtering and Sorting**: Users can apply filters on price range, sort by popularity, rating, and price in ascending or descending order.
- **Stock Availability**: Users can choose to see only the products available in stock.
- **Cart and Checkout**: Users can add items to their cart, create orders, and choose an address and phone number for delivery.
- **Wishlist**: Users can wishlist products and view them on the wishlist page.
- **Authentication**: Users can sign up, log in, and reset their password.
- **User Profile**: Users can view and modify their account information, manage their address book, view previous orders, and see recently viewed products.

## Technologies Used

- React
- React Router
- Redux Toolkit
- Tailwind CSS
- Firebase Firestore

## Prerequisites

- Node.js and npm should be installed on your machine.

## Installation

1. Clone the repository: `git clone https://github.com/0xOmarAdel/shop-nest.git`
2. Navigate to the project directory: `cd shop-nest`
3. Install dependencies: `npm install`

## Configuration

To use Firebase Firestore as the database, you need to set up your Firebase project and obtain the configuration details. Add the configuration details to the `src/api/firebase.tsx` file. Then create a .env  file in the project root directory and add the following line:
`VITE_API_KEY=your_api_key_here`

## Usage

Run the following command to start the development server:
`npm run dev`
Open your browser and visit `http://localhost:3000` to access the app.

To access the deployed version of the app, visit [Shop Nest](https://shop-nest-app.netlify.app).
