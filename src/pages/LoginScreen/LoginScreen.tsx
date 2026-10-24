import NavBar from "../../components/NavBar"
import styles from './LockScreen.module.css'


const LoginScreen = () => {
  return (
    <section className={styles['login-page']}>

      <div className={styles['log-nav']}><NavBar isHome={false} /></div>
      <section id={styles['main-div']}>
        <div className={styles['log-content']}>
          <div className={styles['sub-content']}>login/sing-up</div>
          <div className={`${styles['content-img']} ${styles['sub-content']}`}>
          </div>
        </div>
      </section>
    </section>
  )
}

export default LoginScreen