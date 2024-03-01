# README for Poll Realtime APP - SOA

### Backend:
- **Purpose**: The backend seems to be a real-time polling application that allows users to create and participate in polls.
- **Technologies**:
  - **Framework**: NestJS
  - **Languages**: TypeScript
- **Directory Structure**:
  - `backend-nestjs/`:
    - `src/`: Contains the source code for the backend application.
      - `app.controller.ts`, `app.module.ts`, `app.service.ts`: Main files for the NestJS application.
      - `auth/`: Contains authentication-related files.
      - `polls/`: Contains files related to creating and managing polls.
      - `users/`: Contains files related to user management.
      - `utils/`: Contains utility functions like `bcrypt-adapter.ts`.
    - `dist/`: Contains the compiled TypeScript files.
    - `test/`: Contains end-to-end test files.
    - `package.json`, `package-lock.json`: Contains the backend dependencies.
    - `tsconfig.json`, `tsconfig.build.json`: TypeScript configuration files.

## Technologies and Frameworks Used

This backend project is built using the following technologies and frameworks:

- **NestJS**: Nest (NestJS) is a framework for building efficient, scalable Node.js server-side applications. It uses progressive JavaScript, is built with and fully supports TypeScript (yet still enables developers to code in pure JavaScript) and combines elements of OOP (Object Oriented Programming), FP (Functional Programming), and FRP (Functional Reactive Programming).

Under the hood, Nest makes use of robust HTTP Server frameworks like Express (the default) and optionally can be configured to use Fastify as well!

Nest provides a level of abstraction above these common Node.js frameworks (Express/Fastify), but also exposes their APIs directly to the developer. This gives developers the freedom to use the myriad of third-party modules which are available for the underlying platform.


- **TypeScript**: A statically typed superset of JavaScript that adds optional types to the language, enhancing code quality and developer productivity.
- **Docker**: Used for containerizing the application, ensuring consistency across development, testing, and production environments.
- **MySQL**: A popular open-source relational database management system, used for storing application data.

## Application Architecture

The application follows a modular architecture, with each module encapsulating a specific functionality. The main modules include:

- **Auth Module**: Handles user authentication and authorization.
- **Polls Module**: Manages the creation, updating, and deletion of polls. It also handles voting on polls.
- **Users Module**: Manages user profiles, including profile creation and updates.

## Implemented Modules

The backend project includes the following modules:

- **Authentication Module**: Implements user registration, login, and token-based authentication.
- **Polls Module**: Allows users to create, update, and delete polls. It also handles voting on polls.
- **Users Module**: Manages user profiles, including profile creation and updates.

## Running the Project

### Using Docker

To run the project using Docker, follow these steps:

1. Ensure Docker is installed on your machine.
2. Navigate to the project root directory.
3. Run the following command to build and start the Docker containers:

```bash
docker-compose up --build
```

### Using Yarn or npm

To run the project using Yarn or npm, follow these steps:

1. Ensure Node.js and npm (or Yarn) are installed on your machine.
2. Navigate to the project root directory.
3. Install the project dependencies:

```bash
yarn install
```

or

```bash
npm install
```

4. Start the application:

```bash
yarn start
```

or

```bash
npm start
```

## Running Tests

To run the tests for this project, follow these steps:

1. Ensure the project dependencies are installed (as described above).
2. Navigate to the project root directory.
3. Run the following command to execute the tests:
 
```bash
# unit tests
$ yarn run test

# e2e tests
$ yarn run test:e2e

# test coverage
$ yarn run test:cov
```

This will run all the tests in the project, providing a report on the test coverage and any failed tests.