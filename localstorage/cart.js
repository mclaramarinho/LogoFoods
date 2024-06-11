const STORAGE_NAME = "cart";

export default class Cart{

    constructor(){
        this.#createCartLocalStorage();
    }

    updateCart(prodId, amount){
        const prevData = this.getParsedCartData();

        console.log(prevData)
        const existsInCart = prevData.find(({ id }) => id === prodId);
        if(existsInCart !== undefined){
            // replace data
            const indexToReplace = prevData.findIndex(e => e.id === prodId);

            const newData = {
                id: prodId,
                amount: amount
            };

            prevData.splice(indexToReplace, 1, newData);
        }else{

            prevData.push({
                id: prodId,
                amount: amount
            });
        
        }


        this.#setCartLocalStorageData(prevData);
    }
    
    #createCartLocalStorage(){
        const exists = this.#getCartLocalStorageData();
        if(exists===null){
            window.localStorage.setItem(STORAGE_NAME, JSON.stringify([]));
        }
    }

    #getCartLocalStorageData(){
        return window.localStorage.getItem(STORAGE_NAME);
    }

    getParsedCartData(){
        return JSON.parse(window.localStorage.getItem(STORAGE_NAME));
    }

    #setCartLocalStorageData(data){
        window.localStorage.setItem(STORAGE_NAME, JSON.stringify(data));
    }


}

