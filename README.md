# Sophie's Vending Machine

This is a vending machine web app that blends traditional and modern vending machine functionalities.

[Try it on CodeSandbox](https://githubbox.com/heroui-inc/heroui/next-app-template)

## Technologies Used

- [Next.js 14](https://nextjs.org/docs/getting-started)
- [HeroUI v2](https://heroui.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Tailwind Variants](https://tailwind-variants.org)
- [TypeScript](https://www.typescriptlang.org/)

## Application Structure

### User Flow

1. **Deposit Coins**: Users start by inserting coins into the vending machine.
2. **Select a Product**: After depositing enough coins, users can select a product from the available options.
3. **Confirm Purchase**: Users confirm their selection and proceed with the purchase.
4. **Enjoy**: Users receive their selected product and any change due.

### Data Flow

- **State Management**: The application uses React's `useState` and `useEffect` hooks to manage state and side effects.
- **Components**: Each step in the user flow is represented by a separate component (`Step1Page`, `Step2Page`, `Step3Page`, `Step4Page`).
- **Props**: Data is passed between components using props, ensuring a unidirectional data flow.

## Main Components

- **Step1Page**: Handles the coin deposit process, allowing users to insert coins and view their wallet status.
- **Step2Page**: Displays available products and allows users to select a product based on the amount deposited.
- **Step3Page**: Confirms the user's selection, calculates change due, and handles the payment process.
- **Step4Page**: Finalizes the purchase, displays the selected product, and provides the user with their change.

## Future Work

### Redo Flow

- **New Flow**: Redesign the flow so that users select a drink first before inserting coins.
- **Current Iteration**: The current flow mimics traditional vending machines where users insert coins first.

### Accessibility (WCAG)

- **WCAG Friendly**: Make the application more accessible by adhering to WCAG guidelines.
- **Examples**: Add ARIA labels, ensure keyboard navigability, and provide high-contrast themes.

### Multilingual Support

- **Text for Other Languages**: Create text translations for multiple languages to cater to a diverse user base.

### Scalability

- **More Accessible**: Implement features like voice commands and screen reader support.
- **Examples**: Use scalable vector graphics (SVGs) for icons, optimize performance for large datasets, and ensure responsive design for various screen sizes.

## How to Use

1. Git clone
2. Install dependencies
You can use one of them npm, yarn, pnpm, bun, Example using npm:
3. Run the development server