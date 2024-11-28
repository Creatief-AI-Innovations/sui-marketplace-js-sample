# Project Overview

## Core Backend
Backend Project:
https://github.com/Creatief-AI-Innovations/SuiMarketplaceSDK-Backend

## SDK & Plugins

### JavaScript SDK
Repository:
https://github.com/Creatief-AI-Innovations/sui-marketplace-js

Published NPM Package:
https://www.npmjs.com/package/@creatief/suisdk

### Unreal Engine Plugin
Repository:
https://github.com/Creatief-AI-Innovations/sui-marketplace-ue-plugin

## Demo Projects

### JavaScript Sample
Repository:
https://github.com/Creatief-AI-Innovations/sui-marketplace-js-sample

### Unreal Engine Sample
Repository:
https://github.com/Creatief-AI-Innovations/SuiMarketplaceSDK-Unreal


---

# Sui Marketplace JS Sample

This is a sample project demonstrating the usage of the `@creatief/suisdk` library to build a marketplace application.

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn

## Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/your-username/sui-marketplace-js-sample.git
   cd sui-marketplace-js-sample
   ```

2. Install dependencies:
   ```sh
   npm install
   # or
   yarn install
   ```

3. Create a `.env` file based on `.env.example` and fill in the required environment variables.

## Running the Project

Start the development server:
```sh
npm run dev
# or
yarn dev
```

Build for production:
```sh
npm run build
# or
yarn build
```

## Project Overview

### API Integration
The project integrates with the Sui Marketplace API using the `@creatief/suisdk` library. The API configuration is set up in `marketplaceApi.ts`.

### Authentication
Authentication is managed using the `AuthContext` in `AuthContext.tsx`. The `useAuth` hook is provided for accessing authentication state and actions.

### Product Management
Product-related functionalities are handled using the `useProducts` hook in `useProducts.ts`. This includes:
- Loading products
- Buying and selling
- Listing products

### Components
- **ProductCard**: Displays individual product details and actions
- **NftCard**: Displays NFT product details and actions
- **LoginForm**: Handles user login
- **Layout**: Provides the main layout structure including the header

### Pages
- **Products**: Displays the marketplace products
- **MyProducts**: Displays the user's owned products
- **Login**: Provides the login form for authentication

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any changes.

## License

This project is licensed under the MIT License.