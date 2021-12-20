import instance from "./instance";

export const getAll = () =>{
  let url = `/categories`;
  return instance.get(url);
}