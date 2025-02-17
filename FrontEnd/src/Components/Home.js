import styles from "./home.module.css"
import { generateUniqueRoomID, update, validateData } from "./common"
import { useState } from "react"

export function Main() {
    const [roomID, setRoomID] = useState({
        text: "",
        errorState: {
            text: "",
            css: {}
        }
    })
    const [name, setName] = useState({
        text: "",
        errorState: {
            text: "",
            css: {}
        }
    })
    return <div className={styles.container}>
        <div className={styles.card}>
            {/* Logo and Title */}
            <div className="header">
                <h1>Code RealTime</h1>
                <p>collaborat with tream</p>
            </div>

            {/* Input Fields */}
            <div className={styles["input-container"]}>
                <input type="text" style={{ ...roomID?.errorState?.css ?? {} }}
                    value={roomID?.text}
                    placeholder={roomID?.errorState?.text || "ROOM ID"}
                    className={styles["input-field"]}
                    onChange={(event) => {
                        setRoomID(prev => {
                            return update(prev, {
                                text: { $set: event.target.value },
                                errorState: {
                                    text: { $set: "" },
                                    css: { $set: {} }
                                }
                            })
                        })
                    }}
                    onClick={() => {
                        setRoomID(prev => {
                            return update(prev, {
                                errorState: {
                                    text: { $set: "" }
                                }
                            })
                        })
                    }}
                />
                <input type="text" style={{ ...name?.errorState?.css ?? {} }}
                    value={name?.text}
                    placeholder={name?.errorState?.text || "USERNAME"}
                    className={styles["input-field"]}
                    onChange={(event) => {
                        setName(prev => {
                            return update(prev, {
                                text: { $set: event.target.value },
                                errorState: {
                                    text: { $set: "" },
                                    css: { $set: {} }
                                }
                            })
                        })
                    }}
                    onClick={() => {
                        setName(prev => {
                            return update(prev, {
                                errorState: {
                                    text: { $set: "" }
                                }
                            })
                        })
                    }}
                />
            </div>

            {/* Join Button */}
            <button className={styles["join-button"]} onClick={() => {
                if (validateData(roomID.text) && validateData(name.text)) {
                } else {
                    if (!validateData(roomID.text)) {
                        setRoomID(prev => {
                            return update(prev, {
                                errorState: {
                                    css: { $set: { color: "red", border: "1px solid red" } },
                                    text: { $set: "Enter Room ID" },
                                }
                            })

                        })
                    }
                    if (!validateData(name.text)) {
                        setName(prev => {
                            return update(prev, {
                                errorState: {
                                    css: { $set: { color: "red", border: "1px solid red" } },
                                    text: { $set: "Enter Your Name " },
                                }
                            })

                        })
                    }
                }
            }}>Join</button>

            {/* Create Room Link */}
            <p className={styles.footer}>
                If you don’t have an invite, then create a
                <span className={styles.link} onClick={() => {
                    setRoomID(prev => {
                        return update(prev, {
                            text: { $set: generateUniqueRoomID() }, errorState: {
                                text: { $set: "" },
                                css: { $set: {} }
                            }
                        })
                    })
                }} > new room</span>
            </p>
        </div>
    </div >
}
