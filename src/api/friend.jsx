import instance from "./instance";

export const getFriends = (userId)=>{
    let url = `/friends?user=${userId}`;
    return instance.get(url);
}