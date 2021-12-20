import instance from "./instance";

export const getUsers = () =>{
    let url = "/users" 
    return instance.get(url);
}
export const getUser = (id) =>{
    let url = `/users/${id}`;
    return instance.get(url);
}

export const updateUsers = (id,userBody) =>{
    let url = `/users/edit/${id}`
    return instance.put(url,userBody);
}