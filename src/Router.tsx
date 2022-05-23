import { BrowserRouter, Routes, Route } from "react-router-dom";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Home from "./routes/Home";
// import Movie from "./routes/Movie";
import Search from "./routes/Search";
import Tv from "./routes/Tv";

function Router() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/tv-shows" element={<Tv />} />
        <Route path="/search" element={<Search />} />
        <Route path="/movies/:id" element={<Home />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default Router;
