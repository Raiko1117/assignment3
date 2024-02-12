// const express = require("express");
// const pasth = require("path");
// const bcrypt = require("bcrypt");
// const collection = require("./config");
// const e = require("express");
// const app = express();
// const https = require("https");

// app.use(express.json());

// app.use(express.urlencoded({ extended: false }));

// app.set("view engine", "ejs");

// app.use(express.static("public/views"));

// app.get("/", (req, res) => {
//   res.render("login");
// });

// app.get("/signup", (req, res) => {
//   res.render("signup");
// });

// app.get("/admin-pannel", async (req, res) => {
//   const isAdmin = true;

//   if (isAdmin) {
//     try {
//       const users = await collection.find();

//       res.render("admin-pannel", { users });
//     } catch (error) {
//       console.error("Error fetching users:", error);
//       res.status(500).send("Error fetching users.");
//     }
//   } else {
//     res.send("You do not have permission to access this page.");
//   }
// });

// app.post("/admin-pannel/add-user", async (req, res) => {
//   try {
//     const { name, password } = req.body;
//     const existingUser = await collection.findOne({ name });
//     if (existingUser) {
//       res.send("User already exists. Please choose another username");
//     } else {
//       const saltRounds = 7;
//       const hashedPassword = await bcrypt.hash(password, saltRounds);

//       const newUser = await collection.create({
//         name,
//         password: hashedPassword,
//       });
//       res.send("User added successfully.");
//     }
//   } catch (error) {
//     res.status(500).send("Error adding user.");
//   }
// });

// app.post("/admin-panel/edit-user/:userId", async (req, res) => {
//   try {
//     const userId = req.params.userId;
//     const { name, password } = req.body;

//     // Хэшируем новый пароль, если он был введен
//     let hashedPassword = password; // По умолчанию, если пароль не был изменен

//     if (password) {
//       const saltRounds = 10;
//       hashedPassword = await bcrypt.hash(password, saltRounds);
//     }

//     // Обновляем данные пользователя в базе данных
//     const updatedUser = await collection.findByIdAndUpdate(userId, {
//       name,
//       password: hashedPassword,
//     });
//     res.send("User updated successfully.");
//   } catch (error) {
//     res.status(500).send("Error updating user.");
//   }
// });

// app.delete("/admin-panel/delete-user/:userId", async (req, res) => {
//   try {
//     const userId = req.params.userId;
//     // Найдите пользователя по ID и удалите его из базы данных
//     const deletedUser = await collection.findByIdAndDelete(userId);
//     if (deletedUser) {
//       res.send("User deleted successfully.");
//     } else {
//       res.status(404).send("User not found.");
//     }
//   } catch (error) {
//     res.status(500).send("Error deleting user.");
//   }
// });

// app.post("/signup", async (req, res) => {
//   const data = {
//     name: req.body.username,
//     password: req.body.password,
//   };

//   //check if the user already exists in the database
//   const existingUser = await collection.findOne({ name: data.name });
//   if (existingUser) {
//     res.send("User already exists.Please choose a another username.");
//   } else {
//     //hash the password using bcrypt
//     const saltRounds = 10;
//     const hashedPassword = await bcrypt.hash(data.password, saltRounds);
//     data.password = hashedPassword;

//     const userdata = await collection.insertMany(data);
//     console.log(userdata);
//   }
// });

// //login
// app.post("/login", async (req, res) => {
//   try {
//     const check = await collection.findOne({ name: req.body.username });
//     if (!check) {
//       res.send("user name cannot found");
//     }

//     const isPasswordMatch = await bcrypt.compare(
//       req.body.password,
//       check.password
//     );
//     if (isPasswordMatch) {
//       res.render("home");
//     } else {
//       req.send("wrong password");
//     }
//   } catch {
//     res.send("wrong details");
//   }
// });

// // API about Countries

// const port = 3001;
// app.listen(port, () => {
//   console.log(`Server running on Port: ${port}`);
// });
