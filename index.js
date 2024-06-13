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
import Auth from "./localstorage/auth.js";

export const cart = new Cart();
export const auth = new Auth();

// auth.login("clara@email.com", "password")

new Navbar();

new Router();

new Footer(footerData);
