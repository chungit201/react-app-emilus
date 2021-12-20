import instance from "./instance";

export const getMessageUser = (dialogId) =>{
  const url=`/messages?dialog=${dialogId}`;
  return instance.get(url);
}

export const addMessage = (msg) =>{
  let url=`/messages/add`;
  return instance.post(url,msg)
}