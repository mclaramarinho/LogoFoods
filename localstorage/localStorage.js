export function getStorage(storageName){
    return window.localStorage.getItem(storageName);
}

export function getParsedStorage(storageName){
    return JSON.parse(window.localStorage.getItem(storageName));
}

export function createStorage(storageName, data){
    const exists = getStorage(storageName);

    if(exists==="undefined" || exists === null){
        window.localStorage.setItem(storageName, JSON.stringify(data));
    }else{
        const prevData = getParsedStorage(storageName);
        window.localStorage.setItem(storageName, JSON.stringify(prevData));
    }

}


export function setStorageData(storageName, data){
    window.localStorage.setItem(storageName, JSON.stringify(data));
}

export function deleteStorage(storageName){
    window.localStorage.removeItem(storageName);
}