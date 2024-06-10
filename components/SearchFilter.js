import FilteredProducts from "../data/FilteredProducts.js";
import { categories } from "../data/categories.js"

export default class SearchFilter{
    elementToAttach = document.getElementById("main");

    urlParams = window.location.search;

    asideEl = document.createElement("aside");
    priceRange = {
        min:  new FilteredProducts().minPrice,
        max: new FilteredProducts().maxPrice
    };
    categoryFilter = {
        header: "Por categoria",
        inputType: "radio",
        name: "category",
        options: categories
    };

    constructor(attachTo=null){
        if(attachTo!==null){
            this.elementToAttach = document.getElementById(attachTo);
        }    

        this.asideEl.id = "searchFilter_container";
        this.asideEl.classList.add("searchFilter_container");

        this.asideEl.innerHTML = this.#getAsideInnerHtml();

        this.elementToAttach.innerHTML = this.#getOpenSearchFilterBtn();
        this.elementToAttach.append(this.asideEl);
        this.#setFilterValues();

        this.#addToggleEventSearchFilter();
    }

    #getOpenSearchFilterBtn(){
        return `
            <button class="btn btn-success d-none" id="openFilter_btn">Abrir filtros</button>
        `;
    }
    #getAsideInnerHtml(){
        return  `
            <div class="row justify-content-end g-0">
                <button type="button" class="btn btn-close" id="close_searchFilter__button"></button>
            </div>
            <h2>Filtrar busca</h2>
            <form method="get">
                <input type="hidden" name="catalog" />
                <input type="hidden" name="productName" />
                <div class="form-group mb-2">
                    <h4 class="">Por preço</h4>
                    <input class="form-range" 
                            id="priceRange_input" type="range" name="maxPrice" 
                            min="${this.priceRange.min}" max="${this.priceRange.max}"
                            value="${this.priceRange.max}"/>
                    <div class="d-flex justify-content-between search_filter__label">
                        <p>R$${this.priceRange.min}</p>
                        <p>R$${this.priceRange.max}</p>
                    </div>
                </div>
                <div class="form-group mb-2">
                    <h4>${this.categoryFilter.header}</h4>
                    <ul>
                        ${
                            this.categoryFilter.options.map(option => {
                                return `
                                    <li class="category_filter__item">
                                        <label class="search_filter__label">
                                            ${option.name}
                                            <input class="form-check-input category_filter__options" 
                                                    type="${this.categoryFilter.inputType}" 
                                                    name="${this.categoryFilter.name}" 
                                                    value="${option.tag}"
                                            />
                                        </label>
                                    </li>
                                `
                            }).join('\n')
                        }
                    </ul>
                </div>
                <div class="d-flex justify-content-end">
                    <a href="/?catalog" class="btn btn-link text-danger text-decoration-none">Limpar</a>
                    <button type="submit" class="button button-sm btn-orange">Filtrar</button>
                </div>
            </form>
        `;
    }

    #setFilterValues(){
        if(this.urlParams.includes("maxPrice")){
            let value = this.urlParams.split("maxPrice=")[1];
            if(value.includes('&')){
                value = value.split("&")[0];
            }
            const el = document.getElementById("priceRange_input");

            el.setAttribute("value", value);
        }

        if(this.urlParams.includes(this.categoryFilter.name)){
            const value = this.urlParams.split("category=")[1];
            if(value.includes('&')){
                value = value.split("&")[0];
            }
            const options = document.querySelectorAll(".category_filter__options") || [];
            options.forEach(el => {
                if(el.getAttribute("value") === value)
                {
                    console.log("aaaaaaaa")
                    el.setAttribute("checked", true);
                }
            })
        }
    }

    #addToggleEventSearchFilter(){
        const main = document.getElementById("main");
        const closeButton = document.getElementById("close_searchFilter__button");
        const openFilterBtn = document.getElementById("openFilter_btn");
        const asideCol = document.getElementById("aside_col");
        const catalogCol = document.getElementById("catalog_products");
        const filterContainer = document.getElementById("searchFilter_container");
        
        // CLOSE SEARCH FILTER
        closeButton.addEventListener("mouseup", ev => {

            main.classList.remove("justify-content-between", "row", "g-0");

            filterContainer.classList.add("d-none");
            
            asideCol.classList.add("mb-4", "w-100", "h-fit")
            asideCol.classList.remove("col-md-3", "col-12")
            
            catalogCol.classList.add("w-100")
            catalogCol.classList.remove("col-8", "col-12")

            openFilterBtn.classList.remove("d-none");
        });

        // OPEN SEARCH FILTER
        openFilterBtn.addEventListener("mouseup", ev => {
            main.classList.add("justify-content-between", "row", "g-0");

            filterContainer.classList.remove("d-none");

            asideCol.classList.remove("mb-4", "w-100", "h-fit")
            asideCol.classList.add("col-md-3", "col-12")

            catalogCol.classList.remove("w-100")
            catalogCol.classList.add("col-8", "col-12")

            openFilterBtn.classList.add("d-none");
            
        })


    }
}