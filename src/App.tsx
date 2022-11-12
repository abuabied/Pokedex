import { BrowserRouter, Routes, Route } from "react-router-dom";
import {Home} from "./pages/homePage/Home";
import {Details} from "./pages/detailsPages/Details";
import './App.css';
import { Layout } from './pages/layout/Layout';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route
            path="/Details/:pokemon"
            element={
              <Details />
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
