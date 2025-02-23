import { useEffect, useState } from "react"

import styles from "./editor.module.css"
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { vscodeDark } from '@uiw/codemirror-theme-vscode';
import { getActionByID } from "./enum";
import { useDebounce } from "../hooks/useDebounce";
import { validateData } from "./common";

export function Code({ socketRef, roomID, userDetail, codeRef }) {
    const [value, setValue] = useState("");
    const onChange = (val) => setValue(val);
    const sendCode = useDebounce(function(roomID, userDetail, val, socketRef) {
        if (validateData(val) && socketRef.current) {
            socketRef.current.emit(getActionByID('CODE_CHANGE'), {
                roomID: roomID,
                userDetail: userDetail,
                value: val
            })
        }
    }, 1000)

    useEffect(() => { sendCode(roomID, userDetail, value, socketRef) }, [value, roomID, userDetail])

    codeRef.current = (data) => {
        setValue(data?.value ?? "")
    }

    return <div className={styles.editor}>
        <CodeMirror value={value}
            height="96vh" width="80vw"
            theme={vscodeDark}
            extensions={[javascript({ jsx: true })]}
            onChange={onChange}
        />;
    </div>
}
