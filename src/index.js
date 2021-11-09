const express = require("express");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 8000;
const path = require("path");
// Rutas
const jobsRoutes = require("./routes/jobs.routes");
const sessionsRoutes = require("./routes/sessions.routes");
const daysRoutes = require("./routes/days.routes");
const usersRoutes = require("./routes/users.routes");
const authRoutes = require("./routes/auth.routes");

//Middlewares
require("dotenv").config();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded());
app.use(express.static(path.join(__dirname, "../reservas-ui/build")));

//Database
require("./database");

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../reservas-ui/build", "index.html"));
});

//use routes
app.use("/api/jobs", jobsRoutes);
app.use("/api/sessions", sessionsRoutes);
app.use("/api/days", daysRoutes);
app.use("/api/users", usersRoutes);
app.use("/api/auth", authRoutes);

app.listen(port, () => {
  console.log("Server running at port " + port);
});
