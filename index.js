import Footer from "./components/Footer.js";
import Navbar from "./components/Navbar.js";
import SearchFilter from "./components/SearchFilter.js";
import { footerData } from "./data/footerData.js";
import CatalogPage from "./pages/CatalogPage.js";
import "./pages/HomePage.js";
import HomePage from "./pages/HomePage.js";


const params = window.location.search;

// path.length === 0 --> home
// ?catalog --> catalog 
// ?catalog=&category --> catalog filtered by categories
// ?catalog=&productName --> catalog filtered by product name
// ?catalog=&category=&productName --> catalog filtered by categories and productName
// 



new Navbar();


if(params.length === 0){
    new HomePage()
}else if(params.includes("catalog")){
    new CatalogPage();
}


new Footer(footerData);
