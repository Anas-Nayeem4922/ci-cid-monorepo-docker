import { client } from "@repo/db/client";

Bun.serve({
    port: 3002,
    fetch(req, server) {
        // upgrade the request to a WebSocket
        if (server.upgrade(req)) {
            return; // do not return a Response
        }
        return new Response("Upgrade failed", { status: 500 });
    },
    websocket: {
        async message(ws, message) {
            await client.user.create({
                data: {
                    email: Math.random().toString(),
                    password: Math.random().toString(),
                },
            });
            ws.send(message);
        },
    },
});
