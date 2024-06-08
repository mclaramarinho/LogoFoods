import Carousel from "../components/Carousel.js";
import Navbar from "../components/Navbar.js";
import Section from "../components/Section.js";
import SectionHeader from "../components/SectionHeader.js";
import { products } from "../data/products.js";
import { categories } from "../data/categories.js";
import Footer from "../components/Footer.js";
import { footerData } from "../data/footerData.js";
new Navbar();

// SECTION 1
const superDescontosHeader = new SectionHeader("SUPER DESCONTOS").getHtmlElement();
new Section([superDescontosHeader]);
const carousel = new Carousel(products, ["mb-5"]);

// SECTION 2
const superDescontosHeader2 = new SectionHeader("EM ALTA").getHtmlElement();
new Section([superDescontosHeader2]);
const carousel2 = new Carousel(products, ["mb-5"], false, true);

// SECTION 3
const categoriesHeader = new SectionHeader("Pesquisar por categoria").getHtmlElement();
new Section([categoriesHeader]);
const carousel3 = new Carousel(categories, ["mb-5"], true);

// FOOTER
new Footer(footerData);