const mongoose = require("mongoose");
const connect = mongoose.connect("mongodb+srv://Raiymbek:raim17.06.05@raiymbek.nmbz68h.mongodb.net/NewDB?retryWrites=true&w=majority",{dbName:'Registration'})


connect.then(() => {
    console.log("Database connected Successfully");
})
.catch(() => {
    console.log("Database cannot be connected");
});



// const collection = new mongoose.model("login", LoginSchema);

// module.exports = collection;