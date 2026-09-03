# NIBSS Banking Backend

A backend system for a simulated digital bank, built as part of a Backend Engineering assignment. It integrates with the NibssByPhoenix API to handle customer identity verification (BVN/NIN), account creation, and core banking operations (transfers, balance checks, transaction status).
## Links

- **Repository:** https://github.com/Raheemcb-cyber/BANK-BACK-END
- **NibssByPhoenix Swagger Docs:** https://nibssbyphoenix.onrender.com/api/docs/#/
## Tech Stack

- Node.js
- Express.js
- Axios (for calling the NibssByPhoenix API)
- dotenv (for environment variable management)

## Features

- **Fintech Onboarding & Auth** — Authenticates with NibssByPhoenix and manages JWT token lifecycle (auto-refreshes when expired)
- **Identity Verification** — Create and validate BVN/NIN records
- **Account Management** — Create customer accounts (pre-funded with ₦15,000), linked to a verified BVN or NIN
- **Core Banking Operations**
  - Name Enquiry (verify recipient before transfer)
  - Funds Transfer (between accounts)
  - Transaction Status Check
  - Account Balance Check

## Project Structure
## Setup Instructions

1. Clone the repository:
2. Install dependencies:
3. Create a `.env` file in the root directory with the following:
   (Obtain these by calling `POST /api/fintech/onboard` on the NibssByPhoenix API with your name and email.)
4. Run the server:

5. The server will run on `http://localhost:3000`

## API Flow

1. **Onboard** to NibssByPhoenix → receive `apiKey` and `apiSecret`
2. **Login** using those credentials → receive a JWT token (auto-refreshed when expired)
3. **Register a BVN or NIN** for the customer
4. **Create an account** linked to that BVN/NIN
5. **Name Enquiry** to verify the recipient before any transfer
6. **Transfer funds** between accounts
7. **Check transaction status** using the returned transaction ID
8. **Check account balance** at any time

## Testing

This project was tested manually via browser-accessible routes during development, and via Postman against the NibssByPhoenix API directly. All core flows (onboarding, login, BVN/NIN creation, account creation, name enquiry, transfer, transaction status, and balance check) were verified working end-to-end against the live NibssByPhoenix sandbox API.

## Notes

- No real BVN/NIN data is used — all identity records are test/dummy data as permitted by the assignment.
- Each account is pre-funded with ₦15,000 upon creation for testing purposes.
- API credentials are stored in `.env` and excluded from version control via `.gitignore`.