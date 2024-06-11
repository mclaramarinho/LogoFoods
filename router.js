import CartPage from "./pages/CartPage.js";
import CatalogPage from "./pages/CatalogPage.js";
import DetailsPage from "./pages/DetailsPage.js";
import HomePage from "./pages/HomePage.js";

export default class Router{
    constructor(){
        const params = window.location.search;
        if(params.length === 0){
            new HomePage()
        }else if(params.includes("?catalog")){
            new CatalogPage();
        }else if(params.includes("?details")){
            new DetailsPage();
        }else if(params.includes("?notfound")){
            
        }else if(params.includes("?cart")){
            new CartPage();
        }
    }
}