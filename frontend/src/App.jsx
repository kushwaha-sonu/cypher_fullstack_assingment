import { BrowserRouter, Route, Routes } from "react-router-dom";
import Footer from "./components/Footer";
import SignUp from "./pages/RegisterPage";
import SignIn from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import Navbar from "./components/Navbar";
import ForgotPassword from "./components/ForgerPassword";
import QuizPage from "./pages/QuizPage";

function App() {
  return (
    <BrowserRouter>
    <Navbar />
      <Routes>
        <Route exact path="/" element={<HomePage />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/quiz" element={<QuizPage />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
