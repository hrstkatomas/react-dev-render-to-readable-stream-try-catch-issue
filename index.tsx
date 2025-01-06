import { Hono } from "hono";
import { stream } from "hono/streaming";
import React from "react";
import { renderToReadableStream } from "react-dom/server";
import { App } from "./src/App.tsx";

const app = new Hono();
app.get("*", async (c) => {
	try {
		const appStream = await renderToReadableStream(<App />, {
			onError(error) {
				console.error(error);
				// logServerCrashReport(error);
			},
		});
		return stream(c, async (stream) => {
			stream.onAbort(() => console.log("Aborted!"));
			await stream.pipe(appStream);
		});
	} catch (error) {
		console.log(error);
		c.status(500);
		return c.html("<h1>Something went wrong</h1>");
	}
});

Bun.serve({
	fetch: app.fetch,
	port: 3000,
});

console.log("Server started go to http://localhost:3000");
