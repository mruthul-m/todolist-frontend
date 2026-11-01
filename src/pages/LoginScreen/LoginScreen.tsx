import NavBar from "../../components/NavBar"
import styles from './LockScreen.module.css'
import Login from "../../components/Login"
import { useState } from "react"
import Register from "../../components/Register"


const LoginScreen = () => {

  const [accountToggle, setAccountToggle] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  return (
    <section className={styles['login-page']}>

      <div className={styles['log-nav']}><NavBar isHome={false} /></div>
      <section id={styles['main-div']}>
        <div className={styles['log-content']}> {
          !accountToggle ?
            <div className={`${styles['sub-content']} ${styles['login']}`}> { }
              <Login setAccountToggle={setAccountToggle} signErr={error} setErr={setError}/>
            </div>
            : <div className={`${styles['sub-content']} ${styles['login']}`}>
                <Register setAccountToggle={setAccountToggle} signErr={error} setErr={setError}/>
              </div>}

          <div className={`${styles['content-img']} ${styles['sub-content']}`}>
          </div>
        </div>
      </section>
    </section>
  )
}

export default LoginScreen