import FilteredProducts from "../data/FilteredProducts.js";
import SectionHeader from "../components/SectionHeader.js"
import Section from "../components/Section.js"
import { cart, navbar } from "../index.js";
export default class DetailsPage{
    params = window.location.search;
    prodId = 0;
    product = null;
    amountInCart = 1;

    elementToAttachTo = document.getElementById("main");

    constructor(elementToAttachTo=null){
        this.#updateParams();
        this.#getProductById();


        if(this.product===null){
            window.location.href="?notfound"
        }


        if(elementToAttachTo !== null){
            this.elementToAttachTo = document.getElementById(elementToAttachTo);
        }


        this.elementToAttachTo.innerHTML = /*html*/`
            ${this.#getNavigationHeaderHtml()}

            ${this.#getContentHtml()}


            ${this.#getNutritionalInfoHtml()}
        `;

        this.#handleCartAmount();
        this.#favoriteButtonEvents()
    }

    #getNavigationHeaderHtml(){
        return /*html*/`
            <div class="details_page__navigationHeader">
                <a href="?catalog" class="button btn-orange round"><i class="bi bi-chevron-left"></i> Voltar</a>
            </div>
        `
    }

    #getContentHtml(){
        return /*html*/`
          <div class="details_content__container">
            <div>
                <img src="${this.product.imgSrc}" class="" alt="" />
            </div>

            <div class="details_content__info">
                <div>
                    <div class="availability_chip">${this.product.available ? "Disponível" : "Indisponível"}</div>
                    <h1 class="prodTitle">${this.product.prodTitle}</h1>
                    <p class="prodDesc">${this.product.prodDesc}</p>
                </div>
                
                <hr>

                <div class="action_buttons">
                    <h3>R$${this.product.prodPrice}</h3>

                    <div class="cart_control__container">
                        <div class="cart_amount_control__container">
                            <i class="bi bi-dash cart_decrease disabled" id="cart_decrease"></i>
                            <div class="amount_to_add">
                                <p>${this.#getPaddedValue()}</p>
                            </div>
                            <i class="bi bi-plus cart_increase cursor-pointer" id="cart_increase"></i>
                        </div>
                        <button id="add_to_cart__btn" class="button button-sm btn-orange">
                            <i class="bi bi-cart-plus"></i> Adicionar
                        </button>
                    </div>

                    <!-- TODO - Alterar para ser dinâmico de acordo com os favoritos do user logado -->
                    <button
                        class="favorite_container text-decoration-none">
                        <i class="bi bi-heart"></i> <b>Favoritar</b>
                    </button>
                    <div class="categories_container">
                        <b>Categories: </b> ${this.product.categories.join(", ") || this.product.categories[0]}
                    </div>
                    <div class="tags_container">
                        <b>Tags: </b> ${this.product.characteristics.join(", ") || this.product.characteristics[0]}
                    </div>
                </div>
            </div>
          </div>  
        `;
    }

    #getNutritionalInfoHtml(){
        const header = new SectionHeader("Informações Nutricionais", true, ["text-center", "my-5"], false, true).getHtmlElement();
        
        const nutriInfoContainer = document.createElement("div");
        nutriInfoContainer.classList.add("nutri_info__container");
        nutriInfoContainer.innerHTML = /*html*/`
            <div class="nutri_ingredients__container">
                <b>Ingredientes: </b> ${this.product.nutritionalInfo.ingredients.join(", ")}.
                <strong>${this.product.nutritionalInfo.allergens.milk ? "CONTÉM LEITE." : ""}</strong>
                <strong>${this.product.nutritionalInfo.allergens.soyDerivates ? "CONTÉM DERIVADOS DE SOJA." : ""}</strong>
                <strong>${this.product.nutritionalInfo.allergens.lactose ? "CONTÉM LACTOSE." : ""}</strong>
                <strong>${this.product.nutritionalInfo.allergens.gluten ? "CONTÉM GLÚTEN." : ""}</strong>
                <strong>${this.product.nutritionalInfo.allergens.peanut ? "CONTÉM AMENDOIM." : ""}</strong>
                <strong>${this.product.nutritionalInfo.allergens.seafood ? "CONTÉM FRUTOS DO MAR." : ""}</strong>
                
                
            </div>
            <div class="nutri_table table-responsive">
                <table class="table">
                    <thead class="text-center">
                        <tr>
                            <th colspan="3">INFORMAÇÃO NUTRICIONAL</th>
                        </tr>
                        <tr>
                            <th colspan="3">Valores referentes à porção de ${this.product.nutritionalInfo.referencePortion}</th>
                        </tr>
                        <tr>
                            <th colspan="2" class="text-start">Quantidade por porção</th>
                            <th colspan="1">%VD*</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Valor Energético</td>
                            <td item-width="10px">${this.product.nutritionalInfo.nutrients.energy.kcal}Kcal=${this.product.nutritionalInfo.nutrients.energy.kj}KJ</td>
                            <td>${this.product.nutritionalInfo.nutrients.energy.vd}%</td>
                        </tr>
                        <tr>
                            <td>Carboidratos</td>
                            <td>${this.product.nutritionalInfo.nutrients.carbohydrates.g}g</td>
                            <td>${this.product.nutritionalInfo.nutrients.carbohydrates.vd}%</td>
                        </tr>
                        <tr>
                            <td>Proteínas</td>
                            <td>${this.product.nutritionalInfo.nutrients.protein.g}g</td>
                            <td>${this.product.nutritionalInfo.nutrients.protein.vd}%</td>
                        </tr>
                        <tr>
                            <td>Gorduras Totais</td>
                            <td>${this.product.nutritionalInfo.nutrients.fat.total.g}g</td>
                            <td>${this.product.nutritionalInfo.nutrients.fat.total.vd}%</td>
                        </tr>
                        <tr>
                            <td>Gorduras Saturadas</td>
                            <td>${this.product.nutritionalInfo.nutrients.fat.saturated.g}g</td>
                            <td>${this.product.nutritionalInfo.nutrients.fat.saturated.vd}%</td>
                        </tr>
                        <tr>
                            <td>Gorduras Insaturadas</td>
                            <td>${this.product.nutritionalInfo.nutrients.fat.insaturated.g}g</td>
                            <td>${this.product.nutritionalInfo.nutrients.fat.insaturated.vd}%</td>
                        </tr>
                        <tr>
                            <td>Gorduras Trans</td>
                            <td>${this.product.nutritionalInfo.nutrients.fat.trans.g}g</td>
                            <td>${this.product.nutritionalInfo.nutrients.fat.trans.vd}%</td>
                        </tr>
                        <tr>
                            <td>Fibras Alimentares</td>
                            <td>${this.product.nutritionalInfo.nutrients.fiber.g}g</td>
                            <td>${this.product.nutritionalInfo.nutrients.fiber.vd}%</td>
                        </tr>
                        <tr>
                            <td>Sódio</td>
                            <td>${this.product.nutritionalInfo.nutrients.sodium.mg}g</td>
                            <td>${this.product.nutritionalInfo.nutrients.sodium.vd}%</td>
                        </tr>
                        <tr>
                            <td>Açúcares</td>
                            <td>${this.product.nutritionalInfo.nutrients.sugar.g}g</td>
                            <td>${this.product.nutritionalInfo.nutrients.sugar.vd}%</td>
                        </tr>
                    </tbody>

                    <tfoot>
                        <tr>
                            <td colspan="3">*% Valores Diários com base em uma dieta de 2000 Kcal ou 8400 KJ.</td>
                        </tr>
                        <tr>
                            <td colspan="3">Seus valores diários podem ser maiores ou menores, dependendo de suas necessidades energéticas.</td>
                        </tr>
                    </tfoot>
                </table>
            </div>
        `;

        const section = new Section([header, nutriInfoContainer], false, null, null, false)

        let htmlToReturn = section.section.outerHTML;

        return section.section.outerHTML
    }

    #getPaddedValue(){
        return this.amountInCart.toString().padStart(2, '0')
    }
    #handleCartAmount(){
        const increase = document.getElementById("cart_increase");
        const decrease = document.getElementById("cart_decrease");

        const addToCart = document.getElementById("add_to_cart__btn");
        
        const valueEl = document.querySelector(".amount_to_add p");
        
        
        increase.addEventListener("mouseup", ev => {
            this.amountInCart++;
            valueEl.innerText = this.#getPaddedValue();

            if(this.amountInCart === 1){
                decrease.classList.remove("cursor-pointer");
                decrease.classList.add("disabled");
            }else{
                decrease.classList.remove("disabled");
                decrease.classList.add("cursor-pointer");
            }
        })
            
        decrease.addEventListener("mouseup", ev => {
                if(this.amountInCart !== 1){
                    this.amountInCart--;
                    valueEl.innerText = this.#getPaddedValue();
                }
                if(this.amountInCart === 1){
                    decrease.classList.remove("cursor-pointer");
                    decrease.classList.add("disabled");
                }else{
                    decrease.classList.remove("disabled");
                    decrease.classList.add("cursor-pointer");
                }
        })

        addToCart.addEventListener("mouseup", ev =>{
            cart.updateCart(this.prodId, this.amountInCart);
            navbar.updateIconButtons();
        })
    }

    #favoriteButtonEvents(){
        const favButton = document.querySelector(".favorite_container");

        favButton.addEventListener("mouseenter", ev => {
            favButton.innerHTML = /*html*/`
                <i class="bi bi-heart-fill"></i> <b>Favoritar</b>
            `;
        });
        favButton.addEventListener("mouseleave", ev => {
            favButton.innerHTML = /*html*/`
                <i class="bi bi-heart"></i> <b>Favoritar</b>
            `;
        });

        favButton.addEventListener("mouseup", ev => {
            // TODO - handle user favorites
        })
    }
    #getProductById(){
        this.#getProductIdFromParams();
    
        this.product = new FilteredProducts(this.prodId).list[0] || null;
    }
    #updateParams(){
        this.params = window.location.search;
    }
    #getProductIdFromParams(){
        if(this.params.includes("productId")){
            this.prodId = parseInt(this.params.split("productId=")[1]);
        }else{
            this.prodId = 0;
        }
    }

}