import CartPage from "./pages/CartPage.js";
import CartPayment from "./pages/CartPayment.js";
import CatalogPage from "./pages/CatalogPage.js";
import DetailsPage from "./pages/DetailsPage.js";
import HomePage from "./pages/HomePage.js";
import LoginPage from "./pages/LoginPage.js";
import OrderConfirmationPage from "./pages/OrderConfirmationPage.js";

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
            if(params.includes("step=")){
                const step = parseInt(params.split("step=")[1]);
                if(step === 1){
                    new CartPage();
                }else if(step === 2){
                    new CartPayment();
                }else if(step === 3){
                    new OrderConfirmationPage();
                }
            }else{
                new CartPage();
            }
        }else if(params.includes("?login")){
            let redirectTo = null;
            if(params.includes("redirectTo")){
                const splitParam = params.split("redirectTo=")[1];

                if(splitParam.includes("&")){
                    redirectTo = splitParam.split("&")[0];
                }
            }

            new LoginPage(redirectTo);
        }
    }
}