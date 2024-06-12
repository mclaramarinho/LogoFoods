import SectionHeader from "../components/SectionHeader.js";
import { users } from "../data/users.js";
import { cart } from "../index.js";
import Order from "../localstorage/order.js";

export default class CartPayment{
    main = document.getElementById("main");
    container = document.createElement("div");
    cartItems = cart.getCart();
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

    paymentMethods = []


    selectedPayment = null

    constructor(elementToAttachTo=null){
        if(new Order().getOrder() === null){
            window.location.href = "?cart&step=1"
        }
        if(elementToAttachTo!==null){
            this.main = document.getElementById(elementToAttachTo);
        }

        this.paymentMethods = users[0].paymentMethods;


        this.container.classList.add("cart__container");

        this.container.innerHTML = `
            ${new SectionHeader("Método de Pagamento", false, ["p-0", "mb-5"], false, false).getHtmlElement().outerHTML}
            
            <hr>
            
            <div class="bg-white p-5">
                ${new SectionHeader("Seus cartões", false, ["p-0", "mb-5"], false, true).getHtmlElement().outerHTML}
                <hr>
                <div class="row">
                    ${this.#getExistingOptionsHtml()}
                    <hr class="mb-5 mt-3">
                    <div class="col-12 col-md text-md-end align-content-md-end">
                        <button type="button" class="button button-sm btn-orange" id="finish_cart__btn">Continuar</button>
                        <br>
                        <span class="d-none text-danger fw-bold font-12" id="form_error__message">Você precisa estimar o valor do frete.</span>
                    </div>
                </div>
            </div>
            <hr>

           
        `;
        this.main.append(this.container)
        this.#existingCardsEventListeners();
        this.#finishOrderEventListener();

    }

    #getExistingOptionsHtml(){
        return /*html*/`
            <div class="container">
                <!-- <h3>Seus cartões</h3> -->

                <div class="row existing_cards__container">
                    ${this.#getExistingCardItemHtml()}
                    <div class="w-fit add_address__btn__container m-auto">
                        <a href="?profile" class="btn-orange outline btn" id="add_card__btn">Adicionar novo</a>
                    </div>
                </div>
            </div>
        `
    }

    #getExistingCardItemHtml(){
        let html = "";
        this.paymentMethods.forEach(pm => {
            const type = pm.type === "C" ? "Crédito" : "Débito";
            const dataLf = `${pm.brand.replace(" ", "")}${type}${pm.cardNumber.replace(" ", "").replace(" ", "")}`;
            html += /*html*/`
                <div data-lf-payment="${dataLf}" 
                        class="col-12 m-auto m-md-0 col-md-4 existing_card__item card-lg">
                    <h5>${pm.brand} - ${type}</h5>
                    <p>${pm.cardNumber}</p>
                    <p><b>Validade: </b>${pm.expiringDate}</p>
                    <p><b>Titular: </b>${pm.owner.name} - ${pm.owner.cpf}</p>
                </div>
            `;
        })

        if(html.length === 0){
            html = /*html*/`
                <h4>Você não possui cartões cadastrados.</h4>
            `
        }

        return html;
    }

    #existingCardsEventListeners(){
        const cards = document.querySelectorAll(".existing_card__item");

        cards.forEach(el => {
            el.addEventListener("mouseup", ev => {
                cards.forEach(el => el.classList.remove("selected_card"));

                el.classList.add("selected_card")

                
                const elDataLf = el.getAttribute("data-lf-payment");
                const getType = (pm) => pm.type === "C" ? "Crédito" : "Débito";
                const getDataLf = (pm) => `${pm.brand.replace(" ", "")}${getType(pm)}${pm.cardNumber.replace(" ", "").replace(" ", "")}`;
                const method = this.paymentMethods.filter(pm => getDataLf(pm) === elDataLf);
                
                this.selectedPayment = method[0];


            })
        })
    }


    #getCreditCardFormHtml(){
        return /*html*/`
            <div class="credit_card__form mt-5 d-none" id="credit_card__form">
                <form action="">
                    <div class="mb-3">
                        <label for="card_number__input" class="form-label">Número</label>
                        <input class="form-control" type="text" id="card_number__input" name="cardNumber" placeholder="Número do cartão">
                    </div>
                    <div class="mb-3">
                        <label for="expiring_date__input" class="form-label">Data de Vencimento</label>
                        <input class="form-control" type="text" id="expiring_date__input" name="expiringDate" placeholder="mm/aa">
                    </div>
                    <div class="mb-3">
                        <label for="owner_name__input" class="form-label">Nome do titular</label>
                        <input class="form-control" type="text" id="owner_name__input" name="ownerName" placeholder="Nome que aparece no cartão">
                    </div>
                    <div class="mb-3">
                        <label for="owner_cpf__input" class="form-label">CPF do titular</label>
                        <input class="form-control" type="text" id="owner_cpf__input" name="ownerCpf" placeholder="xxx.xxx.xxx-xx">
                    </div>
                    <div class="mb-3">
                        <label for="cvv__input" class="form-label">CPF do titular</label>
                        <input class="form-control" type="text" id="cvv__input" name="cvv" placeholder="123">
                    </div>
                </form>
            </div>  
        `;
    }

    #getFormToggleBtnHtml(){
        return /*html*/`
            <button class="button button-sm btn-orange" id="add_new_card__btn">Adicionar novo</button>
        `
    }

    #formToggleBtnEventListener(){
        const form = document.getElementById("credit_card__form");
        const addBtn = document.getElementById("add_new_card__btn");

        addBtn.addEventListener("mouseup", ev => {
            form.classList.toggle("d-none")
        })

    }

    #finishOrderEventListener(){
        const finishBtn = document.getElementById("finish_cart__btn");
        const errorEl = document.getElementById("form_error__message");

        finishBtn.addEventListener("mouseup", ev => {
            if(this.selectedPayment === null){
                errorEl.classList.remove("d-none");
                errorEl.innerText = "Você deve selecionar um método de pagamento."
            }else{
                errorEl.classList.add("d-none");
                new Order().setPaymentMethod(this.selectedPayment);
                window.location.href = "?cart&step=3"
            }
        })
    }

}