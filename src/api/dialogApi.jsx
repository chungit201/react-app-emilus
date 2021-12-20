import instance from "./instance";

export const getDialogs = (user) => {
    let url = `/dialogs?user=${user}`;
    return instance.get(url);
}

export const getDialog = (dialogId) => {
    let url = `/dialogs/${dialogId}`;
    return instance.get(url)
}