import SectionHeader from "../components/SectionHeader.js";
import { auth } from "../index.js"

export default class RegisterPage{
    main = document.getElementById("main");
    container = document.createElement("div");

    fields = {
        name: {
            first: "",
            last: ""
        },
        birthdate: new Date(),
        cpf: "",
        creds: {
            email: "",
            password: "",
            confirmPassword: ""
        }
    }

    redirectTo = null;

    constructor(redirectTo=null){
        this.redirectTo = redirectTo === null ? "/" : redirectTo;

        if(auth.isSomeoneSignedIn()){
            window.location.href = "/";
            return;
        }

        this.container.classList.add("auth_page_container", "row");


        this.container.innerHTML = /*html*/`
              <div class="col-12 m-auto col-sm-10 col-md-8 auth_form bg-white p-4">
                ${new SectionHeader("Criar Conta", false, ["text-center"], false, true).getHtmlElement().outerHTML}
                <div class="row justify-content-between mt-5">
                    
                    <!-- primeiro e segundo nome + data nasc + cpf -->
                    <div class="col-12 col-md-6">

                        <div class="mb-3 row">
                            <div class="col-12 col-md-6">
                                <label class="form-label auth_form__label" for="fname_input__login">Primeiro Nome</label>
                                <input class="form-control auth_form__input" type="text" id="fname_input__login">
                            </div>
                            <div class="col-12 col-md-6">
                                <label class="form-label auth_form__label" for="lname_input__login">Último Nome</label>
                                <input class="form-control auth_form__input" type="text" id="lname_input__login">
                            </div>
                        </div>

                        <div class="mb-3">
                            <label for="birthdate_input__register" class="form-label auth_form__label">Data de nascimento</label>
                            <input type="date" class="form-control auth_form__input" id="birthdate_input__register">
                        </div>
                        <div class="mb-3">
                            <label for="cpf_input__register" class="form-label auth_form__label">CPF</label>
                            <input type="text" mask="999.999.999-99"
                                placeholder="XXX.XXX.XXX-XX"
                                class="form-control auth_form__input masked" id="cpf_input__register">
                        </div>
                    </div>
                    <!-- email + senha + confirmar -->
                    <div class=" col-12 col-md-6">
                        <div class="mb-3">
                            <label for="email_input__register" class="form-label auth_form__label">Email</label>
                            <input type="email" class="form-control auth_form__input" id="email_input__register">
                        </div>
                        <div class="mb-3">
                            <label for="pswd_input__register" class="form-label auth_form__label">Senha</label>
                            <input type="password" class="form-control auth_form__input" id="pswd_input__register">
                        </div>
                        <div class="mb-3">
                            <label for="pswd_confirm_input__register" class="form-label auth_form__label">Confirmar Senha</label>
                            <input type="password" class="form-control auth_form__input" id="pswd_confirm_input__register">
                        </div>
                    </div>

                    
                    <div class="col-12 mt-3 text-center">
                        <span class="text-danger fw-bold d-none" id="register_error__msg">Erro</span>
                        <br>
                        <button class="button button-sm btn-orange" id="register_btn__login">Criar</button>
                        <br>
                        <a href="?login${this.redirectTo === "/" ? "" : `&${this.redirectTo}`}" 
                                class="mt-3 btn btn-link font-black text-decoration-none font-12" id="">
                            Já tem uma conta? <span class="font-italic fw-bold text-decoration-underline">Entrar agora.</span>
                        </a>
                    </div>


                </div>
              </div>
        `;

        this.main.append(this.container);

        this.#registerEventListener();
        
    }


    #registerEventListener(){
        const button = document.getElementById("register_btn__login");
    }
}