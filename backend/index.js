const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// const authRoutes = require("./routes/authRoutes");
// const problemRoutes = require("./routes/problemRoutes");
// const subjectRoutes = require("./routes/subjectRoutes");
// const submissionRoutes = require("./routes/submissionRoutes");
// const userRoutes = require("./routes/userRoutes");

// app.use("/api/auth", authRoutes);
// app.use("/api/problems", problemRoutes);
// app.use("/api/subjects", subjectRoutes);
// app.use("/api/submissions", submissionRoutes);
// app.use("/api/users", userRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
