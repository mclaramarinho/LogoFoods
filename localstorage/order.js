import { createStorage, deleteStorage, getParsedStorage, getStorage, setStorageData } from "./localStorage.js";

const STORAGE_NAME = "order";

export default class Order{
    id = 0;
    constructor(products=null, summary=null, shippingData=null, paymentMethodData=null){
        const params = [products, summary, shippingData, paymentMethodData];

        if(params[0] !== null && params[1] !== null && params[2] !== null){
            this.id = Math.floor(Math.random()*999999);
            
            const data = this.#buildData(products, summary, shippingData, paymentMethodData);
    
            createStorage(STORAGE_NAME, data);
        }

    }
    resetOrder(){
        deleteStorage(STORAGE_NAME);
    }

    updateOrder(products, summary, shippingData, paymentMethodData){
        const data = this.#buildData(products, summary, shippingData, paymentMethodData);
        setStorageData(STORAGE_NAME, data);
    }

    getOrder(){
        return getParsedStorage(STORAGE_NAME);
    }

    setPaymentMethod(paymentData){
        const data = this.getOrder();

        const newData = this.#buildData(data.products, data.summary, data.shippingData, paymentData);

        setStorageData(STORAGE_NAME, newData);
    }

    #buildData(products, summary, shippingData, paymentMethodData=null){
        return {
            id: this.id,
            products: products, // array
            summary: summary, // obj: subtotal, total, discount price
            shippingData: shippingData, // obj: cep, price, days estimate
            paymentMethodData: paymentMethodData // PaymentMethod || NULL
        };
    }

    
}