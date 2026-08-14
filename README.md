# Restaurant Application - Frontend

## Tech Stack
- Framework: React (built with Vite)
- Routing: React Router
- State Management: React Context API
- Styling: Bootstrap

## Architecture Decisions
- Using Context API: Instead of Redux, we used React's Context API for managing the shopping cart and user login. It is simpler and works perfectly for this size of project.
- Route Protection: We built a simple check (interceptor) in the frontend. If a user tries to place an order without logging in, they are safely redirected to the login page without the app crashing.

## Setup Instructions

### Prerequisites
- Node.js (v18 or newer)

### Getting Started
1. Open your terminal and go to the frontend folder:
   `cd frontend`

2. Install the required packages:
   `npm install`

3. Create a `.env` file and add this variable:
   ```
   VITE_API_BASE_URL=http://127.0.0.1:8000/api
   ```

4. Start the React app:
   `npm run dev`
   (The frontend will be available at http://localhost:5173)