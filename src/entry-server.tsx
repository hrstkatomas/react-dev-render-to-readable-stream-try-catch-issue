import {renderToReadableStream} from "react-dom/server";
import React from "react";
import {App} from "./App.tsx";

export default async function() {
    return renderToReadableStream(<App />);
}