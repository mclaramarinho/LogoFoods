import { products } from "../data/products.js";
import { coupons } from "../data/coupons.js";
import {auth, cart, navbar} from "../index.js"
import { users, User } from "../data/users.js";
import SectionHeader from "../components/SectionHeader.js";
import Order from "../localstorage/order.js";
import Section from "../components/Section.js";
export default class CartPage{
    main = document.getElementById("main");
    container = document.createElement("div");

    cartItems = cart.getCart();
    cartSummary = {
        subtotal: 0,
        total: 0
    }

    couponApplied = {
        code: "",
        price: 0,
        percentage: 0
    }

    products = []

    shipping = {
        cep: "",
        price: 0,
        dayEstimate: 0
    }

    userInfo = User;

    constructor(elementToAttachTo=null){

        if(!auth.isSomeoneSignedIn()){
            const encodedRedirectTo = encodeURI("@?cart&step=1@");
            window.location.href = "?login&redirectTo="+encodedRedirectTo;
        }

        if(elementToAttachTo!==null){
            this.main = document.getElementById(elementToAttachTo);
        }

        this.#updateProductsInCart()


        this.userInfo = users[0];

        this.container.classList.add("cart__container");

        this.container.innerHTML = /*html*/`
            ${new SectionHeader("Seu Carrinho", false, ["p-0", "mb-5"], false, false).getHtmlElement().outerHTML}
            
                <div>
                    <div class="row g-0">
                        ${new SectionHeader("Itens", true, ["w-100"], false, true).getHtmlElement().outerHTML}
                    </div>
                    ${this.#getCartItemsHtml()}
                </div>

            <hr>
            
            <div class="bg-white p-5">

                ${this.#getAddressSectionHtml()}

                <hr>
                
                <div class="row">
                    <!-- ${this.#getShippingEstimateHtml()} -->

                    ${this.#getResultTableHtml()}
                    <div class="col">
                        ${this.#getCouponInputHtml()}
                    </div>
                </div>
                <hr>
                <div class="row">
                    ${this.#getCartSummaryHtml()}
                    <hr class="d-md-none my-5">
                    <div class="col-12 col-md text-md-end align-content-md-end">
                        <button type="button" class="button button-sm btn-orange" id="continue_cart__btn">Continuar</button>
                        <br>
                        <span class="d-none text-danger fw-bold font-12" id="form_error__message">Você precisa estimar o valor do frete.</span>
                    </div>
                </div>
            </div>
            <hr>



           
        `;

        this.main.append(this.container);
        this.#updateSummary()

        // event listeners
        this.#changeAmountProductEventListeners();
        // this.#estimateShippingEventListener()
        this.#existingAddressesEventListeners()
        this.#continueBtnEventListener();
        this.#couponInputEventListeners()
    }


    // UTILITIES ---------------------------------------------------------------------------
    #updateProductsInCart(){
        this.products = []

        this.cartItems = cart.getCart().filter(item => item.amount !== 0);

        

        this.cartItems.map(item => {
            products.map(prod => {
                if(prod.id === item.id){
                    this.products.push(prod);
                    return;
                }
            })
        })

        navbar.updateIconButtons()
    }

    #estimateShipping(cep=null){
        const shippingResultEl = document.getElementById("shipping_estimate__result");
        shippingResultEl.classList.add("d-none")
        
        let value = null;
        
        if(cep !== null){
            value=cep;
        }else{
            value = document.getElementById("cep_estimate_input").value;
        }

        // const errorElement = document.getElementById("cep_error__message");
        

        if(value === null || value.length === 0){
            console.log("error")
            // errorElement.classList.remove("d-none");
            // errorElement.innerText = "O campo não pode estar vazio";
            return;
        }
        
        // TODO - validate CEP - "CEP inválido"
        
        // errorElement.classList.add("d-none");
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

    #updateSummary(){
        // shipping slot
        const shippingPriceSummary = document.getElementById("shipping_price_summary");
        shippingPriceSummary.innerText = `R$${this.shipping.price}`;

        // subtotal slot
        const subtotalPriceSummary = document.getElementById("subtotal_price__summary");
        let subtotal = 0;
        this.products.forEach(prod => {
            const amount = this.cartItems.filter(item => item.id === prod.id)[0].amount;

            subtotal+= (prod.prodPrice * amount * 100)/100;
        })
        subtotalPriceSummary.innerText = "R$"+subtotal;
        this.cartSummary.subtotal = subtotal;

        // coupon slot
         const couponDiscountSlotSummary = document.getElementById("coupon_discount_summary");
         couponDiscountSlotSummary.innerText = `R$${this.couponApplied.price}`;

        // total slot
        const totalPriceSummary = document.getElementById("total_price__summary");
        this.cartSummary.total = (this.cartSummary.subtotal + this.shipping.price)-this.couponApplied.price;
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

    #calculateDiscount(){
        const couponInput = document.getElementById("coupon_input");
        const coupon = couponInput.value;
        
        const errorMsgEl = document.getElementById("coupon_error__message");
        errorMsgEl.classList.add("d-none");

        if(coupon === null){
            errorMsgEl.innerText = "Você precisa digitar um código antes de adicionar."
            errorMsgEl.classList.remove("d-none");
            return;
        }

        let percentage = 0;

        const couponFound = coupons.filter(c => c.code === coupon.toUpperCase());

        const couponExists = couponFound.length > 0 ? true : false;

        if(!couponExists){
            errorMsgEl.innerText = "Esse cupom não existe."
            errorMsgEl.classList.remove("d-none");
            return;
        }

        const noDiscountPrice = (this.shipping.price + this.cartSummary.subtotal);

        percentage = couponFound[0].percentage / 100;
        const discountPrice = noDiscountPrice * percentage;
        
        this.couponApplied.code = coupon;
        this.couponApplied.percentage = couponFound[0].percentage;
        this.couponApplied.price = discountPrice;

        this.#updateSummary();
    }



    // EVENT LISTENERS ---------------------------------------------------------------------------
    #continueBtnEventListener(){
        const btn = document.getElementById("continue_cart__btn");
        
        const addressInput = document.querySelector(".existing_cards__container");

        const formErrorMsg = document.getElementById("form_error__message");

        btn.addEventListener("mouseup", ev =>{
            if(this.products.length === 0){
                formErrorMsg.classList.remove("d-none");
                formErrorMsg.innerText = "Seu carrinho está vazio."
                return;
            }
            if(this.shipping.cep.length === 0 && this.shipping.dayEstimate === 0){
                addressInput.focus();
                addressInput.scrollIntoView({ behavior: "smooth", block: "start", inline: "start"})

                formErrorMsg.classList.remove("d-none");
                formErrorMsg.innerText = "Você precisa selecionar um endereço de entrega."
            }else{
                this.#updateProductsInCart()

                const storeData = {
                    products: this.products,
                    summary: {
                        subtotal: this.cartSummary.subtotal,
                        total: this.cartSummary.total,
                        discountPrice: this.couponApplied.price,
                    },
                    shippingData: this.shipping,
                    paymentMethods: null
                }

                new Order(storeData.products, storeData.summary, storeData.shippingData, storeData.paymentMethods);
                window.location.replace("?cart&step=2")
            }
        })
    }

    #estimateShippingEventListener(){
        const button = document.getElementById("estimate_shipping");

        button.addEventListener("mouseup", ev => {
            this.#estimateShipping()
        })
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

    #couponInputEventListeners(){
        const button = document.getElementById("add_coupon__btn");

        button.addEventListener("mouseup", ev => {
            this.#calculateDiscount()
        })
    }
    
    #existingAddressesEventListeners(){
        const cards = document.querySelectorAll(".existing_card__item");

        cards.forEach(el => {
            el.addEventListener("mouseup", ev => {
                cards.forEach(el => el.classList.remove("selected_card"));

                el.classList.add("selected_card")

                const address = users[0].addresses.filter(ad => `${ad.cep}${ad.number}${ad.complement.replace(" ", "")}` === el.getAttribute("data-lf-address"))

                console.log(address[0])

                this.#estimateShipping(address[0].cep);
            })
        })
    }




    // ELEMENTS -------------------------------------------------------------------------------

    #getShippingEstimateHtml(){
        return /*html*/`
            <div class="calc_shipping__container form_container__cart col-12 col-md-6">
                <div>
                    <input type="text" id="cep_estimate_input" value="${this.shipping.cep}"
                            class="form-control text_input__cart" placeholder="Insira seu CEP" />
                    <span class="text-danger d-none" id="cep_error__message"></span>
                </div>
                <button class="button button-sm btn-orange form_button__cart" id="estimate_shipping">Calcular</button>
                ${this.#getResultTableHtml()}
            </div>
        `;
    }

    #getCouponInputHtml(){
        return /*html*/`
            ${new SectionHeader("Tem um cupom?", false, ["p-0"], false, true).getHtmlElement().outerHTML}
            <div class="coupon__container form_container__cart col-12 col-md-6 mt-md-4 mt-5">
                <div>
                    <input type="text" placeholder="Insira o cupom"  id="coupon_input" class="form-control text_input__cart">
                    <span class="text-danger d-none" id="coupon_error__message"></span>
                </div>
                <button class="button button-sm btn-orange form_button__cart" id="add_coupon__btn">Adicionar</button>
            </div>
        `;
    }

    #getResultTableHtml(){
        return /*html*/`
            <div class="shipping_estimate__result d-none table__cart col-md-6 col-12" id="shipping_estimate__result">
                    <table class="table ">
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
                <hr class="my-5 d-md-none">
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
                        <th scope="row">Cupom</th>
                        <td id="coupon_discount_summary">R$</td>
                    </tr>
                    <tr>
                        <th scope="row">Total</th>
                        <td id="total_price__summary">R$</td>
                    </tr>
                </table>
            </div>
        `;
    }

    #getCartItemsHtml(){
        return /*html*/`
            <div class="cart_items__container">
                
                <!-- <h3 class="position-fixed bg-white w-100 p-2 m-0 g-0">Items</h3> -->

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

    #getExistingAddressesHtml(){
        return this.userInfo.addresses.map(ad => {
            return /*html*/`
                <div data-lf-address="${ad.cep}${ad.number}${ad.complement.replace(" ", "")}" class="col-12 m-auto m-md-0 col-md-4 existing_card__item">
                    <h5>${ad.data.logradouro}, ${ad.number}, ${ad.complement} - ${ad.data.bairro}, ${ad.data.localidade}, ${ad.data.uf} -
                        ${ad.cep}</h5>
                    <p><b>Instruções de entrega: </b>${ad.deliveryInstructions.length > 0 ? ad.deliveryInstructions : "nenhuma"}</p>
                </div>
            `;
        }).join("") 
    }
    #getAddressSectionHtml(){
        return /*html*/`
            <div class="row">
                    ${new SectionHeader("Endereço de entrega", false, ["p-0"], false, true).getHtmlElement().outerHTML}
                    <div class="col-12">
                        <div class="row existing_cards__container">
                            ${this.#getExistingAddressesHtml()}
                            ${this.#getExistingAddressesHtml()}
                            ${this.#getExistingAddressesHtml()}
                            ${this.#getExistingAddressesHtml()}
                            <div class="w-fit add_address__btn__container m-auto">
                                <a href="?profile" class="btn-orange outline btn" id="add_address__btn">Adicionar novo</a>
                            </div>
                        </div>
                    </div>
                </div>
        ` 
    }

}