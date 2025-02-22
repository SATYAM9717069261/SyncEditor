import { useEffect, useRef, useState } from "react"
import { initSocket } from "../socket"
import { Code } from "./Code"
import { copyClipboard, validateData, update } from "./common"
import styles from "./editor.module.css"
import { Users } from "./User"
import { getActionByID } from "./enum.js"
import { useLocation, useNavigate, Navigate, useParams } from "react-router-dom";

export function Main() {
    const socketRef = useRef(null);
    const location = useLocation()
    const navigate = useNavigate();
    const { room_hash } = useParams();

    const [users, setUsers] = useState([]);

    useEffect(() => {
        const init = async () => {
            socketRef.current = await initSocket();

            function handleError(message) {
                //toast Error
                navigate("/");
            }

            socketRef.current.on("connect_error", (error) => {
                handleError(error)
            })
            socketRef.current.on("connect_failed", (error) => {
                handleError(error)
            })
            socketRef.current.emit(getActionByID('JOIN'), {
                roomID: room_hash,
                userName: location?.state.name.text ?? "Missing Name"
            });
            // listen for New Joined 
            const handleJoin = (data) => {
                setUsers(data.roomClients)
            };
            socketRef.current.on(getActionByID("JOINED"), handleJoin);
            return () => {
                socketRef.current.off(getActionByID("JOINED"), handleJoin);
            };
        }
        init()
    }, [])
    if (!validateData(location?.state.name.text)) {
        return <Navigate to={"/"} />
    }

    return <div className={styles.container}>
        <div className={styles.sidebar}>
            <h2 className={styles.logo}>Code Realtime</h2>
            <Users users={users} location={location} />
            <div className={styles.bottomSection}>
                <button className={styles["leave-room"]}>Leave Room</button>
                <button className={styles["copy-room"]} onClick={() => {
                    //copyClipboard()
                }}>Copy Room ID</button>
            </div>
        </div>
        <Code />
    </div>
}

