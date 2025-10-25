import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/login/Login";
import Register from "./components/register/Register";
import Layout from "./layouts/Layout";
import Dashboard from "./components/dashboard/Dashboard";
import Experiments from "./components/experiment/Experiments";
import CodeEditor from "./components/codeEditor/CodeEditor";
import Profile from "./components/profile/Profile";

import { LoaderProvider } from "./context/LoaderContext";
import "./context/loader.css";

function App() {
  return (
    <LoaderProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route path="/dashboard" element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path="subject/:id" element={<Experiments />} />
            <Route
              path="subject/:id/editor/:experimentId"
              element={<CodeEditor />}
            />
            <Route path="profile" element={<Profile />} />
          </Route>
        </Routes>
      </Router>
    </LoaderProvider>
>>>>>>> 1a8df49f2c292baa0a7a4af443e9d42a2f6f2b69
  );
}

export default App;
