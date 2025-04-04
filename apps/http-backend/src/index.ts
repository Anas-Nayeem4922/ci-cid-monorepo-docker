import express from "express";

const app = express();
const port = 3001;

import { client } from "@repo/db/client";

app.use(express.json());

app.post("/users", async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await client.user.create({
            data: { email, password },
        });
        res.json(user);
    } catch {
        res.status(400).json({ error: "Error creating user" });
    }
});

app.get("/users", async (req, res) => {
    const users = await client.user.findMany();
    res.json(users);
});

app.post("/todos", async (req, res) => {
    const { task } = req.body;
    const firstUser = await client.user.findFirst();
    if (!firstUser) {
        res.json({
            msg: "No user found",
        });
        return;
    }
    const todo = await client.todo.create({
        data: {
            task,
            userId: firstUser?.id,
        },
    });
    res.json({
        msg: "Todo created",
        todoId: todo.id,
    });
});

app.listen(port, () => {
    console.log(`App is listening on port ${port}`);
});
