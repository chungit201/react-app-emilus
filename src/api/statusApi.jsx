import instance from "./instance";

export const addMStatus = (post) =>{
  let url='/posts/add';
  return instance.post(url,post)
}