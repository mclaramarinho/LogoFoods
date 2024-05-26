export default class Section{
    main = document.getElementById("main");
    section = document.createElement("section");
    
    constructor(elementsToAppend = []){
        this.section.classList.add("section_header__container");

        elementsToAppend.map(el => {
            this.section.append(el);    
        })
        this.main.append(this.section);
    }
}