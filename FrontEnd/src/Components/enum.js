import { validateData } from "./common.js"

export const ACTION = {
    JOIN: "join",
    JOINED: "joined",
    DISCONNECT: "disconnect",
    CODE_CHANGE: "code-change",
    SYNC_CODE: "sync_code",
    LEAVE: "leave"
}
export function actiongetByID(name = "") {
    if (validateData(name))
        return ACTION[name];
    return "";
}
