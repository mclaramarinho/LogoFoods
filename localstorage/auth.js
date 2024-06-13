const STORAGE_NAME = "auth";

import * as ls from "./localStorage.js"
import {users} from "../data/users.js"

export default class Auth{
    data = null
    constructor(){
        if(this.isSomeoneSignedIn()){
            this.data = ls.getParsedStorage(STORAGE_NAME);
        }
    }

    isSomeoneSignedIn(){
        const data = ls.getStorage(STORAGE_NAME);
        return data !== "undefined" && data !== null;
    }

    login(email, password){

        try {
            if(this.data === null){
                // allow
                const uList = users.filter(u => (u.personalInfo.credentials.email === email) && (u.personalInfo.credentials.password === password));

                console.log(uList[0]);
                if(uList.length > 0){
                    this.data = uList[0];
                    this.#storeCredentials();
                }else{
                    throw "Invalid credentials.";
                }
            }else{
                throw "Logout before loggin in.";
            }
        } catch (error) {
            throw error;
        }
    }

    logout(){
        this.data = null;
        ls.deleteStorage(STORAGE_NAME);
    }

    register(){
        // not now
    }

    #storeCredentials(){
        ls.createStorage(STORAGE_NAME, this.data);
    }

    getUserData(){
       return this.data; 
    }
}