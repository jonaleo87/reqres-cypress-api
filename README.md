# reqres-cypress-api

## Project Structure

This project contains automated tests for the ReqRes API using Cypress. The project structure is as follows:

```
reqres-cypress-api/
├── cypress/
│   ├── fixtures/
│   ├── integration/
│   │   ├── api/
│   │   │   ├── users.spec.js
│   ├── plugins/
│   ├── support/
│       ├── commands.js
│       ├── index.js
├── node_modules/
├── cypress.json
├── package.json
├── README.md
```

## Steps to Clone the Project

1. Clone the repository:
    ```sh
    git clone https://github.com/your-username/reqres-cypress-api.git
    ```
2. Navigate to the project directory:
    ```sh
    cd reqres-cypress-api
    ```
3. Install the dependencies:
    ```sh
    npm install
    ```

## Running the Tests

### Run all tests

To run all tests, use the following command:
```sh
npx cypress run
```

### Run tests by directory

To run tests in a specific directory, use the following command:
```sh
npx cypress run --spec "cypress/integration/api/**/*.spec.js"
```