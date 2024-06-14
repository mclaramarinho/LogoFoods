import AddressesTab from "./profileTabs/AddressesTab.js";
import InfoTab from "./profileTabs/InfoTab.js";
import PaymentMethodsTab from "./profileTabs/PaymentMethodsTab.js";

export default class ProfilePage{
    main = document.getElementById("main");
    container = document.createElement("div");

    tabs = [
        {
            name: "payments",
            title: "Meios de pagamento",
            toggle: "payments__container",
            href: "?profile&section=payments",
            disabled: false,
            component: new PaymentMethodsTab()
        },
        {
            name: "address",
            title: "Endereços",
            toggle: "address__container",
            href: "?profile&section=address",
            disabled: false,
            component: new AddressesTab()
        },
        // {
        //     name: "info",
        //     title: "Informações",
        //     toggle: "info__container",
        //     href: "?profile&section=info",
        //     disabled: false,
        //     component: new InfoTab()
        // },
    ]

    constructor(){
        this.container.innerHTML = /*html*/`
            ${this.#getTabsHtml()}

            <div class="tabs_container container-fluid bg-white">
                ${this.#getTabsBodyHtml()}
            </div>
            
            <button class="btn btn-lg btn-secondary mt-4" id="logout__btn" data-bs-toggle="modal" data-bs-target="#exampleModal">
                <i class="bi bi-box-arrow-left"></i> Sair
            </button>

        `;

        this.main.append(this.container);

        this.#tabsEventListener()
        this.tabs.map(t => t.component.eventListeners())
    }

    #getTabsBodyHtml(){
        return this.tabs.map((tab, i) => {
            return /*html*/`
                <div class="row py-5 px-3 tab_body ${i !== 0 ? "d-none" : ""} " id="${tab.toggle}">
                    ${tab.component.getHtml()}
                </div>
            `
        }).join('');
    }
    #getTabsHtml(){
        return /*html*/`
            <ul class="nav nav-pills nav-fill">
                ${this.tabs.map((tab, i) => {
                    return /*html*/`
                        <li class="nav-item">
                            <a data-lf-toggle="${tab.toggle}" class="nav-link cursor-pointer ${i === 0 && !tab.disabled ? "active" : ""} ${tab.disabled ? "disabled" : ""} profile_nav__item">${tab.title}</a>
                        </li>
                    `
                }).join("")}
            </ul>
        `;
    }

    #tabsEventListener(){
        const tabs = document.querySelectorAll(".profile_nav__item");

        tabs.forEach(el => {
            el.addEventListener("mouseup", ev => {
                const target = ev.target;
                
                if(!el.classList.contains("active")){
                    tabs.forEach(el => el.classList.remove("active"));

                    el.classList.add("active");

                    const toggleEl = document.getElementById(el.getAttribute("data-lf-toggle"));

                    const tabBodyEls = document.querySelectorAll(".tab_body");
                    
                    tabBodyEls.forEach(el => el.classList.add('d-none'));


                    toggleEl.classList.remove("d-none");
                }
            })
        })
    }


}