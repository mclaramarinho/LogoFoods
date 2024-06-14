export default class ProfilePage{
    main = document.getElementById("main");
    container = document.createElement("div");

    tabs = [
        {
            name: "info",
            title: "Informações",
            toggle: "info__container",
            href: "?profile&section=info",
            disabled: false,
        },
        {
            name: "address",
            title: "Endereços",
            toggle: "address__container",
            href: "?profile&section=address",
            disabled: false,
        },
        {
            name: "payments",
            title: "Meios de pagamento",
            toggle: "payments__container",
            href: "?profile&section=payments",
            disabled: false,
        }
    ]

    constructor(){
        this.container.innerHTML = /*html*/`
            ${this.#getTabsHtml()}

            <div class="tabs_container container bg-white">
                ${this.#getTabsBodyHtml()}
            </div>  
        `;

        this.main.append(this.container);

        this.#tabsEventListener()
    }

    #getTabsBodyHtml(){
        return this.tabs.map((tab, i) => {
            return /*html*/`
                <div class="row tab_body ${i !== 0 ? "d-none" : ""}" id="${tab.toggle}">
                    <h2>${tab.title}</h2>
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
                            <a data-lf-toggle="${tab.toggle}" class="nav-link cursor-pointer ${i === 0 ? "active" : ""} profile_nav__item">${tab.title}</a>
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