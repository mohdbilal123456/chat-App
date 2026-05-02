// import express from 'express'
// import dotenv from 'dotenv'
// import connectDB from './src/config/db.js'
// import userRoutes from './src/routes/userRoutes.js'
// import questionRoutes from './src/routes/questionRoutes.js'
// import cors from 'cors'
// dotenv.config()

// // Connect Database
// connectDB()

// const app = express()

// /* ---------------- CORS ---------------- */
// const normalize = (url) => url?.trim().replace(/\/$/, "");
// const allowedOrigins = [
//   "http://localhost:5173",
//   "https://chat-app-yod0.onrender.com"
// ]
//   .map(normalize)
//   .filter(Boolean);

// const corsOptions = {
//   origin: (origin, callback) => {
//     if (!origin) return callback(null, true);

//     if (allowedOrigins.includes(origin)) {
//       return callback(null, true);
//     }

//     return callback(new Error(`CORS origin not allowed: ${origin}`));
//   },
//   credentials: true,
// };

// app.use(cors(corsOptions));
// // Middleware
// app.use(express.json())

// // Routes
// app.use('/api/users', userRoutes)
// app.use('/api/questions', questionRoutes)
// // Server
// const PORT = process.env.PORT || 5000
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./src/config/db.js";
import userRoutes from "./src/routes/userRoutes.js";
import questionRoutes from "./src/routes/questionRoutes.js";
import path from "path";
dotenv.config();

const app = express();

/* ---------------- CORS ---------------- */

// normalize helper
const normalize = (url) => url?.trim().replace(/\/$/, "");

// allowed origins
const allowedOrigins = [
  "http://localhost:5173",
  "https://chat-app-yod0.onrender.com",
].map(normalize);

// CORS config
app.use(
  cors({
    origin: (origin, callback) => {
      // allow server-to-server / postman
      if (!origin) return callback(null, true);

      const normalizedOrigin = normalize(origin);

      const isAllowed = allowedOrigins.some((o) =>
        normalizedOrigin.startsWith(o)
      );

      if (isAllowed) {
        return callback(null, true);
      }

      console.log("❌ Blocked by CORS:", origin);
      return callback(new Error(`CORS not allowed: ${origin}`));
    },
    credentials: true,
  })
);
/* ---------------- Middleware ---------------- */
app.use(express.json());

/* ---------------- Routes ---------------- */
app.use("/api/users", userRoutes);
app.use("/api/questions", questionRoutes);
app.use(express.static("dist"));

// app.get("*", (req, res) => {
//   res.sendFile(path.resolve("dist", "index.html"));
// });
/* ---------------- Server Start ---------------- */

const PORT = process.env.PORT || 5000;

// IMPORTANT: DB connect hone ke baad hi server start
connectDB()
  .then(() => {
    console.log("✅ MongoDB Connected");

    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  })  
  .catch((err) => {
    console.error("❌ DB Connection Failed:", err.message);
  });
