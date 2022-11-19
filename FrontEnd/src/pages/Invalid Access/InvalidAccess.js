import { useNavigate } from 'react-router-dom'
import styles from './Invalid.module.css'
export default function NoAccess() {

    const navigate=useNavigate()

    function GoTo(){
        navigate('/')
    }

    return <div className={styles.Box}>
                <h1 className={styles.Oops}>Oops!</h1>
                <h2 className={styles.Text1}>You do not have access to this is page. </h2>
                <h3 className={styles.Text2}>
                    Please Sign-In 
                    <div onClick={GoTo} className={styles.Link}>Here</div> 
                </h3> 
            </div>
}
