export default class Section{
    main = document.getElementById("main");
    section = document.createElement("section");
    
    constructor(elementsToAppend = [], isStartSection=false, id=null){
        
        if(isStartSection){
            this.section.style.marginTop = "3vh";
            this.section.style.marginBottom = "10vh";
            this.section.innerHTML = `
                <a class="first_time__button" href="?register">Primeira vez aqui?</a>

                <h1 class="start_section__header">OLÁ, BEM VINDO AO <span>LogoFoods</span>!</h1>

                <p class="start_section__message">Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Varius sed pharetra dictum neque massa congue</p>

                <div class="start_section_btnContainer">
                    <a href="?about" class="button btn-orange">Veja o menu</a>
                    <a href="?catalog" class="button btn-orange outline">Sobre nós</a>
                </div>
            `
        }else{
            // this.section.classList.add("section_header__container");
            elementsToAppend.map(el => {
                this.section.append(el);    
            })
        }

        this.main.append(this.section);
    }
}