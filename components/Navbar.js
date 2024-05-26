export default class Navbar{
    body = document.querySelector("body");
    navHtml = `
    <nav id="navbar">
        <img src="https://th.bing.com/th/id/OIP.tAJh2aYLEUHKCk-gQGt0kwHaF9?rs=1&pid=ImgDetMain" alt="">
        <form method="get">
            <div id="searchBar" class="searchBar_container">
                <input type="text" name="productName" placeholder="Pesquisar por nome" class="searchBar_input" />
                <button type="submit" href="" class="searchBar_button">
                    <i class="bi bi-search searchBar_button__icon"></i>
                </button>
            </div>
        </form>


        <ul class="navbar_list navbar_textbuttons__list">
            <li class="navbar_list__item nav_text__button">
                <a href="">Início</a>
            </li>
            
            <li class="navbar_list__item nav_text__button">
                <a href="">Catálogo</a>
            </li>
        </ul>


        <ul class="navbar_list">
            <li class="navbar_list__item navbar_icon__btn">
                <a href="">
                    <i class="bi bi-cart2"></i>
                </a>
            </li>
            <li class="navbar_list__item navbar_icon__btn">
                <a href="">
                    <i class="bi bi-person"></i>
                </a>
            </li>
            <li id="menu_icon__button" class="navbar_list__item navbar_icon__btn cursor-pointer">
                <i class="bi bi-list"></i>
            </li>
        </ul>

        <div class="navbar_dropdown__container hide" id="nav_dropdown">
            <ul>
                <li class="navbar_dropdown__button">
                    <a href="">Home</a>
                </li>
                
                <li class="navbar_dropdown__button">
                    <a href="">Catálogo</a>
                </li>

                <li class="navbar_dropdown__button">
                    <a href="">Perfil</a>
                </li>
            </ul>
        </div>
    </nav>`;

    constructor(){
        const nav = document.createElement("nav");
        nav.innerHTML = this.navHtml;
        this.body.append(nav);

        this.menuIconClickEvent();
    }

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
    }


}
