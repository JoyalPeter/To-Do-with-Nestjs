import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, createContext } from "react";
import Additem from "./components/additem/AddItem";
import ProtectedRoute from "./service/Authentication/Authentication";
import SigninForm from "./pages/SignIn/SigninForm";
import NotFound from "./pages/NotFound/NotFound";
import SignUp from "./pages/SignUp/SignUp";

export const UserContext = createContext();

function App() {
  const [items, setItems] = useState([]);

  return (
    <div className="App">
      <BrowserRouter>
        <UserContext.Provider value={{ items , setItems }}>
          <Routes>
            <Route path="/" element={<SigninForm />} />
            <Route path="/signup" element={<SignUp />} />
            <Route
              path="/AddItem/:User/:id"
              element={
                <ProtectedRoute>
                  <Additem />
                </ProtectedRoute>
              }
            />
            <Route path="/*" element={<NotFound />} />
          </Routes>
        </UserContext.Provider>
      </BrowserRouter>
    </div>
  );
}

export default App;
