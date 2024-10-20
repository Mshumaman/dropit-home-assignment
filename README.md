# Project Overview: Playwright Automation (UI & API)

This project is built using Playwright and TypeScript and focuses on both UI and API test automation. Below is a breakdown of the three main components of the project.

## Part 1: UI Automation

For the UI automation, I implemented a **Page Object Model (POM)** to enhance maintainability and readability. This setup allows for easier test scalability, where each page in the application is represented as a class containing elements and actions.

In this part, I also used **Faker.js** to generate random test data for UI form submissions, providing variability in the tests. The UI automation tests were built to validate core functionalities of the web application, such as logging in, purchasing items, and more.

### Features:
- **Page Object Model (POM)** for structured and scalable UI tests.
- **Faker.js** to create dynamic test data.
- Implemented **GitHub Actions** with a dedicated job for running UI tests: `ui-test`.

## Part 2: API Automation

The API automation was designed to test the functionality of the PetStore API, covering various operations such as creating, updating, and retrieving pets.

For this part, I created a **PetApiClient** class, which encapsulates all the API methods for interaction with the PetStore API. I utilized **Playwright’s request context** for making API calls and integrated **tslog** for structured logging throughout the tests, ensuring a clear log of each test’s steps and results.

### Features:
- **PetApiClient** class to manage API calls.
- **tslog** for structured logging of API tests.
- Implemented **GitHub Actions** with a dedicated job for running API tests: `api-test`.

## Part 3: Time Machine Question

In this section, I answered a fun, hypothetical question about time travel. You can find both the **Hebrew** and **English** versions of my answer through the links below:

- [Hebrew Answer](./path_to_hebrew_answer.md)
- [English Answer](./path_to_english_answer.md)

## GitHub Actions Setup

This project uses **GitHub Actions** to automate the test runs. There are two jobs in the pipeline:

- **UI Tests:** Runs the UI automation tests.
- **API Tests:** Runs the API automation tests.

Both jobs are triggered on every push to the `main` or `master` branches, and on pull requests.

---

## Installation and Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/Mshumaman/dropit-home-assignment.git
   ```

2. Install dependencies (ensure Node.js and Playwright dependencies are installed):
   ```bash
   npm install
   ```

3. Install Playwright browsers:
   ```bash
   npx playwright install --with-deps
   ```

## Running Tests

- To run **UI tests**, execute:
  ```bash
  npx playwright test --grep=@uiAutomation
  ```

- To run **API tests**, execute:
  ```bash
  npx playwright test --grep=@apiTests
  ```