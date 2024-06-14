import { productCharacteristics } from "../data/productCharacteristics.js";

export default class CatalogCard{
    card = document.createElement("a");
    container = document.getElementById("main");
    product = null;
    constructor(elementToAttach, product){
        this.container = document.getElementById(elementToAttach);
        this.product = product;
        this.card.href = product.href(product.id);
        this.card.classList.add("catalog_product__card");

        this.card.innerHTML = `
            <img src="${this.product.imgSrc}" alt="" />
            <div class="card-content">
                <div class="product_categories my-3">

                    ${this.#getCharacteristcsIconsHtml()}
                </div>
                <h3 class="">${this.product.prodTitle}</h3>
                <h3>R$${this.product.prodPrice.toFixed(2)}</h3>
            </div>
        `;

        this.container.append(this.card);
        this.#addTooltipEventListener()
    }
    
    #getCharacteristcsIconsHtml(){
        let html = "";

        this.product.characteristics.map(c => {

            const icon = productCharacteristics[c].icon;

            html += `
                <i class="${icon}" data-bs-toggle="tooltip" data-bs-title="${c.toUpperCase()}"></i>
            `;
        });

        return html;
    }

    #addTooltipEventListener(){
        const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
        const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl))
    }
}   