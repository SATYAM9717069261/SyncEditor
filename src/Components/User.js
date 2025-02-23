import styles from "./editor.module.css"
export function Users({ location, users }) {
    return <div className={styles.connected}>
        <p>Connected</p>
        {
            users?.map((user, i) => {
                return <User key={i} details={user} />
            })
        }

    </div>
}

function User({ details }) {
    const { userName, socketId } = details;
    const shorterName = `${userName?.split(" ")[0][0]}`
    return <div className={styles.user} key={socketId}>
        <div className={styles.avatar}>{shorterName}</div>
        <span className={styles.username}>{userName}</span>
    </div>
}
