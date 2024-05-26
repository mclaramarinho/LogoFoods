export default class SectionHeader{
    headerText = "HEADER TEXT";
    div = document.createElement("div");
    h2 = document.createElement("h2");

    constructor(headerText = null){
        if(headerText !== null){
            this.headerText = headerText;

            this.div.classList.add("section_header__container");
            this.h2.innerText = this.headerText;
            this.div.append(this.h2);
        }else{
            throw "Section header cannot be null!"
        }
    }

    getHtmlElement(){
        return this.div;
    }
}