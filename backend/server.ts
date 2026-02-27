import express, { type Request, type Response } from "express";
import cors from "cors";
import dotenv from "dotenv";

// Load DB Connections
import { mysqlPool } from "./src/db/mysql";
import { connectMongo } from "./src/db/mongo";
import { ContactMessage } from "./src/models/mongooseModels";

// Load env variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Initialize MongoDB Connection
connectMongo();

// ==========================================
// LEADERBOARD ENDPOINTS (MySQL)
// ==========================================

// Get Top 3 Summary
app.get("/api/leaderboard-summary", async (req: Request, res: Response): Promise<any> => {
    try {
        const [rows] = await mysqlPool.query(
            "SELECT player, score FROM leaderboard ORDER BY score DESC LIMIT 3"
        );
        return res.json(rows);
    } catch (error) {
        console.error("Error fetching leaderboard summary:", error);
        return res.status(500).json({ error: "Failed to fetch leaderboard summary" });
    }
});

// Get Full Leaderboard
app.get("/api/leaderboard", async (req: Request, res: Response): Promise<any> => {
    try {
        const [rows] = await mysqlPool.query(`
            SELECT 
                player, 
                score, 
                note 
            FROM leaderboard 
            ORDER BY score DESC
        `);

        // Map rank manually for the frontend expectation
        const formattedData = (rows as any[]).map((row, index) => ({
            rank: index + 1,
            player: row.player,
            score: row.score,
            note: row.note
        }));

        return res.json(formattedData);
    } catch (error) {
        console.error("Error fetching leaderboard:", error);
        return res.status(500).json({ error: "Failed to fetch leaderboard" });
    }
});

// ==========================================
// CONTACT ENDPOINT (MongoDB)
// ==========================================
app.post("/api/contact", async (req: Request, res: Response): Promise<any> => {
    try {
        const { name, email, message } = req.body;

        if (!name || !email || !message) {
            return res.status(400).json({ ok: false, error: "Missing required fields" });
        }

        const newContact = new ContactMessage({
            name,
            email,
            message
        });

        await newContact.save();

        console.log("Contact message saved to MongoDB:", newContact._id);
        return res.json({ ok: true, message: "Contact message sent successfully" });

    } catch (error) {
        console.error("Contact Error:", error);
        return res.status(500).json({ ok: false, error: "Internal server error" });
    }
});

app.listen(PORT, () => {
    console.log(`Backend server is running at http://localhost:${PORT}`);
});
