export default class SectionHeader{
    headerText = "HEADER TEXT";
    whiteText = "";
    redText = "";
    div = document.createElement("div");
    // h2 = document.createElement("h2");

    constructor(headerText = null, whiteBg=false, extraClasses=[], onlyColorWhite=false, onlyColorRed=false){
        if(headerText !== null){
            this.headerText = headerText.toUpperCase();


            const words = this.headerText.split(" ");
            this.div.classList.add("section_header__container");

            extraClasses.map(c => this.div.classList.add(c));

            whiteBg && this.div.classList.add("bg-white");

            if(words.length > 1 && !onlyColorRed && !onlyColorWhite){
                const wordCount = words.length;
                console.log(wordCount);
                for(let i = 0; i < Math.round((wordCount-1)/2); i++){
                    console.log(i);
                    this.whiteText += words[i] + " ";
                }
                for(let i = Math.round((wordCount-1)/2); i < wordCount; i++){
                    console.log(i);
                    this.redText += words[i] + " ";
                }
               
                this.div.innerHTML = `
                    <h2 class="font-white">${this.whiteText}<span class="font-red">${this.redText}</span></h2>
                `;
            }else{
                let color = "";
                if(onlyColorWhite) {
                    color="font-white";
                }
                else if(onlyColorRed) {
                    color="font-red"
                }
                else {
                    color="font-black"
                }
                this.div.innerHTML = `
                    <h2 class="${color}">${this.headerText}</h2>
                `;
            }

        }else{
            throw "Section header cannot be null!"
        }
    }

    getHtmlElement(){
        return this.div;
    }
}