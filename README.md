# Note-Taking App

A full-featured note-taking application built with the MERN stack (MongoDB, Express.js, React.js, Node.js) and integrated with Clerk for authentication. This app allows users to create, edit, and share notes with others.

# Authors

Yasser Assou
Youssef Amazzal
Abdennacer Kaddouri

## Features

- **User Authentication**: Secure authentication using Clerk.
- **Create and Edit Notes**: Easily create and edit your notes.
- **Share Notes**: Share notes with other users via email.
- **View Shared Notes**: See notes that have been shared with you.
- **Responsive Design**: Optimized for all devices with a responsive UI.
- **Protected Routes**: Secure pages and content for authenticated users only.

## Demo

You can view a live demo of the app [here](#).  
(*Note: Replace `#` with the actual link if available*)

## Installation

Follow these steps to get the project up and running on your local machine:

1. **Clone the Repository**:

   ```bash
   git clone https://github.com/your-username/note-taking-app.git
   cd note-taking-app
   ```

2. **Install Backend Dependencies**:

   ```bash
   cd server
   npm install
   ```

3. **Install Frontend Dependencies**:

   ```bash
   cd ../client
   npm install
   ```

4. **Set Up Environment Variables**:

   Create a `.env` file in the `server` directory with the following content:

   ```env
   MONGO_URI=your_mongodb_connection_string
   CLERK_API_KEY=your_clerk_api_key
   JWT_SECRET=your_jwt_secret
   ```

   Replace the placeholders with your actual configuration values.

5. **Run the Development Server**:

   In the `server` directory, start the backend server:

   ```bash
   npm run dev
   ```

   In the `client` directory, start the frontend server:

   ```bash
   npm run dev
   ```

6. **Open Your Browser**:

   Visit `http://localhost:3000` to see the app in action.

## Usage

1. **Sign Up or Log In**: Users need to authenticate using Clerk.
2. **Create Notes**: After logging in, create new notes from the dashboard.
3. **Edit Notes**: Update your notes directly in the app.
4. **Share Notes**: Share notes with others by adding their email.
5. **View Shared Notes**: Check the "Shared with Me" section to view notes shared by others.

## Environment Variables

- `MONGO_URI`: MongoDB connection string for the database.
- `CLERK_API_KEY`: API key for Clerk authentication.
- `JWT_SECRET`: Secret key for JWT token generation.

## Folder Structure

The repository has the following structure:

```plaintext
note-taking-app/
├── client/           # React frontend
│   ├── public/       # Static files
│   └── src/          # Source code
├── server/           # Express backend
│   ├── controllers/  # Controller logic
│   ├── models/       # Mongoose models
│   ├── routes/       # API routes
│   └── utils/        # Utility functions
└── README.md         # Project readme
```
