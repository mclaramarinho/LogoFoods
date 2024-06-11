import Footer from "./components/Footer.js";
import Navbar from "./components/Navbar.js";
import SearchFilter from "./components/SearchFilter.js";
import { footerData } from "./data/footerData.js";
import CatalogPage from "./pages/CatalogPage.js";
import DetailsPage from "./pages/DetailsPage.js";
import "./pages/HomePage.js";
import HomePage from "./pages/HomePage.js";
import { User, users } from "./data/users.js";
import Cart from "./localstorage/cart.js"
import Router from "./router.js";


export const cart = new Cart();

new Navbar();

new Router();

new Footer(footerData);
