import {Hono} from "hono";
import { stream } from "hono/streaming";
import getAppStream from "./src/entry-server.tsx";

const app = new Hono();
app.get("*", async (c) => {
    return stream(c, async (stream) => {
        stream.onAbort(() => console.log("Aborted!"));
        await stream.pipe(await getAppStream());
    });
})

Bun.serve({
    fetch: app.fetch,
    port: 3000,
});

console.log("Server started go to http://localhost:3000");
