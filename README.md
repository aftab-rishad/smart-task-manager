# Smart Task Manager with AI Assistance

A modern task management application built with Next.js 15+ and TypeScript, featuring AI-powered subtask suggestions using Google Gemini API.

## 🚀 Features

- **Task Management**: Create, edit, delete, and manage tasks with ease
- **AI-Powered Subtasks**: Generate intelligent subtask suggestions using Google Gemini API
- **Task Fields**: Title, description, status (pending/completed), and due date
- **Responsive Design**: Optimized for both mobile and desktop devices
- **Clean UI**: Simple and intuitive user interface

## 🛠️ Technologies Used

- **Frontend**: Next.js 15+ with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS and ShadCN
- **AI Integration**: Google Gemini API
- **API Routes**: Next.js API routes for secure backend integration

## 📋 Prerequisites

Before running this project, make sure you have:

- Node.js 18+ installed
- npm, yarn, pnpm, or bun package manager
- Google Gemini API key

## ⚙️ Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/aftab-rishad/smart-task-manager.git
cd smart-task-manager
```

### 2. Install Dependencies

```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

### 3. Environment Variables Setup

1. Copy the example environment file:
```bash
cp .env.example .env.local
```

2. Get your Google Gemini API key:
   - Visit [Google AI Studio](https://aistudio.google.com/app/apikey)
   - Create a new API key
   - Copy the key

3. Add your API key to `.env.local`:
```env
NEXT_PUBLIC_APP_URL="http://localhost:3000"
AI_API_KEY=your_gemini_api_key_here
```

### 4. Run the Development Server

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the application.

## 🎯 How It Works

1. **Create Tasks**: Add new tasks with title, description, and due date
2. **Manage Status**: Toggle tasks between pending and completed
3. **AI Suggestions**: Click "Suggest Subtasks" to get AI-generated actionable steps
4. **Edit & Delete**: Modify or remove tasks as needed

### Example AI Suggestions

**Task**: "Plan birthday party"
**AI Suggestions**:
- Determine guest list and send invitations.
- Decide on party theme, location, and menu.
- Plan party activities and entertainment.
- Arrange for decorations and supplies.
- Confirm RSVPs and finalize details.

## 👨‍💻 Author

**Aftab Rishad**
- GitHub: [@aftab-rishad](https://github.com/aftab-rishad)

---

**Note**: This project was developed as part of a technical assessment for PassLimits. The focus was on creating a functional, well-structured application with clean code and proper error handling.
