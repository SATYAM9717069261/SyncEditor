const { validateData } = require("./common.js");
const ACTION = {
    JOIN: "join",
    JOINED: "joined",
    DISCONNECT: "disconnect",
    DISCONNECTED: "disconnected",
    CODE_CHANGE: "code-change",
    SYNC_CODE: "sync_code",
    LEAVE: "leave"
}
function getActionByID(name = "") {
    if (validateData(name))
        return ACTION[name];
    return "";
}

module.exports = { ACTION, getActionByID };
