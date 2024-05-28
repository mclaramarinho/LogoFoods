let carouselId = 0;
export default class Carousel {
    
    main = document.getElementById("main");

    carouselId = ++carouselId;

    container = document.createElement("div");
    prevBtn = document.createElement("i");
    slider = document.createElement("div");
    nextBtn = document.createElement("i");

    constructor(carouselItemsContent = [], additionalClasses=[], isCategoryCarousel=false){
        this.#createBaseElements(additionalClasses);

        carouselItemsContent.map(el => {
            const a = document.createElement("a");
            a.href = el.href;

            isCategoryCarousel ? a.classList.add("category_carousel__item")
                    : a.classList.add("carousel_item");

            a.innerHTML = isCategoryCarousel ? el.name 
                            : this.#getInnerHtmlForNormalCarousel(el);

            this.slider.append(a);
        })
        this.#mountElements();
        createCarouselEventListeners(); 
    }
    
    #createBaseElements(additionalClasses=[]){
        this.container.classList.add("carousel_container"); 
        additionalClasses.map(c => this.container.classList.add(c));

        this.prevBtn.classList.add("bi", "bi-chevron-compact-left", "carousel_button", "carousel_prev__button");
        this.slider.classList.add("carousel_slider");
        this.slider.id = `carousel_slider_${this.carouselId}`;
        this.nextBtn.classList.add("bi", "bi-chevron-compact-right", "carousel_button", "carousel_next__button");
    }

    #mountElements(){
        this.container.append(this.prevBtn);
        this.container.append(this.slider);
        this.container.append(this.nextBtn);
        this.main.append(this.container);
    }

    #getInnerHtmlForNormalCarousel(product){
        return `
            <img src="${product.imgSrc}" class="item_img">
            <div>
                <p class="item_price">R$${product.prodPrice}</p>
                <h3>${product.prodTitle}</h3>
                <p class="item_desc">${product.prodDesc}</p>
            </div>
        `;
    }
    #getInnerHtmlCategoryCarousel(product){
        return `
                <h3>${product.name}</h3>
        `;
    }

}

function createCarouselEventListeners(){
    const carousel_prev_btns = document.getElementsByClassName("carousel_prev__button") || [];
    const carousel_next_btns = document.getElementsByClassName("carousel_next__button") || [];

    for(let i = 0; i < carousel_next_btns.length; i++){
        carousel_next_btns.item(i).addEventListener("mouseup", e => {
            const slider = document.getElementById(`carousel_slider_${i+1}`);
            slider.scrollBy((slider.scrollWidth / 5), 0);
        })
    }

    for(let i = 0; i < carousel_prev_btns.length; i++){
        carousel_prev_btns.item(i).addEventListener("mouseup", e => {
            const slider = document.getElementById(`carousel_slider_${i+1}`);
            slider.scrollBy(-(slider.scrollWidth / 4), 0);
        })
    }
}