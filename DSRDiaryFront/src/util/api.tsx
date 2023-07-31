async function get(endpoint: string | undefined) {
    
    return await (await fetch(`https://localhost:7177/${endpoint}`, 
            {
                headers: {"Content-Type": "application/json"}
            })).json();
}

async function post(endpoint?: string, data?: string) {
    return await (await fetch(`https://localhost:7177/${endpoint}`, 
            {
                method: "POST", 
                headers: {"Content-Type": "application/json"}, 
                body: data 
            } 
        )).json();
}

async function put(endpoint?: string, data?: string) {
    return await (await fetch(`https://localhost:7177/${endpoint}`, 
            {
                method: "PUT", 
                headers: {"Content-Type": "application/json"}, 
                body: data 
            } 
        )).json();
}

async function apiDelete(endpoint?: string, key?: number) {
    return await (await fetch(`https://localhost:7177/${endpoint}/${key}`, 
            { method: "DELETE" } 
        )).json();
}

export {get, post, apiDelete, put}