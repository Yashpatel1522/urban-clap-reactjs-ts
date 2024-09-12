# Urban Clap Frontend

This repository contains the frontend code for the Urban Clap project, built with ReactJS and TypeScript. It handles the user interface and client-side logic.

## Project Overview

In this project, the frontend provides a user interface for:
- **Service Providers**: They can add their services, manage service requests, and either accept or reject bookings.
- **Customers**: They can browse and book services based on their requirements.
- **Admins**: They manage the overall process, including monitoring all activities, reviewing logs, and overseeing service provider actions.


## Prerequisites

- **Node.js** (v14 or later)
- **npm** (v6 or later) or **yarn**

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/urban-clap-frontend.git
   cd urban-clap-frontend

## Configuration

1. Set up the `.env` file in the root directory with the backend API URL:
    
    ```env
    REACT_APP_API_URL=http://localhost:8000/api

## TypeScript

This project uses TypeScript for type safety and enhanced developer experience.

### TypeScript Configuration

The TypeScript configuration is located in `tsconfig.json`. Key settings include:

- **compilerOptions**: Defines compiler behavior and options.
- **include**: Specifies which files to include in the compilation.
- **exclude**: Specifies which files to exclude from the compilation.

For more details on the TypeScript configuration options, refer to the [TypeScript documentation](https://www.typescriptlang.org/tsconfig).

### Type Checking

To perform type checking, use:

   Using npm:

    ```bash
    npm run type-check

## Contributing

Feel free to open issues or submit pull requests. Please adhere to the project's coding style and guidelines.

For more details, check the backend repository: [Urban Clap Backend](https://github.com/your-username/urban-clap-backend)
