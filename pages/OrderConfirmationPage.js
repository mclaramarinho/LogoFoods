import SectionHeader from "../components/SectionHeader.js";
import Order from "../localstorage/order.js";
import Cart from "../localstorage/cart.js"


export default class OrderConfirmationPage{
    main = document.getElementById("main");
    container = document.createElement("div");
    order = null
    constructor(){
        this.order = new Order().getOrder();

        this.container.innerHTML = /*html*/`
            <div class="row">
                <div class="col-10 m-auto col-md-6 col-lg-4 bg-white p-3 order_confirmation__container">
                    ${new SectionHeader("Pedido concluído com sucesso!",false, ["p-0", "text-center", "mb-5"], false, true)
                        .getHtmlElement().outerHTML}

                    <h3>#${this.order.id}</h3>
                    <div>
                        <p><b>FRETE: </b>R$${this.order.shippingData.price}</p>
                        <p><b>SUBTOTAL: </b>R$${this.order.summary.subtotal}</p>
                        <p><b>DESCONTO: </b>R$${this.order.summary.discountPrice}</p>
                        <p><b>TOTAL COM DESCONTO: </b>R$${this.order.summary.total}</p>
                    </div>

                    <div>
                        <p><b>Entrega em: </b>${this.order.shippingData.dayEstimate} dia(s)</p>
                    </div>
                </div>
                <div class="col-12 text-center mt-5">
                        <button type="button" class="button button-sm btn-orange" id="reset_cart__btn">Voltar para o catálogo</button>
                </div>
            </div>
        `;

        this.main.append(this.container);

        this.#addResetCartEventListener();
    }

    #addResetCartEventListener(){
        const button = document.getElementById("reset_cart__btn");

        button.addEventListener("mouseup", ev => {
            window.location.href = "/"
            new Cart(true);
            new Order().resetOrder();
        })
    }
}