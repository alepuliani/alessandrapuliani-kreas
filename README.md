# Kreas

A Vue.js Application for Sustainable Products

🔗 [go to Kreas](https://alepuliani.github.io/alessandrapuliani-kreas/)

## Features

- **Home Page**: Displays a list of product cards for easy browsing and selection.
- **Product Details**: Provides detailed information about each product when selected.
- **Cart Functionality**: Allows users to view and manage their selected items, with cart contents preserved through browser storage.
- **Order Process**: Finalizes and confirms the user's order upon completion.

## Technical Choices:

1. **Vue Router**: Used for managing navigation across different views:

- _Home_: Used for managing navigation across different views:
- _Product Details_: Displays detailed product information.
- _Cart_: Manages and shows cart items.
- _Order Confirmation_:Confirms successful orders.

2. **Pinia**: Centralized state management is handled with Pinia, ensuring consistent data management across components and routes.

## Component-Based Architecture:

**Header** and **Footer**: Reusable components for consistent site layout.
**BaseButton**: Standardized button component for uniform functionality.
**Product** **Cards**: Custom components for displaying product information on the home page.

## Getting Started

To run the project locally, follow these steps:

**1. Clone the repository:**

```javascript
git clone https://github.com/alepuliani/alessandrapuliani-kreas.git
```

**2. Install dependencies:**

```javascript
cd alessandrapuliani-kreas
npm install
```

**3. Run the Development Server:**

```javascript
npm run dev
```
