
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const cookieParser=require("cookie-parser");

dotenv.config();

const app = express();
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
}));
app.use(express.json());
app.use(cookieParser());


const subjectRoutes = require("./routes/subjectRoutes");
const authRoutes = require("./routes/authRoutes");
const problemRoutes = require("./routes/problemRoutes");
const executionRoutesRoutes = require("./routes/executionRoutes");
// const userRoutes = require("./routes/userRoutes");

app.use("/api/subjects",subjectRoutes);
 app.use("/api/auth", authRoutes);
app.use("/api/problems", problemRoutes);
app.use("/api/execution", executionRoutesRoutes);
// app.use("/api/users", userRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
