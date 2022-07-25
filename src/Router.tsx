import { BrowserRouter, Routes, Route } from "react-router-dom";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Home from "./routes/Home";
import Search from "./routes/Search";
import Tv from "./routes/Tv";

function Router() {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/tv" element={<Tv />} />
        <Route path="/search" element={<Search />} />
        <Route path="/movie/:id" element={<Home />} />
        <Route path="/tv/:id" element={<Tv />} />
        <Route path="/search/:id" element={<Search />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default Router;
