# AI Trivia Quiz Generator

A full-stack web application that leverages Google's Generative AI (Gemini) to generate custom, dynamic trivia quizzes. This project consists of a React frontend and a Node.js/Express backend.

## 🚀 Features

*   **AI-Powered Quizzes**: Uses the Gemini API to automatically generate engaging trivia questions on various topics.
*   **Modern Frontend**: Built with React and Vite for a fast and responsive user interface.
*   **Robust Backend**: Express.js REST API handling rate limiting and secure communication with the Gemini AI.

## 🛠️ Tech Stack

*   **Frontend**: React (v18), Vite, CSS Modules
*   **Backend**: Node.js, Express.js, `@google/generative-ai`
*   **Other**: CORS, dotenv, express-rate-limit

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
*   [Node.js](https://nodejs.org/) (v18 or higher recommended)
*   A [Google Gemini API Key](https://aistudio.google.com/)

## ⚙️ Installation & Setup

### 1. Clone the repository
```bash
git clone https://github.com/darshanacharya2/trivia-quiz-generator-.git
cd trivia-quiz-generator-
```

### 2. Backend Setup
Navigate to the `backend` directory and install the dependencies:
```bash
cd backend
npm install
```

Create a `.env` file in the `backend` directory (you can copy the `.env.example` file):
```bash
cp .env.example .env
```

Open the `.env` file and add your Gemini API key:
```env
GEMINI_API_KEY=your-gemini-api-key-here
PORT=3001
```

Start the backend development server:
```bash
npm run dev
```
The backend server will run on `http://localhost:3001`.

### 3. Frontend Setup
Open a new terminal tab, navigate to the `frontend` directory and install the dependencies:
```bash
cd frontend
npm install
```

Start the frontend development server:
```bash
npm run dev
```
The frontend application will be available at the URL provided by Vite (usually `http://localhost:5173`).

## 🎮 Usage

1. Open the frontend URL in your browser.
2. Select or enter a topic for your trivia quiz.
3. The backend will communicate with the Gemini API to generate the quiz.
4. Enjoy playing!

## 📜 License

This project is licensed under the MIT License.
