// lib/socket.ts
import { io } from "socket.io-client";

const server = process.env.NEXT_PUBLIC_SERVER_URL!.split("/api")[0];
const socket = io(server); // Your backend URL

export default socket;
