# Email Service

## Overview
This project implements an `EmailService` class that handles sending emails with retry logic, fallback between providers, idempotency, rate limiting, and status tracking. It also includes bonus features such as a circuit breaker pattern, simple logging, and a basic queue system.

## Project Structure
- `src/`
  - `EmailService.js`: The main class handling email sending.
  - `providers/`: Mock email providers.
  - `utils/`: Utility functions for rate limiting, retry logic, etc.
  - `__tests__/`: Unit tests for the EmailService.
  - `main.js`: Entry point to run the email service.

## Setup
1. Clone the repository.
2. Install dependencies (if any, though this example uses no external libraries).
3. Run the tests: `npm test`.
4. Execute the main file: `node src/main.js`.

## Features
- **Retry with Exponential Backoff**: Automatically retries sending emails with increasing delays.
- **Fallback Mechanism**: Switches between providers if the current one fails.
- **Idempotency**: Prevents duplicate email sends.
- **Rate Limiting**: Limits the number of emails sent in a given time frame.
- **Circuit Breaker**: Stops sending emails temporarily after a certain number of failures.
- **Logging**: Logs all major events.

## License
MIT License
