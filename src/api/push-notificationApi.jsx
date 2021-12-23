import instance from "./instance";

export const sendToAll = (notification) =>{
  const url=`/send-notifications/sendToAll`;
  return instance.post(url,notification);
}

export const sendToOne = (notification) =>{
  const url=`/send-notifications/sendToOne`;
  return instance.post(url,notification);
}