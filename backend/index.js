import express from "express"
import dotenv from "dotenv"
import aiRouter from "./src/routes/ai.route.js"
import cors from "cors"

// Load environment variables from the .env file
dotenv.config()

// express app
const app = express()

// middleware to parse JSON bodies
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(
    cors({
        origin: "http://localhost:5173",
        credentials: true,
    })
)

// port
const port = process.env.PORT || 3000

// starting server
app.listen(port, () => {
    console.log(`Server running on port ${port}`)
});

// routes
app.use("/ai", aiRouter)