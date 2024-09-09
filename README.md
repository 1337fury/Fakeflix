# Fakeflix

Welcome to the **Fakeflix** project! This application is designed to replicate the functionality of Netflix using the MERN stack. Below, you'll find detailed information about the project, its features, setup instructions, and more.

---

## Table of Contents

- [Fakeflix](#fakeflix)
	- [Table of Contents](#table-of-contents)
	- [Project Overview](#project-overview)
	- [Features](#features)
	- [Tech Stack](#tech-stack)
	- [Setup Instructions](#setup-instructions)
	- [Run the Application](#run-the-application)
	- [Screenshots](#screenshots)
	- [License](#license)

---

## Project Overview

The MERN Netflix Clone is a full-stack application built with:

- **MongoDB** for the database
- **Express.js** as the web framework
- **React.js** for the front end
- **Node.js** for the server-side logic

This project showcases how to build a responsive web application that allows users to browse movies and TV shows, watch trailers, and manage their watch history.

---

## Features

| Feature                         | Description                                      |
|---------------------------------|--------------------------------------------------|
| 🎬 Fetch Movies and TV Shows    | Users can browse a wide selection of movies and TV shows. |
| 🔍 Search for Actors and Movies  | Easily search for your favorite actors and films. |
| 🎥 Watch Trailers               | View trailers for movies and shows before watching. |
| 🔥 Fetch Search History          | Keep track of your search history for easy access. |
| 🐱👤 Get Similar Recommendations  | Discover similar movies and shows based on your preferences. |
| 💙 Awesome Landing Page          | A visually appealing landing page to attract users. |
| 🔐 Authentication with JWT      | Secure user authentication for personalized experiences. |
| 📱 Responsive UI                | A mobile-friendly interface for all devices. |

---

## Tech Stack

- **Frontend:** React.js, Tailwind CSS
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Authentication:** JWT (JSON Web Tokens)
- **API:** TMDB (The Movie Database) API

---

## Setup Instructions

To get started with the MERN Netflix Clone, follow these steps:

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/1337fury/fakeflix.git
   ```

2. **Navigate to the Project Directory:**
   ```bash
   cd fakeflix
   ```

3. **Create a `.env` File:**
   Set up your environment variables:
   ```plaintext
   PORT=5000
   MONGO_URI=your_mongo_uri
   NODE_ENV=development
   JWT_SECRET=your_jwt_secret
   TMDB_API_KEY=your_tmdb_api_key
   ```

---

## Run the Application

To run the application locally, execute the following commands:

1. **Build the Application:**
   ```bash
   npm run build
   ```

2. **Start the Application:**
   ```bash
   npm run start
   ```

---

## Screenshots

Home Page

Search Page

Watch Page

---

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---