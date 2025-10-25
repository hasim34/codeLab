import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/login/Login";
import Register from "./components/register/Register";
import Layout from "./layouts/Layout";
import Dashboard from "./components/dashboard/Dashboard";
import Experiments from "./components/experiment/Experiments";
import CodeEditor from "./components/codeEditor/CodeEditor";
import Profile from "./components/profile/Profile";
import ForgotPassword from "./components/forgot/ForgotPassword"; // New combined component

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login/>} />
        <Route path="/forgot-password" element={<ForgotPassword />} /> {/* Single route for all steps */}
        <Route path="/register" element={<Register/>} />
        
        <Route path="/dashboard" element={<Layout/>}>
          <Route index element={<Dashboard/>}/>
          <Route path="subject/:id" element={<Experiments/>}/>
          <Route path="subject/:id/editor/:experimentId" element={<CodeEditor/>}/>
          <Route path="profile" element={<Profile/>}/>       
        </Route>
      </Routes>
    </Router>
  );
}

export default App;