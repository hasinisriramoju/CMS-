import CreateCourseOptions from "./pages/CreateCourseOptions";
 
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";
import Login from "./Login";
import AddCourseForm from "./AddCourseForm";

export default function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  return (
    <BrowserRouter>
      <Routes>
        {/* LOGIN */}
        <Route
          path="/login"
          element={
            loggedIn ? (
              <Navigate to="/add-course" replace />
            ) : (
              <Login onLogin={() => setLoggedIn(true)} />
            )
          }
        />

        {/* ✅ NEW: OPTIONS PAGE */}
        <Route
          path="/add-course"
          element={
            loggedIn ? (
              <CreateCourseOptions />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

        {/* ✅ NEW: FORM PAGE */}
        <Route
          path="/add-course/form"
          element={
            loggedIn ? <AddCourseForm /> : <Navigate to="/login" replace />
          }
        />

        {/* DEFAULT */}
        <Route
          path="*"
          element={
            <Navigate to={loggedIn ? "/add-course" : "/login"} replace />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
