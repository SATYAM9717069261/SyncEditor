import { Code } from "./Code"
import { copyClipboard } from "./common"
import styles from "./editor.module.css"
import { User } from "./User"
export function Main() {
    const users = [
        { name: "Rakesh K" },
        { name: "Satyam" },
    ]
    return <div className={styles.container}>
        <div className={styles.sidebar}>
            <h2 className={styles.logo}>Code Realtime</h2>
            <div className={styles.connected}>
                <p>Connected</p>
                {
                    users.map((details, i) => <User key={i} details={details} />)
                }

            </div>
            <div className={styles.bottomSection}>
                <button className={styles["leave-room"]}>Leave Room</button>
                <button className={styles["copy-room"]} onclick={() => {
                    //copyClipboard()
                }}>Copy Room ID</button>
            </div>
        </div>
        <Code />
    </div>
}
