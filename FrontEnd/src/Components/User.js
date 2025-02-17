import styles from "./editor.module.css"
export function User({ details }) {
    const { name, id } = details;
    const shorterName = `${name.split(" ")[0][0]}`
    return <div className={styles.user} key={id}>
        <div className={styles.avatar}>{shorterName}</div>
        <span className={styles.username}>{name}</span>
    </div>
}
