import instance from "./instance";

export const getPosts = () =>{
  const url = "/posts";
  return instance.get(url);
}