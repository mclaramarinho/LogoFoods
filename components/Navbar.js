export default class Navbar{
    body = document.querySelector("body");

    navImage = {
        src: "./assets/LogoFoodsLogo.png",
        alt: "",
        href: "/"
    }

    textButtons = [
        {
            text: "Início",
            href: "/",
            id: "start"
        },
        {
            text: "Catálogo",
            href: "?catalog",
            id: "catalog"
        }
    ];

    iconButtons = [
        {
            icon: "bi-cart2",
            id: "",
            extraClasses: [],
            isIconOnly: false,

            a: {
                appendText: "",
                prependText: "",
                extraClasses: [],
                href: "",
            }
        },
        {
            icon: "bi-person-circle",
            id: "",
            extraClasses: [],
            isIconOnly: false,

            a: {
                appendText: "Fulaninho de tal",
                prependText: "",
                extraClasses: ["avatar_btn"],
                href: "",
            }
        },
        {
            icon: "bi-list",
            id: "menu_icon__button",
            extraClasses: ["cursor-pointer"],
            isIconOnly: true,
            a: {
                prependText: "",
                appendText: "",
                extraClasses: [],
                href: "",
            }
        }        
    ];

    dropdownMenuButtons = [
        {
            extraClasses: [],
            id: "",
            href: "/",
            text: "Home",
            a: {
                extraClasses: []
            }
        },
        {
            extraClasses: [],
            id: "",
            href: "catalog",
            text: "Catálogo",
            a: {
                extraClasses: []
            }
        },
        {
            extraClasses: [],
            id: "",
            href: "",
            text: "Perfil",
            a: {
                extraClasses: []
            }
        }
    ]

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

        Promise.all([this.getTextButtonElements(), this.getIconButtonElements(), this.getDropDownMenuElements()])
        .then(values => {
            navbar_textbuttons__list.innerHTML = values[0];
            navbar_iconbuttons_list.innerHTML = values[1];
            nav_dropdown_list.innerHTML = values[2];
            
            this.navImageClickEvent();

            
            this.menuIconClickEvent();

    
            this.shouldHighlightTextBtn()
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
        const urlPath = window.location.pathname;
        
        this.resetBtnHighlight();

        let btnToHighlight = document.getElementById("start_btn__container");

        if(urlPath.includes("catalog")){
            btnToHighlight = document.getElementById("catalog_btn__container");
        }

        btnToHighlight.style.fontWeight = "bolder";
    };

    resetBtnHighlight(){
        const textButtons = document.querySelectorAll(".nav_text__button");
        textButtons.forEach(el => el.style.fontWeight = "regular");
    };

    getSearchBarElement(){
        return `
            <form method="get">
                <div id="searchBar" class="searchBar_container">
                    <input type="text" name="productName" placeholder="Pesquisar por nome" class="searchBar_input" />
                    <button type="submit" href="" class="searchBar_button">
                        <i class="bi bi-search searchBar_button__icon"></i>
                    </button>
                </div>
            </form>
        `;
    }

    async getTextButtonElements(){
        return new Promise(res => {

            let buttonHtml = "";
            
            this.textButtons.forEach(btn => {
                buttonHtml += `
                    <li id="${btn.id}_btn__container" class="navbar_list__item nav_text__button">
                        <a href="${btn.href}">${btn.text}</a>
                    </li>
                `
            })
    
            res(buttonHtml);
        })
    };

    async getIconButtonElements(){
        return new Promise( res => {
            let iconBtn = "";

            this.iconButtons.forEach(btn => {
                if(btn.isIconOnly){
                    iconBtn += `
                        <li id="${btn.id}" class="navbar_list__item navbar_icon__btn ${btn.extraClasses.join(" ")}">
                            <i class="bi ${btn.icon}"></i>
                        </li>
                    `
                }else{
                    iconBtn += `
                        <li class="navbar_list__item navbar_icon__btn ${btn.extraClasses.join(" ")}" id="${btn.id}">
                            <a href="${btn.a.href}" class="${btn.a.extraClasses.join(" ")}">
                                ${btn.a.prependText}
                                <i class="bi ${btn.icon}"></i>
                                ${btn.a.appendText}
                            </a>
                        </li>
                    `
                }

            })

            res(iconBtn);
        })
    };

    async getDropDownMenuElements(){
        return new Promise( res => {
            let buttonHtml = "";

            this.dropdownMenuButtons.forEach(btn => {
                buttonHtml += `
                    <li id="${btn.id}" class="navbar_dropdown__button ${btn.extraClasses.join(" ")}">
                        <a class="${btn.a.extraClasses.join(" ")}" href="${btn.href}">${btn.text}</a>
                    </li>
                `;
            })

            res(buttonHtml);
        })
    };

}
