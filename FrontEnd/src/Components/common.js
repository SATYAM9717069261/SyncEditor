export function generateUniqueRoomID() {
    const timestamp = Date.now().toString(36); // Convert current time to base36
    const randomPart = Math.random().toString(36).substring(2, 10); // Generate random string
    return (timestamp + randomPart).substring(0, 16); // Ensure it's 16 characters long
}
export function update(data, command) {
    for (const [key, value] of Object.entries(command)) {
        switch (key) {
            case '$push':
                return [...data, ...value];
            case '$set':
                return value;
            case '$merge':
                if (!(data instanceof Object)) {
                    throw Error("bad merge");
                }
                return { ...data, ...value };
            case '$apply':
                return value(data);
            default:
                if (data instanceof Array) {
                    const res = [...data];
                    res[key] = update(data[key], value);
                    return res;
                } else {
                    const res = { ...data }
                    for (const key of Object.keys(command)) {
                        res[key] = update(res[key], command[key])
                    }
                    return res
                }
        }
    }
}
export function validateData(data) {
    /** don't Add data == 0 return true; */
    if (data == undefined)
        return false;
    if (data == null)
        return false;
    if (data == "")
        return false;
    if (data == "undefined")
        return false;
    if (data == "null")
        return false;
    if (data == "NaN" || data == "NA")
        return false;
    if (data == "false")
        return false;
    return true;
}
export async function copyClipboard(text, sucess, failure) {
    return await navigator.clipboard.writeText(text).then(() => sucess(text)).catch((exception) => failure(exception.message))
}

//console.log(generateUniqueString());
