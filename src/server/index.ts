import express from "express";
import { Server } from "./core/Server";
import { TodoController } from "./core/controllers/TodoController";

const PORT = process.env["PORT"] || 3000;
const app = express();
const server = new Server(app);
server.addController(new TodoController());
server.start(Number(PORT));
