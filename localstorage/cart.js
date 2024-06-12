import { createStorage, deleteStorage, getParsedStorage, getStorage, setStorageData } from "./localStorage.js";

const STORAGE_NAME = "cart";

export default class Cart{

    constructor(reset=false){
        if(reset){
            deleteStorage(STORAGE_NAME);
        }else{
            createStorage(STORAGE_NAME, []); 
        }
    }

    updateCart(prodId, amount){
        const prevData = getParsedStorage(STORAGE_NAME);

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

        setStorageData(STORAGE_NAME, prevData);
    }

    getCart(){
        try{
            return getParsedStorage(STORAGE_NAME);
        }catch(err){
            return []
        }
    }
}

