import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { TokenProvider } from './auth/TokenContext';
import Login from "./components/sign-in";
import Home from "./pages/home";
import Add from "./pages/addProfessor";
import All from "./pages/allProfessors";

export default function App() {
  return (
    <TokenProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />}/>
        <Route path="home" element={<Home />} />
        <Route path="add-professor" element={<Add/>} />
        <Route path="all-professors" element={<All/>} />
        {/* </Route> */}
      </Routes>
    </BrowserRouter>
    </TokenProvider>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);