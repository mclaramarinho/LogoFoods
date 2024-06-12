
export class User{
    personalInfo = null;

    addresses = []
    paymentMethods = [];
    favoriteProducts = []

    constructor(fName, lname, birthdate, cpf){
        try{
            this.personalInfo = new PersonalInfo(fName, lname, birthdate, cpf);
        }catch(err){
            throw err;
        }
    }

    addFavoriteProduct(id){
        this.favoriteProducts.push(id);
    }

    removeFavoriteProduct(id){
        this.favoriteProducts.forEach((p, index) => {
            if(p === id){
                this.favoriteProducts.splice(index, 1);
                return;
            }
        })
    }

    addAddress(cep, number, complement,  instructions, main=false){
        if(this.addresses.length === 0 && !main){
            main = true;
        }
        try{
            const address= new Address(cep, number, complement,  instructions, main);
            this.addresses.push(address);
        }catch(err){
            throw err;
        }
    }

    removeAddress(cep, number, complement){
        this.addresses.forEach((a, index) => {
            if(a.cep === cep && a.number === number && a.complement === complement){
                this.addresses.splice(index, 1);
                return;
            }
        })
    }

    addPaymentMethod(type, cardNumber, expiringDate, cvv, name, cpf){
        try {
            this.paymentMethods.push(new PaymentMethod(type.toUpperCase(), cardNumber, expiringDate, cvv, name, cpf));
        } catch (error) {
            throw error;
        }
    }

    removePaymentMethod(type, cardNumber, expiringDate, cpf){
        this.paymentMethods.forEach((p, index) => {
            if(p.type === type && p.cardNumber === cardNumber
                && p.expiringDate === expiringDate 
                && p.owner.cpf === cpf
            ){
                this.paymentMethods.splice(index, 1);
                return;
            }
        })
    }
}

class PersonalInfo{
    name =  {
        first:  "",
        last:  ""
    };
    birthdate =  new Date();
    cpf =  "";

    constructor(fName, lName, birthdate, cpf){
        this.cpf = cpf;

        this.#validateCPF().then(r => {
            if(r){
                this.name.first = fName.toUpperCase();
                this.name.last = lName.toUpperCase();
                
                if(birthdate >= new Date()){
                    throw "Invalid BirthDate";
                }
                
                this.birthdate = birthdate;
            }else{
                throw "Invalid CPF";
            }
        }).catch(e => {throw e});
    }


    async #validateCPF(){
        const url = `https://api.invertexto.com/v1/validator?token=8132%7CNE3Nac8RNoun4q63ej9OhznQUB4hKrUF&value=${this.cpf}&type=cpf`;

        const opt = {
            method: "GET",
        };

        try{
            // const req = await fetch(url, opt);
            // if(req.status === 200){
            //     const res = await req.json();
            //     if(res["valid"]){
                    return true;
            //     }else{
            //         return false;
            //     }
            // }else{
            //     throw "Unexpected API error"
            // }
        }catch(err){
            return false
            // throw "Unexpected API error"
        }
        

    }
}

class Address{
    main = true; 
    number = null;
    complement = null;
    cep = null;
    deliveryInstructions = null;

    data = null;

    async getAddressInfo(cep){
        const options = {
            method: "GET"
        };

        const url = `https://viacep.com.br/ws/${this.cep}/json/`;

        const req = await fetch(url, options);

        if(req.status === 200){
            let data = await req.json(); 
            return data;
        }else{
            throw "Invalid CEP";
        }
    }

    constructor(cep, number, complement, instructions, main=false){
        this.cep = cep;
        this.number = number;
        this.complement = complement.toUpperCase();
        this.deliveryInstructions = instructions.toUpperCase();
        this.main = main;
    }


    #setValues(data){
        console.log(data);
        this.data=data;
    }


    

    async getAddressInfo(){
        
        const options = {
            method: "GET"
        };

        const url = `https://viacep.com.br/ws/${this.cep}/json/`;

        const req = await fetch(url, options);
        
        if(req.status === 200){
            let data = await req.json(); 
            this.data = data;

        }else{
            throw "Invalid CEP";
        }
                
    }
}

class PaymentMethod{
    main =  true;
    isValid =  true;
    type =  ""; 
    cardNumber =  "";
    brand =  "";
    expiringDate =  "";
    owner =  {
        name:  "",
        cpf:  ""
    };
    cvv = "";

    constructor(type, cardNumber, expiringDate, cvv, name, cpf){
        
        try {
            this.validateCardOnCreate(expiringDate, type, cvv);
        } catch (error) {
            throw error;
        }

        this.expiringDate = expiringDate;
        this.type = type;
        this.brand = "MASTERCARD"
        this.cvv = cvv;
        this.cardNumber = cardNumber;
        this.owner.name = name;
        this.owner.cpf = cpf;
    }

    validateCardOnCreate(expiringDate, type, cvv){
        const [month, year] = expiringDate.split("/");
        const formattedYear = new Date().getFullYear().toString().slice(0, 2) + year;
        
        const [intMonth, intYear] = [parseInt(month)-1, parseInt(formattedYear)];

        if(intYear >= new Date().getFullYear()){
            if(intMonth < new Date().getMonth()){
                throw "Invalid credit card";
            }
        }else{
            throw "Invalid credit card";
        }

        if(type !== "C" && type !== "D"){
            throw "Invalid type of credit card";
        }

        if(cvv.toString().length > 4 || cvv.toString().length < 3){
            throw "Invalid cvv!";
        }

        return "valid"
    }


    validateCard(){
        const [month, year] = this.expiringDate.split("/");
        const formattedYear = new Date().getFullYear().toString().slice(0, 2) + year;
        
        const [intMonth, intYear] = [parseInt(month)-1, parseInt(formattedYear)];

        if(intYear >= new Date().getFullYear()){
            if(intMonth < new Date().getMonth()){
                return false;
            }
        }else{
            return false;
        }

        return true;

    }

    validateCVV(cvv){
        if(cvv === this.cvv){
            return true;
        }
        return false;
    }
}


export let users = [
    new User("CLARA", "marinho", new Date().setFullYear(2000, 11, 10), "70185974473")
]

users[0].addAddress("51021120", 764, "ap 201", "", false);
await users[0].addresses[0].getAddressInfo();


users[0].addAddress("51021120", 267, "ap 301", "", false);
await users[0].addresses[1].getAddressInfo();
users[0].addPaymentMethod("c", "5555 0123 4567 8901", "12/32", 123, "MARIA C M BARRETO", "70185974473");