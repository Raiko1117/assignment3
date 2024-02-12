const express = require("express");
const app = express();
const bcrypt = require("bcrypt");
const https = require("https");
const router = require("./routers/weather-router");
const User = require("./models/user");
const mongoose = require("mongoose");

const saltRounds = 10;

mongoose
  .connect(
    "mongodb+srv://Raiymbek:raim17.06.05@raiymbek.nmbz68h.mongodb.net/NewDB?retryWrites=true&w=majority",
    { dbName: "Registration" }
  )
  .then(() => {
    console.log("Database connected Successfully");
  })
  .catch(() => {
    console.log("Database cannot be connected");
  });

app.use(express.json());

app.use(express.urlencoded({ extended: false }));

app.set("view engine", "ejs");

app.use(express.static("public/views"));

app.get("/login", (req, res) => {
  res.render("login", { error: null });
});

app.get("/signup", (req, res) => {
  res.render("signup");
});

app.post("/signup", (req, res) => {
  const { username, email, password } = req.body;

  User.create({
    name: username,
    password: bcrypt.hashSync(password, saltRounds),
    email: email,
    role: "admin",
  });
  res.redirect(`/weather?email=${email}&role=user`);
});

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (user === null) {
      res.render("login", { error: "Invalid credentials" });
    }
    if (bcrypt.compareSync(password, user.password)) {
      res.redirect(`/weather?email=${email}&role=${user.role}`);
    } else {
      res.render("login", { error: "Invalid password" });
    }
  } catch (error) {
    console.error("Error finding user:", error);
    res.status(500).json({ message: "An error occurred" });
  }
});

app.use("/weather", router);

app.get("/admin-pannel", async (req, res) => {
  const isAdmin = true;

  if (isAdmin) {
    try {
      const users = await User.find();
      console.log(users);
      res.render("admin-pannel", { users });
    } catch (error) {
      console.error("Error fetching users:", error);
      res.status(500).send("Error fetching users.");
    }
  } else {
    res.send("You do not have permission to access this page.");
  }
});

app.post("/admin-pannel/add-user", async (req, res) => {
  try {
    const { name, password } = req.body;
    const existingUser = await User.findOne({ name });
    if (existingUser) {
      res.send("User already exists. Please choose another username");
    } else {
      const saltRounds = 7;
      const hashedPassword = await bcrypt.hash(password, saltRounds);

      const newUser = await User.create({
        name,
        password: hashedPassword,
      });
      res.send("User added successfully.");
    }
  } catch (error) {
    res.status(500).send("Error adding user.");
  }
});

app.post("/admin-panel/edit-user/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;
    const { username } = req.body;

    await User.findByIdAndUpdate(userId, { name: username });

    res.send("User updated successfully.");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error updating user.");
  }
});

app.delete("/admin-panel/delete-user/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;
    const deletedUser = await User.findByIdAndDelete(userId);
    if (deletedUser) {
      res.send("User deleted successfully.");
    } else {
      res.status(404).send("User not found.");
    }
  } catch (error) {
    res.status(500).send("Error deleting user.");
  }
});

const port = process.env.PORT || 3000;
app.listen(port, async () => {
  console.log('Server running on Port: ${port}');
});