import { useCallback, useEffect, useState } from "react"

import styles from "./editor.module.css"
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { vscodeDark } from '@uiw/codemirror-theme-vscode';

export function Code() {
    const [value, setValue] = useState("console.log('hello world!');");
    const onChange = useCallback((val, viewUpdate) => {
        setValue(val);
    }, []);
    return <div className={styles.editor}>
        <CodeMirror value={value} height="96vh" width="80vw" theme={vscodeDark} extensions={[javascript({ jsx: true })]} onChange={onChange} />;
    </div>
}
