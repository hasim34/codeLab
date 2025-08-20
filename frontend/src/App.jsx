import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/login/Login";
import Register from "./components/register/Register";
import Layout from "./layouts/Layout";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={Login} />
        <Route path="/register" element={Register} />

        <Route path="/dashboard" element={Layout}>
          <Route index element/>        
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
