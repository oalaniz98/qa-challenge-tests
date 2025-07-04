## Getting Started

### Prerequisites

- Node.js 18+
- Yarn
- Docker (optional, for PostgreSQL)

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd qa-challenge
```

2. Install dependencies:

```bash
yarn install
```

3. Start the PostgreSQL database (using Docker):

```bash
yarn setup:db
# Or using Docker Compose
yarn docker-compose:up
```

4. Start the backend:

```bash
yarn backend
```

5. Start the frontend:

```bash
yarn frontend
```

6. Access the application at http://localhost:3000

QA Challenge - Automated Tests with Playwright
This project includes an end-to-end test suite created with Playwright to validate the Rooming List Management application.

What’s Covered
Search input behavior (including empty states)

Filter dropdown functionality (open, select, save, persist)

UI responsiveness on different screen sizes

Booking details panel visibility

Event card structure and visual validation

Test Location
All tests are located in:

bash
Copy
Edit
/tests/rooming-list/

Run the Tests
bash
Copy
Edit
npx playwright test

View the Report
bash
Copy
Edit
npx playwright show-report

Requirements
Before running tests, ensure the app is running locally at http://localhost:3000. You can start the app using the steps described above in this README.

