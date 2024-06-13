import { auth } from "../index.js";
import Auth from "../localstorage/auth.js";

export default class Navbar{
    body = document.querySelector("body");

    navImage = {
        src: "./assets/LogoFoodsLogo.png",
        alt: "",
        href: "/"
    }

    searchBarValue = null;

    textButtons = [
        {
            text: "Início",
            href: "/",
            id: "start",
            collapse: true,
            authorize: false
        },
        {
            text: "Catálogo",
            href: "?catalog",
            id: "catalog",
            collapse: true,
            authorize: false
        }
    ];

    iconButtons = [
        {
            icon: "bi-cart2",
            id: "",
            extraClasses: [],
            isIconOnly: false,
            collapse: false,
            title: "Carrinho",
            authorize: false,
            
            a: {
                appendText: "",
                prependText: "",
                extraClasses: [],
                href: "?cart",
            }
        },
        {
            icon: "bi-person-circle",
            id: "",
            extraClasses: [],
            isIconOnly: false,
            collapse: true,
            title: "Perfil",
            authorize: true,
            a: {
                appendText: "",
                prependText: "",
                extraClasses: ["avatar_btn"],
                href: "?profile",
            }
        },
        {
            icon: "bi-box-arrow-in-right",
            id: "",
            extraClasses: [],
            isIconOnly: false,
            collapse: true,
            title: "Login",
            authorize: false,
            a: {
                appendText: "Entrar",
                prependText: "",
                extraClasses: ["avatar_btn"],
                href: "?login",
            }
        },
        {
            icon: "bi-list",
            id: "menu_icon__button",
            extraClasses: ["cursor-pointer"],
            isIconOnly: true,
            collapse: false,
            title: "",
            authorize: false,
            a: {
                prependText: "",
                appendText: "",
                extraClasses: [],
                href: "",
            }
        }        
    ];


    navHtml = `
    <div id="navbar">
        <img id="nav_img" src="${this.navImage.src}" class="cursor-pointer" alt="${this.navImage.alt}">

        ${this.getSearchBarElement()}

        <ul class="navbar_list navbar_textbuttons__list" id="navbar_textbuttons__list">
            <!-- items added dynamically - based on this.textButtons -->
        </ul>



        <ul class="navbar_list" id="navbar_iconbuttons_list">
            <!-- items added dynamically - based on this.iconButtons -->
        </ul>


        
        <div class="navbar_dropdown__container hide" id="nav_dropdown">
            <ul id="nav_dropdown_list">
                <!-- items added dynamically - based on this.dropdownMenuButtons -->
            </ul>
        </div>
    </div>`;

    constructor(){

        const nav = document.createElement("nav");
        nav.innerHTML = this.navHtml;
        this.body.append(nav);

        const navbar_textbuttons__list = document.getElementById("navbar_textbuttons__list");
        const navbar_iconbuttons_list = document.getElementById("navbar_iconbuttons_list");
        const nav_dropdown_list = document.getElementById("nav_dropdown_list");

        const isAuthenticated = auth.isSomeoneSignedIn();
        Promise.all([this.getTextButtonElements(isAuthenticated),
                         this.getIconButtonElements(isAuthenticated), 
                         this.getDropDownMenuElements(isAuthenticated)])
        .then(values => {
            navbar_textbuttons__list.innerHTML = values[0];
            navbar_iconbuttons_list.innerHTML = values[1];
            nav_dropdown_list.innerHTML = values[2];
            
            this.navImageClickEvent();

            
            this.menuIconClickEvent();

    
            this.shouldHighlightTextBtn()

            this.setSearchBarValue();

        });

        
    }
    
    navImageClickEvent(){
        document.getElementById("nav_img").addEventListener("mouseup", ev => window.location.href = this.navImage.href)
    };
    menuIconClickEvent(){
        const dropdownMenu = document.getElementById("nav_dropdown");

        document.getElementsByTagName("html")[0].addEventListener("mouseup", e => {
            const targetEl = e.target.localName; // "i"
            const parentEl = e.target.parentElement; // li #menu_icon__button
            if(targetEl == "i" && parentEl.localName == "li" && parentEl.id == "menu_icon__button"){
                dropdownMenu.classList.toggle("hide");
            }else{
                !dropdownMenu.classList.contains("hide") && dropdownMenu.classList.add("hide");   
            }
        })
    };

    shouldHighlightTextBtn(){
        const urlPath = window.location.search;
        
        this.resetBtnHighlight();

        let btnToHighlight = document.getElementById("start_btn__container");

        if(urlPath.includes("catalog")){
            btnToHighlight = document.getElementById("catalog_btn__container");
        }

        btnToHighlight.style.fontWeight = "bolder";
    };

    resetBtnHighlight(){
        const textButtons = document.querySelectorAll(".nav_text__button");
        
        textButtons.forEach(el => {el.style.fontWeight = "regular"; el.classList.remove("font-orange")});
    };

    getSearchBarElement(){
        const params = window.location.search;
        let navSearchBarValue = null;
        if(params.includes("productName")){
            navSearchBarValue = params.split("productName=")[1];
            if(navSearchBarValue.includes("&")){
                navSearchBarValue = navSearchBarValue.split("&")[0];
            }
        }
        this.searchBarValue = navSearchBarValue;
        return `
            <form method="get">
                <input type="hidden" name="catalog" value="" />
                <div id="searchBar" class="searchBar_container">
                    <input type="text" name="productName" placeholder="Pesquisar por nome" id="searchBar_input" class="searchBar_input" value="${this.searchBarValue === null ? "" : this.searchBarValue}" />
                    <button type="submit" href="" class="searchBar_button">
                        <i class="bi bi-search searchBar_button__icon"></i>
                    </button>
                </div>
            </form>
        `;
    }

    setSearchBarValue(){
        const searchInput = document.getElementById("searchBar_input");
        const value = this.searchBarValue === null ? "" : this.searchBarValue;
        searchInput.setAttribute("value", value)
    }

    async getTextButtonElements(authed){
        return new Promise(res => {
            let buttonHtml = "";
            this.textButtons.forEach(btn => {
                if(authed || authed === btn.authorize){
                    buttonHtml += `
                        <li id="${btn.id}_btn__container" class="navbar_list__item nav_text__button">
                            <a href="${btn.href}">${btn.text}</a>
                        </li>
                    `;
                }
            })
    
            res(buttonHtml);
        })
    };

    async getIconButtonElements(authed){
        return new Promise( res => {
            let iconBtn = "";

            this.iconButtons.forEach(btn => {
                if(authed || authed === btn.authorize){
                    if(btn.isIconOnly){
                        iconBtn += `
                            <li id="${btn.id}" class="navbar_list__item navbar_icon__btn ${btn.extraClasses.join(" ")}">
                                <i class="bi ${btn.icon}"></i>
                            </li>
                        `
                    }else{
                        let appendText = btn.a.appendText;
                        if(btn.title === "Perfil" && authed){
                            const username = auth.getUserData().personalInfo.name;
                            appendText = username.first + " " + username.last;
                        }
                        if(btn.title === "Login" && authed){
                            return;
                        }
                        iconBtn += `
                            <li class="navbar_list__item navbar_icon__btn ${btn.extraClasses.join(" ")}" id="${btn.id}">
                                <a href="${btn.a.href}" class="${btn.a.extraClasses.join(" ")}">
                                    ${btn.a.prependText}
                                    <i class="bi ${btn.icon}"></i>
                                    ${appendText}
                                </a>
                            </li>
                        `
                    }
                }
            })

            res(iconBtn);
        })
    };

    async getDropDownMenuElements(authed){
        return new Promise( res => {
            let buttonHtml = "";
            
            this.iconButtons.map(btn => {
                if(btn.title === "Login" && authed){
                    return;
                }
                if(btn.collapse && (authed || authed === btn.authorize)){
                        buttonHtml += `
                            <li id="${btn.id}" class="navbar_dropdown__button">
                                <a class="${btn.a.extraClasses.join(" ")}" href="${btn.a.href}">${btn.title}</a>
                            </li>
                        `;
                }
            });

            this.textButtons.map(btn => {
                
                if(btn.collapse){
                    buttonHtml += `
                        <li id="${btn.id}" class="navbar_dropdown__button">
                            <a href="${btn.href}">${btn.text}</a>
                        </li>
                    `;
                }
            });

            res(buttonHtml);
        })
    };

}
