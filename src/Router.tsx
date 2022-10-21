import { BrowserRouter, Routes, Route } from "react-router-dom";
import Footer from "./layout/Footer";
import Header from "./layout/Header";
import Home from "./routes/Home";
import MyList from "./routes/MyList";
import Search from "./routes/Search";
import Tv from "./routes/Tv";

function Router() {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movie/:id" element={<Home />} />
        <Route path="/tv" element={<Tv />} />
        <Route path="/tv/:id" element={<Tv />} />
        <Route path="/search/" element={<Search />} />
        <Route path="/search/movie/:id" element={<Search />} />
        <Route path="/search/tv/:id" element={<Search />} />
        <Route path="/myList" element={<MyList />} />
        <Route path="/myList/movie/:id" element={<MyList />} />
        <Route path="/myList/tv/:id" element={<MyList />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default Router;
