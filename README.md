
# E-Commerce Shop

A modern React-based e-commerce application with full shopping cart functionality, product management, and user authentication.

## Features

- **Product Catalog**: Browse and search through products with category filtering
- **Shopping Cart**: Add, remove, and manage items in your cart
- **User Authentication**: Secure login and registration system
- **Admin Dashboard**: Product management and inventory control
- **Responsive Design**: Mobile-friendly interface
- **Order Management**: Track orders and view order history

## Tech Stack

- React 18 with TypeScript
- Vite for fast development and building
- Tailwind CSS for styling
- React Query for state management
- React Router for navigation

## Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone <your-repository-url>
cd <project-directory>
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
# Edit .env with your database credentials
```

4. Start the development server:
```bash
npm run dev
```

5. Open your browser and navigate to `http://localhost:8080`

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Project Structure

```
src/
├── components/          # Reusable UI components
├── pages/              # Application pages
├── contexts/           # React context providers
├── hooks/              # Custom React hooks
├── services/           # API service functions
├── data/               # Static data and utilities
└── integrations/       # Database integrations
```

## Environment Variables

Create a `.env` file in the root directory with:

```
VITE_DATABASE_URL=your_database_url
VITE_DATABASE_ANON_KEY=your_database_anon_key
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

This project is licensed under the MIT License.
