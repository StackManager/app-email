# Project Name

Welcome to the Project Payment! This document provides instructions on using Docker Compose for building images, running tests, and additional resources.

# Enviar los emails de authentificacion

## 1. Build project

### Clonning and Building

1. Create all submodules in the project

   ```bash
      git remote add origin git@githubManager:StackManager/app-email.git
      or
      git clone git@githubManager:StackManager/app-payment.git &&
      cd app-payment
      git submodule add git@githubManager:StackManager/app-commons.git api-email/service-email/src/commons
      git submodule add git@githubManager:StackManager/app-commons.git api-email/manager-email/src/commons
   ```

2. Update all modules and submodules:

   First, navigate to the main app-payment directory:

   ```bash
      cd api-payment/service-auth/src/commons &&
      git pull origin main &&
   ```

## 2. Docker Compose Dev

### Building and Running the Application

1. To rebuild the Docker image or when there are changes to the package, follow these steps:

   ```bash
      docker-compose -f docker-compose.dev.yml down
      docker-compose -f docker-compose.dev.yml build
      docker-compose -f docker-compose.dev.yml up -d
   ```

   1.1 Make all the proccess

   ```bash
      cls && docker-compose -f docker-compose.dev.yml down && docker-compose -f docker-compose.dev.yml build && docker-compose -f docker-compose.dev.yml up -d
   ```

   Note: This will stop any running containers, build a new image, and start the containers again in detached mode.

2. To start the Docker containers, follow these steps:
   ```bash
   docker-compose -f docker-compose.dev.yml up -d
   ```

## 3. Database Access

### Using

1. http://localhost:8081/db/paymentMongoDB/

## 4. Running Tests

### Run tests using the following command:

1. This command will run tests that match the given keyword.

   ```bash
   npm run test
   npm run test -- -t "a consultant should not delete any member"
   ```

2. This command will run tests in the specific file

   ```bash
   npm run test-file C:\Users\angel\OneDrive\Escritorio\Projects\StackManager\app-payment\api-payment\src\services\InstitutionSubscription\__test__\client\ClientSubscriptionCalculatePayment.test.ts

   npm run test-file C:\Users\angel\OneDrive\Escritorio\Projects\StackManager\app-payment\api-payment\src\services\InstitutionSubscription\__test__\client\ClientSubscriptionUpdate.test

   ```

## 5. Networks

### Create a networt to comunicate in microservices

1. this command will create a network to communication in microservices

   ```bash
      docker network create my_network
   ```

2. this is example to configure a access from a microservice to another, we can see the URL is to a container name about the docker-composer file

   ```bahs
      API_AUTHENTIFICATION_URL=http://service_node_auth:3000/api/v1
      API_AUTHENTICATION_PUBLIC_KEY=n]bB[}5yJS@QzP@ymNx1C)8rBWfAUCV6DN8!4h%x<l+o(H
      API_AUTHENTICATION_EMAIL=angel0@gmail.com
      API_AUTHENTICATION_PASSWORD=Angel1986*
   ```

## Additional Observations

For decoding Base64 strings, you can use base64decode.org.
To work with JSON Web Tokens (JWT), you can visit jwt.io for decoding, encoding, and learning more about JWT.
Feel free to explore and contribute to this project!
