import express, { json } from "express";
import dotenv from "dotenv";
import { readDataFromFile, writeDataToFile } from "../utils/utility.js";
import { getAllUsers, createUser, deleteUser, updateUser } from "./CRUD/users.js";
const databasePath = "database.json";
import { nanoid } from "nanoid";

dotenv.config();

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "this is a get request",
  });
});

// get ALL users from database
app.get("/get-all-users", getAllUsers);

// create new user

app.post("/create-user", createUser)

// delete user

app.delete("/delete-user/:id", deleteUser)

// update user 

app.patch("/update-user/:id", updateUser)

app.listen(process.env.PORT, () => console.log("server is working"));
