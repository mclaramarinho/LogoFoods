import FilteredProducts from "../data/FilteredProducts.js";
import CatalogCard from "./CatalogCard.js";

export default class Catalog{
    elementToAttach = document.getElementById("main");
    container = document.createElement("div");
    catalogHeaderText = "";

    constructor(elementToAttach=null){
        if(elementToAttach !== null) {
            this.elementToAttach = document.getElementById(elementToAttach);
        }

        this.container.classList.add("catalog_container");
        this.container.id = "catalog_container";
        
        const filteredProds = new FilteredProducts();

        this.catalogHeaderText = "Mostrando todos os produtos";
        if(filteredProds.productName !== null){
            this.catalogHeaderText = `Mostrando produtos com o nome`;
            this.elementToAttach.innerHTML = `<h2 class="font-black">${this.catalogHeaderText}<span class="font-red"> ${filteredProds.productName}</span></h2>`;
        }else{
            if(filteredProds.hasFiltersApplied){
                this.catalogHeaderText = "Mostrando todos os resultados para os filtros aplicados";
            }
            this.elementToAttach.innerHTML = `<h2 class="font-red">${this.catalogHeaderText}</h2>`;
        }

        
        this.elementToAttach.append(this.container);
        

        filteredProds.list.forEach(item => {
            new CatalogCard(this.container.id, item);
        });
    }
}