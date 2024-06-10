import { products } from "./products.js";

export default class FilteredProducts{
    list = products;
    productName = null;
    minPrice = 99999999;
    maxPrice = -20;

    maxPriceSelected = -20;

    category = null;
    params = window.location.search;
    hasFiltersApplied = false;

    constructor(){
        this.resetList();
        this.updateList();
        this.#setHasFiltersApplied();
    }

    updateList(){
        this.#getProductNameFromParams();

        this.#getCategoryFromParams();

        this.#getSelectedPriceFromParams();
        
        this.#filterProducts();
        this.#getLowestAndHighestPriceAvailable();
    }
    resetList(){
        this.productName = null;
        this.minPrice = 99999999;
        this.maxPrice = -20;
        this.maxPriceSelected = -20;
        this.category = null;
        this.#updateParams();
        this.list = products;
    }

    #setHasFiltersApplied(){
        this.hasFiltersApplied = this.productName !== null 
                                    || this.maxPriceSelected !== -20
                                    || this.category !== null;
    }

    #getLowestAndHighestPriceAvailable(){
        this.list.map(prod => {
            if(prod.prodPrice < this.minPrice){
                this.minPrice = prod.prodPrice;
            }
            if(prod.prodPrice > this.maxPrice){
                this.maxPrice = prod.prodPrice;
            }
        })

    }

    #updateParams(){
        this.params = window.location.search;
    }

    #getProductNameFromParams(){
        if(this.params.includes("productName")){
            this.productName = this.params.split("productName=")[1];

            if(this.productName.includes("&")){
                this.productName = this.productName.split("&")[0];

                if(this.productName.length === 0){
                    this.productName = null;
                }
            }
        }else{
            this.productName = null;
        }
    }

    #getSelectedPriceFromParams(){
        let price = -20;
        if(this.params.includes("maxPrice")){
            price = this.params.split("maxPrice=")[1];
            if(price.includes("&")){
                price = price.split("&")[0];
            }

            if(price.length > 0){
                price = parseFloat(price);
            }else{
                price = -20;
            }
        }
        this.maxPriceSelected = price;
    }

    #getCategoryFromParams(){
        if(this.params.includes("category")){
            this.category = this.params.split("category=")[1];
            if(this.category.includes("&")){
                this.category = this.category.split("&")[0];
                if(this.category.length === 0){
                    this.category = null;
                }
            }
        }else{
            this.category = null;
        }
    }

    #filterProducts(){
        this.list = products;
        if(this.productName!==null){
            this.list = this.list.filter(item => item.prodTitle.includes(this.productName));
        }

        if(this.category !== null){
            this.list = this.list.filter(item => item.categories.includes(this.category));
        }

        if(this.maxPriceSelected !== -20){
            this.list = this.list.filter(item => item.prodPrice <= this.maxPriceSelected);
        }
    }
}