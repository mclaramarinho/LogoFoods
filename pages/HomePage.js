import Carousel from "../components/Carousel.js";
import Navbar from "../components/Navbar.js";
import Section from "../components/Section.js";
import SectionHeader from "../components/SectionHeader.js";
import { products } from "../data/products.js";
import { categories } from "../data/categories.js";
import Footer from "../components/Footer.js";
import { footerData } from "../data/footerData.js";



export default class HomePage{

    
    // START SECTION
    headerSection = new Section([], true);


    // SECTION 1
    superDescontosHeader = new SectionHeader("SUPER DESCONTOS").getHtmlElement();
    superDescontosCarousel = new Carousel(products, ["mb-5"], false, false);
    superDescontosSection = new Section([this.superDescontosHeader, this.superDescontosCarousel.container]);

    // SECTION 2
    emAltaHeader = new SectionHeader("EM ALTA").getHtmlElement();
    emAltaSection = new Section([this.emAltaHeader]);
    emAltaCarousel = new Carousel(products, ["mb-5"], false, true);

    // SECTION 3
    categoriesHeader = new SectionHeader("Pesquisar por categoria").getHtmlElement();
    categoriesSection = new Section([this.categoriesHeader]);
    categoriesCarousel = new Carousel(categories, ["mb-5"], true);
}
// FOOTER
// new Footer(footerData);