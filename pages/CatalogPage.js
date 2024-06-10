import Catalog from "../components/Catalog.js";
import CatalogCard from "../components/CatalogCard.js";
import SearchFilter from "../components/SearchFilter.js";

export default class CatalogPage{
    main = document.getElementById("main");

    constructor(){
        this.main.classList.add("row", "g-0", "justify-content-between");
        this.main.innerHTML = `
            <div class="col-md-3 col-12" id="aside_col"></div>
            <div class="col-md-8 col-12" id="catalog_products"></div>
        `;
        
        new SearchFilter("aside_col");
        new Catalog("catalog_products");

    }

}