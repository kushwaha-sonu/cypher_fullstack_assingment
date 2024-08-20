// App.jsx
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Footer from "./components/Footer";
import SignUp from "./pages/RegisterPage";
import SignIn from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import Navbar from "./components/Navbar";
import ForgotPassword from "./components/ForgerPassword";
import QuizPage from "./pages/QuizPage";
import ResultPage from "./pages/ResultPage.jsx";
import CategoryPage from "./pages/CategoryPage.jsx";
import PrivateRoute from "./pages/PrivateRoute.jsx";
import {useSelector} from "react-redux";
import axios from "axios";

axios.defaults.baseURL = "https://cypher-fullstack-assingment.onrender.com";
axios.defaults.withCredentials = true;

function App() {
  const user = useSelector((state) => state.user.user);

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<HomePage user={user} />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route
          path="/quiz"
          element={
            <PrivateRoute user={user}>
              <QuizPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/result"
          element={
            <PrivateRoute user={user}>
              <ResultPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/categories"
          element={
            <PrivateRoute user={user}>
              <CategoryPage />
            </PrivateRoute>
          }
        />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;