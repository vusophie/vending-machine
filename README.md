# Sophie's Vending Machine

Welcome to **Sophie's Vending Machine** – a modern vending machine web app that blends traditional functionality with new-age technology.

## Table of Contents

- [Technologies Used](#technologies-used)
- [Application Structure](#application-structure)
  - [User Flow](#user-flow)
  - [Data Flow](#data-flow)
- [Main Components](#main-components)
- [Future Work](#future-work)
  - [Redesign User Flow](#redo-flow)
  - [Accessibility Enhancements](#accessibility-wcag)
  - [Multilingual Support](#multilingual-support)
  - [Scalability Features](#scalability)
- [How to Use](#how-to-use)

---

## Technologies Used

This project utilizes the following technologies to create a seamless experience:

- **[Next.js 14](https://nextjs.org/docs/getting-started)** – React framework for building static and dynamic web applications.
- **[HeroUI v2](https://heroui.com/)** – A set of pre-built components for building beautiful user interfaces.
- **[TypeScript](https://www.typescriptlang.org/)** – Superset of JavaScript that improves development efficiency through type safety.

---

## Application Structure

### User Flow

The application guides the user through a simple, intuitive sequence of steps to complete a purchase:

1. **Deposit Coins**: Users begin by inserting coins into the vending machine.
2. **Select a Product**: Once enough coins are inserted, users can choose from available products.
3. **Confirm Purchase**: After selecting a product, users confirm their choice and proceed with the purchase.
4. **Enjoy**: The user receives their selected product along with any change due.

### Data Flow

- **State Management**: React’s `useState` and `useEffect` hooks handle state management and side effects throughout the app.
- **Component-Based Architecture**: Each step in the user flow is encapsulated in a separate component (`Step1Page`, `Step2Page`, `Step3Page`, `Step4Page`), promoting reusability and maintainability.
- **Props**: Data is passed between components via props to ensure a unidirectional flow of information.

---

## Main Components

Here’s a breakdown of the primary components within the app:

- **Step1Page**: Manages the coin deposit process and updates the user’s wallet status.
- **Step2Page**: Displays available products and allows users to select a product based on the amount deposited.
- **Step3Page**: Confirms the user’s selection, calculates any change due, and manages the payment process.
- **Step4Page**: Finalizes the purchase, shows the selected product, and provides the user with any remaining change.

---

## Future Work

The project has several areas for future enhancement:

### Redesign User Flow

- **New Flow**: The flow will be redesigned so that users select a product (e.g., a drink) first, before inserting coins.
- **Current Flow**: The current flow mimics traditional vending machines where coins are inserted before product selection.

### Accessibility (WCAG)

- **WCAG-Friendly**: Improve accessibility by adhering to Web Content Accessibility Guidelines (WCAG).
- **Planned Improvements**: 
  - Add ARIA labels.
  - Ensure better keyboard navigability throughout the app.

### Multilingual Support

- **Text Translations**: The app will support multiple languages, catering to a global audience by providing translations for text content.

### Scalability Features

- **Enhanced Accessibility**: Features like voice commands and screen reader support will be added.
- **Performance Optimization**: Use scalable vector graphics (SVGs) for icons, optimize for large datasets, and ensure responsive design across devices.

---

## How to Use

Follow these simple steps to get the app up and running:

1. Clone the repository:
    ```bash
    git clone https://github.com/vusophie/vending-machine.git
    ```

2. Install dependencies:
    ```bash
    cd vending-machine
    npm install
    ```

3. Run the development server:
    ```bash
    npm run dev
    ```

4. Navigate to [http://localhost:3000](http://localhost:3000) in your browser to start using the vending machine!
