const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config();

const app = express();
app.use(
  cors({
    credentials: true,
    origin: ["http://localhost:5173"],
  })
);

app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
  res.json({ message: "welcome to app" });
});
const authRouter = require("./routes/AuthRoutes.js");
const userRouter = require("./routes/user/UserRoutes.js");
const dashboardRouter = require("./routes/dashboard/DashboardRoutes.js");
app.use(authRouter);
app.use(userRouter);
app.use(dashboardRouter);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
