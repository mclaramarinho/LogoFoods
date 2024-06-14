import Footer from "./components/Footer.js";
import Navbar from "./components/Navbar.js";
import { footerData } from "./data/footerData.js";
import "./pages/HomePage.js";
import Cart from "./localstorage/cart.js"
import Router from "./router.js";
import Auth from "./localstorage/auth.js";
import applyMask from "./utils/mask.js";

export const cart = new Cart();
export const auth = new Auth();
// auth.login("clara@email.com", "password")

export const navbar = new Navbar();

new Router();

new Footer(footerData);

applyMask();
