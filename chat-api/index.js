import express from 'express'
import dotenv from 'dotenv'
import connectDB from './src/config/db.js'
import userRoutes from './src/routes/userRoutes.js'
import questionRoutes from './src/routes/questionRoutes.js'
import cors from 'cors'
dotenv.config()

// Connect Database
connectDB()

const app = express()

/* ---------------- CORS ---------------- */
const normalize = (url) => url?.trim().replace(/\/$/, "");
const allowedOrigins = [
  "http://localhost:5173",
  "https://stirring-bublanina-ca72c9.netlify.app"
]
  .map(normalize)
  .filter(Boolean);

const corsOptions = {
  origin: (origin, callback) => {
    if (!origin) return callback(null, true);

    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }

    return callback(new Error(`CORS origin not allowed: ${origin}`));
  },
  credentials: true,
};

app.use(cors(corsOptions));
// Middleware
app.use(express.json())

// Routes
app.use('/api/users', userRoutes)
app.use('/api/questions', questionRoutes)
// Server
const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))