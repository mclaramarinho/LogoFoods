import SectionHeader from "../../components/SectionHeader.js"

export default class PaymentMethodsTab{
    container = document.createElement("div");

    constructor(){
        this.container.innerHTML = /*html*/`
            <div class="row">
                <div class="col-12 col-md-6 mx-auto">
                    ${new SectionHeader("Adicionar novo cartão", false, ["p-0"], false, true).getHtmlElement().outerHTML}

                    <div class="form_add__payment row mt-3">
                        <div class="mb-3 col-12 align-content-baseline mt-1">
                            <label for="main_card_input" class="form-label d-flex">
                                Principal? 
                                <input type="checkbox" id="main_card_input" class="form-check ms-3">
                            </label>
                        </div>

                        <div class="mb-3 col-12 col-sm-6">
                            <label for="card_number_input" class="form-label">NÚMERO</label>
                            <input type="text" mask="9999 9999 9999 9999" class="masked form-control" id="card_number_input">
                        </div>

                        <div class="mb-3 col-6 col-sm-6 col-md-4">
                            <label for="card_date_input" class="form-label">VALIDADE</label>
                            <input type="text" mask="99/99" class="masked form-control" id="card_date_input">
                        </div>

                        <div class="mb-3 col-6 col-sm-6 col-md-2">
                            <label for="cvv_input" class="form-label">CVV</label>
                            <input type="text" mask="999" class="masked form-control" id="cvv_input">
                        </div>
                        
                        <div class="mb-3 col-12 col-md-12">
                            <label for="card_owner_name_input" class="form-label">NOME DO TITULAR</label>
                            <input type="text" class="form-control" id="card_owner_name_input">
                        </div>
                        <div class="mb-3 col-12 col-md-12">
                            <label for="card_owner_cpf_input" class="form-label">CPF</label>
                            <input type="text" mask="999.999.999-99" class="masked form-control" id="card_owner_cpf_input">
                        </div>
                    </div>
                    <button class="button button-sm btn-orange" id="save_btn__pm">Salvar</button>

                </div>

                <!-- <div class="col-12 col-md-6 mx-auto"></div> -->
                
            </div>
            <div id="alert_payment" class="mt-5 alert alert-success alert-dismissible d-none fade" role="alert">
                <strong>Cadastrado com sucesso!</strong>
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>
        `;
    }

    getHtml(){
        return this.container.outerHTML
    }
    eventListeners(){
        const $ = (id) => document.getElementById(id);
        const inputs = () => [$("card_number_input"), $("card_date_input"), $("cvv_input"), $("card_owner_name_input"), $("card_owner_cpf_input")];

        const saveBtn = () => $("save_btn__pm");

        saveBtn().addEventListener("mouseup", ev => {
            for(let i = 0; i < inputs().length; i++){
                const element = inputs()[i];
                if(!element.value || element.value === null || element.value.length === 0){
                    element.focus();
                    return;
                }else{continue;}
            }

            console.log("ay")

            inputs().map(el => el.value = "")
            document.getElementById("alert_payment").classList.add("show");
            document.getElementById("alert_payment").classList.remove("d-none");
            setTimeout(() => {
                document.getElementById("alert_payment").classList.remove("show");
                document.getElementById("alert_payment").classList.add("d-none");
            }, 5000);

        })
    }
}