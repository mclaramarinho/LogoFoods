import { products } from "../data/products.js";
import {cart} from "../index.js"
import SectionHeader from "../components/SectionHeader.js";
export default class CartPage{
    main = document.getElementById("main");
    container = document.createElement("div");

    cartItems = cart.getParsedCartData();
    cartSummary = {
        subtotal: 0,
        total: 0
    }

    products = []

    cepEstimationErrorMessage = "Error";

    shipping = {
        cep: "",
        price: 0,
        dayEstimate: 0
    }



    constructor(elementToAttachTo=null){
        if(elementToAttachTo!==null){
            this.main = document.getElementById(elementToAttachTo);
        }

        this.#updateProductsInCart()
        

        this.container.classList.add("cart__container");

        this.container.innerHTML = /*html*/`
            ${new SectionHeader("Seu Carrinho", false, ["p-0", "mb-5"], false, false).getHtmlElement().outerHTML}
            
            ${this.#getCartItems()}
            
            <hr>
            
            ${this.#getShippingEstimateHtml()}
            
            <hr>

            ${this.#getCartSummaryHtml()}

            <button type="button" class="button button-sm btn-orange" id="continue_cart__btn">Continuar</button>
            <span class="d-none text-danger fw-bold font-12" id="form_error__message">Você precisa estimar o valor do frete.</span>
        `;

        this.main.append(this.container);
        this.#estimateShippingEventListener()
        this.#updateSummary()
        this.#changeAmountProductEventListeners();
        this.#continueBtnEventListener();
    }

    #continueBtnEventListener(){
        const btn = document.getElementById("continue_cart__btn");
        const cepInput = document.getElementById("cep_estimate_input");
        const formErrorMsg = document.getElementById("form_error__message");

        btn.addEventListener("mouseup", ev =>{
            if(this.shipping.cep.length === 0 && this.shipping.dayEstimate === 0){
                cepInput.focus();
                cepInput.scrollIntoView({ behavior: "smooth", block: "start", inline: "start"})

                formErrorMsg.classList.remove("d-none");
            }
        })
    }

    #updateProductsInCart(){
        this.products = []

        this.cartItems = cart.getParsedCartData().filter(item => item.amount !== 0);

        

        this.cartItems.map(item => {
            products.map(prod => {
                if(prod.id === item.id){
                    this.products.push(prod);
                    return;
                }
            })
        })

    }

    #estimateShipping(){
        const shippingResultEl = document.getElementById("shipping_estimate__result");
        shippingResultEl.classList.add("d-none")
        
        const value = document.getElementById("cep_estimate_input").value;
        
        const errorElement = document.getElementById("cep_error__message");
        

        if(value === null || value.length === 0){
            console.log("error")
            errorElement.classList.remove("d-none");
            errorElement.innerText = "O campo não pode estar vazio";
            return;
        }
        
        // TODO - validate CEP - "CEP inválido"
        
        errorElement.classList.add("d-none");
        const randomPrice = Math.floor(Math.random()*50)+10;
        const randomDays = Math.floor(Math.random()*10)+1;
        this.shipping.price = randomPrice;
        this.shipping.dayEstimate = randomDays;
        this.shipping.cep = value;

        const shippingPriceEl = document.getElementById("shipping_price__result");
        const shippingDaysEl = document.getElementById("shipping_days__result");

        shippingResultEl.classList.remove("d-none")

        shippingPriceEl.innerText = `R$${randomPrice}`;

        shippingDaysEl.innerText = `${randomDays} dia(s)`;


        this.#updateSummary();
    }

    #estimateShippingEventListener(){
        const button = document.getElementById("estimate_shipping");

        button.addEventListener("mouseup", ev => {
            this.#estimateShipping()
        })
    }


    #updateSummary(){
        const shippingPriceSummary = document.getElementById("shipping_price_summary");
        shippingPriceSummary.innerText = `R$${this.shipping.price}`;

        const subtotalPriceSummary = document.getElementById("subtotal_price__summary");
        let subtotal = 0;
        this.products.forEach(prod => {
            const amount = this.cartItems.filter(item => item.id === prod.id)[0].amount;

            subtotal+= (prod.prodPrice * amount * 100)/100;
        })
        subtotalPriceSummary.innerText = "R$"+subtotal;
        this.cartSummary.subtotal = subtotal;

        const totalPriceSummary = document.getElementById("total_price__summary");
        this.cartSummary.total = this.cartSummary.subtotal + this.shipping.price;
        totalPriceSummary.innerText = `R$${this.cartSummary.total}`;
    }

    #updateItemValues(prodId, amount, price){
        const totalPriceSlot = document.querySelector(`.price[data-lf-prodId="${prodId.toString()}"]`);
        const amountSlot = document.querySelector(`.amount[data-lf-prodId="${prodId.toString()}"]`);

        if(totalPriceSlot !== null && amountSlot !== null){
            totalPriceSlot.innerText = `R$${(amount * price * 100)/100}`
            amountSlot.innerText = `Qtd.: ${amount}`
        }


    }

    #changeAmountProductEventListeners(){
        const removeBtn = document.querySelectorAll(".removeFromCart_button");
        const increaseBtn = document.querySelectorAll(".increase_btn");
        const decreaseBtn = document.querySelectorAll(".decrease_btn");
        
        const updateActions = (prodId, updatedItem, prodData, del=false) => {
            cart.updateCart(updatedItem.id, updatedItem.amount);
            if(del){
                const cardToHide = document.querySelector(`.cart_item[data-lf-prodId="${updatedItem.id}"]`);
                cardToHide.classList.add("d-none");
            }
            this.#updateProductsInCart()
            this.#updateSummary()
            this.#updateItemValues(prodId, updatedItem.amount, prodData.prodPrice);
        }

        const getUpdatedItem = (action, prodId) => {
            const cartItemToEdit = this.cartItems.filter(item => item.id === prodId)[0];
            const updatedItem = {
                id: cartItemToEdit.id,
                amount: action === "del" ? 0 
                        : action === "decrease" ? cartItemToEdit.amount-1
                        : cartItemToEdit.amount+1
            };
            return updatedItem;
        }

        const getProdData = (prodId) => this.products.filter(prod => prod.id === prodId)[0];

        removeBtn.forEach(el => {
            el.addEventListener("mouseup", ev => {
                const prodId = parseInt(el.getAttribute("data-lf-prodId"));

                const prodData = getProdData(prodId);

                const updatedItem = getUpdatedItem("del", prodId);

                updateActions(prodId, updatedItem, prodData, true) 
            })
        })

        increaseBtn.forEach(el => {
            el.addEventListener("mouseup", ev => {
                const prodId = parseInt(el.getAttribute("data-lf-prodId"));
                
                const prodData = getProdData(prodId);
                
                const updatedItem = getUpdatedItem("increase", prodId);
                

                updateActions(prodId, updatedItem, prodData) 
            })
        })

        decreaseBtn.forEach(el => {
            el.addEventListener("mouseup", ev => {
                const prodId = parseInt(el.getAttribute("data-lf-prodId"));

                const prodData = getProdData(prodId);

                const updatedItem = getUpdatedItem("decrease", prodId);

                updateActions(prodId, updatedItem, prodData) 
            })
        })
    }

    // SUB COMPONENTS HTML
    #getShippingEstimateHtml(){
        return /*html*/`
            <div class="calc_shipping__container">
                <div>
                    <input type="text" id="cep_estimate_input" value="${this.shipping.cep}"
                            class="form-control" placeholder="Insira seu CEP" />
                    <span class="text-danger d-none" id="cep_error__message"></span>
                </div>
                <button class="button button-sm btn-orange" id="estimate_shipping">Calcular</button>
                ${this.#getResultTableHtml()}
            </div>
        `;
    }

    #getResultTableHtml(){
        return /*html*/`
            <div class="shipping_estimate__result d-none" id="shipping_estimate__result">
                    <table class="table">
                        <thead>
                            <tr>
                                <th class="text-center" colspan="2">Estimativa do frete</th>
                            </tr>
                        </thead>
                        <tr>
                            <th scope="row">Preço: </th>
                            <td id="shipping_price__result"></td>
                        </tr>
                        <tr>
                            <th scope="row">Prazo: </th>
                            <td id="shipping_days__result"></td>
                        </tr>
                    </table>
                </div>
        `;
    }

    #getCartSummaryHtml(){

        return /*html*/`
            <div class="cart_summary__container">

                ${new SectionHeader("Resumo da Compra", false, ["p-0"], false, true).getHtmlElement().outerHTML}
                <table class="table">
                    <tr>
                        <th scope="row">Subtotal</th>
                        <td id="subtotal_price__summary">R$</td>
                    </tr>
                    <tr>
                        <th scope="row">Frete</th>
                        <td id="shipping_price_summary">R$</td>
                    </tr>
                    <tr>
                        <th scope="row">Total</th>
                        <td id="total_price__summary">R$</td>
                    </tr>
                </table>
            </div>
        `;
    }

    #getCartItems(){
        return /*html*/`
            <div class="cart_items__container">
                <h3 class="position-fixed bg-white w-100 p-2 m-0 g-0">Items</h3>

                ${this.cartItems.length > 0 ? "" 
                        : /*html*/`
                            <h2 class="mt-5 pt-5">Nenhum item no carrinho</h2>
                        `
                    
                }
              
                ${this.cartItems.length > 0 ? this.cartItems.map(item => {
                   
                    const product = this.products.filter(p => p.id === item.id)[0];
                    return /*html*/`
                        <div class="cart_item" data-lf-prodId="${product.id}">
                            <img src="${product.imgSrc}" />
                            <div class="cart_item__info">
                                <p class="title">${product.prodTitle}</p>

                                <div class="amount_price__container">
                                    <p data-lf-prodId="${product.id}" class="amount">Qtd.: ${item.amount}</p>
                                    <p data-lf-prodId="${product.id}" class="price">R$${(product.prodPrice * item.amount * 100)/100}</p>
                                </div>

                                <div class="actions">
                                    <button class="btn btn-outline-danger removeFromCart_button" data-lf-prodId="${product.id}">
                                        <i class="bi bi-trash"></i>
                                    </button>

                                    <div class="control_amount">
                                        <i class="bi bi-dash decrease_btn" data-lf-prodId="${product.id}"></i>
                                        <i class="bi bi-plus increase_btn" data-lf-prodId="${product.id}"></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                       
                    `;
                }).join("") : ""}
            </div>
        `
    }

}