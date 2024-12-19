import express from 'express';

const app = express();

import csvRouter from "./routes/csv.routes.js"

app.use("/api/v1/CSV", csvRouter)

export { app }