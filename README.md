
# 🎵 RythmLab — Spotify Music Visualizer

Our Spotify visualizer allows users to find their music in new ways in order to grow their musical taste! This app integrates with the Spotify API, uses Vue 3 and PrimeVue for a rich interface, and displays visual data using D3.js.

---

## Features

- Visualizes top Spotify genres and tracks
- Interactive D3.js data plots
- Persistent state management with Pinia
- Dark mode toggle
- Firebase backend integration (optional features)

---

## Tech Stack

- [Vue 3](https://vuejs.org/)
- [PrimeVue](https://www.primefaces.org/primevue/)
- [Tailwind CSS](https://tailwindcss.com/)
- [D3.js](https://d3js.org/)
- [Pinia](https://pinia.vuejs.org/)
- [Vite](https://vitejs.dev/)
- [Spotify Web API](https://developer.spotify.com/documentation/web-api/)
- [Firebase](https://firebase.google.com/) *(Optional)*

---

## Prerequisites

Ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v16 or higher recommended)
- [npm](https://www.npmjs.com/) or [pnpm](https://pnpm.io/)
- A Spotify Developer account and app (to get `client_id`)
- [Vite](https://vitejs.dev/) (optional if using npm scripts)

---

## Project Setup

```bash
# 1. Clone the repository
git clone https://github.com/your-username/FranciscoVue.git
cd FranciscoVue

# 2. Install dependencies
npm install

# 3. Create a `.env` file and add your Spotify API credentials
# Example:
VITE_SPOTIFY_CLIENT_ID=your_client_id
VITE_REDIRECT_URI=http://localhost:5173/
```

---

## Run the Development Server

```bash
npm run dev
```

App will be available at [http://localhost:5173](http://localhost:5173)

---

## 📁 Directory Structure

```
FranciscoVue/
├── public/              # Static assets
├── src/                 # Vue components, views, stores, logic
│   ├── assets/          
│   ├── components/      
│   ├── views/           
│   ├── store/           # Pinia stores
│   └── main.js          
├── package.json         
├── tailwind.config.js   
├── vite.config.mjs      
└── README.md            
```

---

## 🧪 Notes

- Make sure to enable [Spotify Implicit Grant Flow](https://developer.spotify.com/documentation/general/guides/authorization-guide/#implicit-grant-flow) for authentication.
- Firebase functionality is optional and not required to run the project.

---

## 📬 Feedback

This is a student-built project. All suggestions and improvements are welcome!

---

Would you like this saved as a new `README.md` file and zipped?
