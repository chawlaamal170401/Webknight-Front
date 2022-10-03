
import "bootstrap/dist/css/bootstrap.min.css"
import "./App.css"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Auth from "./components/Auth";
import Dashboard from "./components/Dashboard"
import Form from "./components/Form"
import Preview from "./components/Preview"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Auth />} />
      </Routes>
      <Routes>
        <Route path="/" element={<Dashboard />} />
      </Routes>
      <Routes>
        <Route path="/form/:id" element={<Form />} />
      </Routes>
      <Routes>
        <Route path="/certi/:id" element={<Preview />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App