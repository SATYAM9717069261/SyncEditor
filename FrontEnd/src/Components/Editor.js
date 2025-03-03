import { useEffect, useRef, useState } from "react"
import { initSocket } from "../socket"
import { Code } from "./Code"
import { copyClipboard, validateData, update } from "./common"
import styles from "./editor.module.css"
import { Users } from "./User"
import { getActionByID } from "./enum.js"
import { useLocation, useNavigate, Navigate, useParams } from "react-router-dom";
import toast from "react-hot-toast"

export function Main() {
    const socketRef = useRef(null);
    const codeRef = useRef(null);
    const location = useLocation()
    const navigate = useNavigate();
    const { room_hash } = useParams();

    const [users, setUsers] = useState([]);
    const [userDetail, setUserDetail] = useState({});
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

            socketRef.current.on(getActionByID("DISCONNECTED"), ({ socketId, userName }) => {
                //toaster
                console.log("leave" + userName)
                setUsers(prev => {
                    return prev.filter(data => data.socketId != socketId)
                })
            })

            // listen for New Joined 
            const handleJoin = (data) => {
                setUserDetail({ userName: data.userName, id: data.socketId })
                setUsers(data.roomClients)
            };
            socketRef.current.on(getActionByID("JOINED"), handleJoin);
            socketRef.current.on(getActionByID('CODE_CHANGE'), codeRef.current);

            return () => {
                socketRef.current.off(getActionByID("JOINED"));
                socketRef.current.off(getActionByID('JOIN'));
                socketRef.current.off(getActionByID('DISCONNECTED'));
                socketRef.current.off(getActionByID('CODE_CHANGE'));
                socketRef.current.disconnect()
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
                <button className={styles["leave-room"]} onClick={() => {
                    navigate("/");
                }}>Leave Room</button>
                <button className={styles["copy-room"]} onClick={() => {
                    copyClipboard(room_hash, () => {
                        toast.success("COPIED")
                    }, () => {
                        toast.error("ERROR")
                    })
                }}>Copy Room ID</button>
            </div>
        </div>
        <Code socketRef={socketRef} roomID={room_hash} userDetail={userDetail} codeRef={codeRef} />
    </div>
}

