"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const PORT = 3000;
// Middleware: Read JSON request bodies
app.use(express_1.default.json());
// Initial user data
const users = [
    {
        id: 1,
        first_name: "Sachin",
        last_name: "Chavan",
        email: "sachin@example.com",
        gender: "Male",
        ip_address: "192.168.1.10"
    },
    {
        id: 2,
        first_name: "Rahul",
        last_name: "Patil",
        email: "rahul@example.com",
        gender: "Male",
        ip_address: "192.168.1.11"
    }
];
// Home route
app.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        message: "TypeScript User CRUD API is running!"
    });
});
// 1. GET: Fetch all users
app.get("/api/users", (req, res) => {
    res.status(200).json({
        success: true,
        body: users,
        message: "Users fetched successfully"
    });
});
// 2. GET: Fetch a single user by ID
app.get("/api/users/:id", (req, res) => {
    const userId = Number(req.params.id);
    if (!Number.isInteger(userId) || userId < 1) {
        return res.status(400).json({
            success: false,
            message: "Invalid user ID"
        });
    }
    const user = users.find((u) => u.id === userId);
    if (!user) {
        return res.status(404).json({
            success: false,
            message: "User not found"
        });
    }
    return res.status(200).json({
        success: true,
        body: user,
        message: "User fetched successfully"
    });
});
// 3. POST: Create a new user
app.post("/api/users", (req, res) => {
    const body = req.body;
    const { first_name, last_name, email, gender, ip_address } = body;
    if (typeof first_name !== "string" || !first_name.trim() ||
        typeof last_name !== "string" || !last_name.trim() ||
        typeof email !== "string" || !email.trim()) {
        return res.status(400).json({
            success: false,
            message: "First name, last name, and email are required"
        });
    }
    const nextId = Math.max(0, ...users.map((user) => user.id)) + 1;
    const newUser = {
        id: nextId,
        first_name: first_name.trim(),
        last_name: last_name.trim(),
        email: email.trim(),
        gender: typeof gender === "string" ? gender : "",
        ip_address: typeof ip_address === "string" ? ip_address : ""
    };
    users.push(newUser);
    return res.status(201).json({
        success: true,
        body: newUser,
        message: "User created successfully"
    });
});
// 4. PUT: Update an existing user
app.put("/api/users/:id", (req, res) => {
    const userId = Number(req.params.id);
    if (!Number.isInteger(userId) || userId < 1) {
        return res.status(400).json({
            success: false,
            message: "Invalid user ID"
        });
    }
    const index = users.findIndex((user) => user.id === userId);
    if (index === -1) {
        return res.status(404).json({
            success: false,
            message: "User not found"
        });
    }
    const body = req.body;
    const { first_name, last_name, email, gender, ip_address } = body;
    if (typeof first_name !== "string" || !first_name.trim() ||
        typeof last_name !== "string" || !last_name.trim() ||
        typeof email !== "string" || !email.trim()) {
        return res.status(400).json({
            success: false,
            message: "First name, last name, and email are required"
        });
    }
    const updatedUser = {
        id: userId,
        first_name: first_name.trim(),
        last_name: last_name.trim(),
        email: email.trim(),
        gender: typeof gender === "string" ? gender : "",
        ip_address: typeof ip_address === "string" ? ip_address : ""
    };
    users[index] = updatedUser;
    return res.status(200).json({
        success: true,
        body: updatedUser,
        message: "User updated successfully"
    });
});
// 5. DELETE: Delete a user
app.delete("/api/users/:id", (req, res) => {
    const userId = Number(req.params.id);
    if (!Number.isInteger(userId) || userId < 1) {
        return res.status(400).json({
            success: false,
            message: "Invalid user ID"
        });
    }
    const index = users.findIndex((user) => user.id === userId);
    if (index === -1) {
        return res.status(404).json({
            success: false,
            message: "User not found"
        });
    }
    const deletedUser = users.splice(index, 1)[0];
    return res.status(200).json({
        success: true,
        body: deletedUser,
        message: "User deleted successfully"
    });
});
// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
