import express, { type Request, type Response } from "express";
import cors from "cors";

type LeaderboardItem = {
    rank: number;
    player: string;
    score: number;
    note?: string;
};

type ContactPayload = {
    name: string;
    email: string;
    message: string;
};

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.get("/api/ping", (req: Request, res: Response) => {
    res.json({ message: "OK" });
});

app.get("/api/leaderboard-summary", (req: Request, res: Response) => {
    const summaryData = [
        { player: "Spencer", score: 9999 },
        { player: "Rafael", score: -9999 },
        { player: "Yeison", score: -2 },
    ];

    res.json(summaryData);
});

app.get("/api/leaderboard", (req: Request, res: Response) => {
    const data: LeaderboardItem[] = [
        { rank: 1, player: "Spencer", score: 9999, note: "Boss" },
        { rank: 2, player: "Yeison", score: 420, note: "Grinding" },
        { rank: 3, player: "Tobias", score: -2, note: "Unlucky" },
        { rank: 4, player: "Nick", score: 100, note: "New" },
    ];

    res.json(data);
});

app.post("/api/contact", (req: Request, res: Response) => {
    const body = req.body as Partial<ContactPayload>;

    if (!body.name || !body.email || !body.message) {
        return res.status(400).json({ ok: false, error: "Missing fields" });
    }

    console.log("Contact message received:", body);

    return res.json({ ok: true });
});

app.listen(PORT, () => {
    console.log(`Backend server is running at http://localhost:${PORT}`);
});
