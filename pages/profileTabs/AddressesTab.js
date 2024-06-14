import SectionHeader from "../../components/SectionHeader.js"
import { users } from "../../data/users.js";

export default class AddressesTab{
    container = document.createElement("div");
    addresses = [];
    constructor(){
        this.addresses = users[0].addresses;
        console.log(this.addresses)
        this.container.classList.add("container")
        
        this.container.innerHTML = /*html*/`
            <div class="row">

                <div class="col-12 col-md-6 mx-auto">

                    ${new SectionHeader("Adicionar novo endereço", false, ["p-0"], false, true).getHtmlElement().outerHTML}
                    
                    ${this.#getFormHtml()}
                </div>
            </div>

            <div id="alert_address" class="mt-5 alert alert-success alert-dismissible fade" role="alert">
                <strong>Cadastrado com sucesso!</strong>
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>
        `;

    }

    #getFormHtml(){
        return /*html*/`
            <div class="form_add__address row mt-3">
                        <div class="mb-3 col-12 col-sm-6">
                            <label for="cep_input" class="form-label">CEP</label>
                            <input type="text" mask="99999-999" class="masked form-control" id="cep_input">
                        </div>
                        <div class="mb-3 col-12 col-sm-6 align-content-baseline mt-1">
                            <label for="main_input" class="form-label d-flex">
                                Principal? 
                                <input type="checkbox" id="main_input" class="form-check ms-3">
                            </label>
                        </div>

                        <div class="mb-3 col-5">
                            <label for="neighborhood_input" class="form-label">Bairro</label>
                            <input type="text" disabled class="form-control" id="neighborhood_input">
                        </div>
                        <div class="mb-3 col-5">
                            <label for="city_input" class="form-label">Cidade</label>
                            <input type="text" disabled class="form-control" id="city_input">
                        </div>
                        <div class="mb-3 col-2">
                            <label for="state_input" class="form-label">UF</label>
                            <input type="text" disabled class="form-control" id="state_input">
                        </div>

                        <div class="mb-3 col-12 ">
                            <label for="address_input" class="form-label">Logradouro</label>
                            <input type="text" disabled class="form-control" id="address_input">
                        </div>

                        <div class="mb-3 col-4">
                            <label for="number_input" class="form-label">Número</label>
                            <input type="text" class="form-control" id="number_input">
                            <br>
                            <span>
                                <label for="no_number_input" class="form-label d-flex">
                                    <input type="checkbox" id="no_number_input" class="form-check me-3">
                                    Sem número
                                </label>
                            </span>
                        </div>
                        <div class="mb-3 col-8">
                            <label for="complement_input" class="form-label">Complemento</label>
                            <input type="text" class="form-control" id="complement_input">
                            <br>
                            <span>
                                <label for="no_complement_input" class="form-label d-flex">
                                    <input type="checkbox" id="no_complement_input" class="form-check me-3">
                                    Sem complemento
                                </label>
                            </span>
                        </div>
                    </div>
                    <button class="button button-sm btn-orange" id="save_address__btn">Salvar</button>
                </div>

                
        ` ;
    }

    getHtml(){
        return this.container.outerHTML;
    }

    eventListeners(){
        const cep_input = () => document.getElementById("cep_input");

        cep_input().addEventListener("input", ev => {
            const normalizedCep = cep_input().value.replace("-", "");
            if(normalizedCep.length < 8){
                return;
            }
            let data = {};
            this.getAddressInfo(normalizedCep).then(r => {
                data = r;
                console.log(r)
                 this.#updateAddressDataInputs(r);
            }).catch(e => alert(e))
        })


        const noNumberAddress = () => document.getElementById("no_number_input");
        const numberAddress = () => document.getElementById("number_input");
        const noComplementAddress = () => document.getElementById("no_complement_input");
        const complementAddress = () => document.getElementById("complement_input");

        noNumberAddress().addEventListener("change", ev => {
            const isChecked = (ev.target.checked)
            
            if(isChecked){
                numberAddress().setAttribute("disabled", true);
            }else{
                numberAddress().removeAttribute("disabled");
            }
        })
        noComplementAddress().addEventListener("change", ev => {
            const isChecked = (ev.target.checked)
            
            if(isChecked){
                complementAddress().setAttribute("disabled", true);
            }else{
                complementAddress().removeAttribute("disabled");
            }
        })


        const saveAddressBtn = () => document.getElementById("save_address__btn");
        saveAddressBtn().addEventListener("mouseup", ev => {
            if(cep_input().value === null && cep_input().value.length === 0){
                console.log("cep vazio");
                return;
            }
            if(cep_input().value.length !== 9){
                console.log("cep incorreto");
                return;
            }
            if(!numberAddress().value || numberAddress().value === null || numberAddress().value.length === 0){
                if(!noNumberAddress().checked){
                    console.log("numero vazio");
                    return;
                }
            }
            if(!complementAddress().value && complementAddress().value === null || complementAddress().value.length === 0){
                if(!noComplementAddress().checked){
                    console.log("complemento vazio");
                    return;
                }
            }

            // SUCCESS
            saveAddressBtn().classList.remove("btn-orange");
            saveAddressBtn().style.color = "green";
            saveAddressBtn().innerText = "Sucesso";
            
            saveAddressBtn().classList.add("btn-orange");

            saveAddressBtn().style.removeProperty("color");
            saveAddressBtn().innerText = "Salvar";
            this.#updateAddressDataInputs();

            cep_input().value = "";
            numberAddress().value = "";
            complementAddress().value = "";

            const alert = document.getElementById("alert_address");
            alert.classList.add("show"); 
            setTimeout(() => {
                alert.classList.remove("show")
            }, 5000);
            console.log("success")
        })
    }

    #updateAddressDataInputs(data=null){
        const address = document.getElementById("address_input");
        const neighborhood = document.getElementById("neighborhood_input");
        const city = document.getElementById("city_input");
        const state = document.getElementById("state_input");

        address.value = (data !== null) ? data.logradouro : "";
        neighborhood.value = (data !== null) ? data.bairro : "";
        city.value = (data !== null) ? data.localidade : "";
        state.value = (data !== null) ? data.uf : "";
    }
    
    async getAddressInfo(cep){
        const options = {
            method: "GET"
        };

        const url = `https://viacep.com.br/ws/${cep}/json/`;

        const req = await fetch(url, {method: "GET"});

        if(req.status === 200){
            let data = await req.json(); 
            return data;
        }else{
            throw "Invalid CEP";
        }
    }
}