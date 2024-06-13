import SectionHeader from "../components/SectionHeader.js";
import { users } from "../data/users.js";
import { auth } from "../index.js";

export default class LoginPage{
    main = document.getElementById("main");
    container = document.createElement("div");

    credentials= {
        email: "",
        password: "",
        authorized: false
    }

    redirectTo = null

    constructor(redirectTo=null){
        this.redirectTo = redirectTo === null ? "/" : redirectTo;
        if(auth.isSomeoneSignedIn()){
            window.location.href = this.redirectTo;
        }


        this.container.classList.add("login_page__container", "row");
        // this.container.classList.add("bg-white");


        this.container.innerHTML = /*html*/`
            <div class="bg-white col-10 col-sm-7 m-auto col-md-5 col-lg-3 py-5">
                ${new SectionHeader("LOGIN", false, ["text-center"], false, true).getHtmlElement().outerHTML}

                <div class="row">
                    <div class="col-10 col-md-8 mx-auto">
                        <div class="mb-5">
                            <label class="form-label" for="email_input__login">Email</label>
                            <input class="form-control" type="text" id="email_input__login">
                        </div>
                        <div class="mb-3">
                            <label class="form-label" for="pswd_input__login">Senha</label>
                            <input class="form-control" type="password" id="pswd_input__login">
                        </div>
                    </div>
                </div>
                <div class="col-12 mt-3 text-center">
                    <span class="text-danger fw-bold d-none" id="login_error__msg">Erro</span>
                    <br>
                    <button class="button button-sm btn-orange" id="signin_btn__login">Entrar</button>
                    <br>
                    <a href="?register" class="mt-5 btn btn-link font-black" id="register_btn__login">Não tem uma conta? <span class="font-italic">Criar agora.</span></a>
                </div>
            </div>
        `;

        this.main.append(this.container);
        this.#buttonEventListener()
    }


    #buttonEventListener(){
        const button = document.getElementById("signin_btn__login");
        const loginErrorMsg = document.getElementById("login_error__msg");
        const emailValue = () => document.getElementById("email_input__login").value;
        const pswdValue = () => document.getElementById("pswd_input__login").value;

        const userExists = (email) => users.filter(u => u.personalInfo.credentials.email === email).length > 0;

        const showErrorMsg = (msg) => {
            loginErrorMsg.innerText = msg;
            loginErrorMsg.classList.remove("d-none");
        }

        const authenticate = (e, p) => {
            const user = users.filter(u => u.personalInfo.credentials.email === e)[0];

            console.log(user.personalInfo.credentials)
            if(user.personalInfo.credentials.password === p){
                return "OK";
            }else{
                return "Senha incorreta."
            }
        }

        button.addEventListener("mouseup", ev => {
            const isEmailEmpty = emailValue().length === 0;
            const isPswdEmpty = pswdValue().length === 0;
            
            loginErrorMsg.classList.add("d-none");

            if(isEmailEmpty){
                return showErrorMsg("O campo email não pode estar vazio.");
            }

            if(isPswdEmpty){
                return showErrorMsg("A campo senha não pode estar vazio.");
            }
            if(!userExists(emailValue())){
                console.log("n existe")
                return showErrorMsg("Esse usuário não existe.");
            }

            console.log(authenticate(emailValue(), pswdValue()))
            if(authenticate(emailValue(), pswdValue()) !== "OK"){
                return showErrorMsg("Senha incorreta.");
            }

            auth.login(emailValue(), pswdValue());
            window.location.href = this.redirectTo;
        })
    }
}