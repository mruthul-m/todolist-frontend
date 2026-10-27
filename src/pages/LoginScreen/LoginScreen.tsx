import NavBar from "../../components/NavBar"
import styles from './LockScreen.module.css'
import Login from "../../components/Login"
import { useState } from "react"
import Register from "../../components/Register"


const LoginScreen = () => {

  const [onRegister, setOnRegister] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  return (
    <section className={styles['login-page']}>

      <div className={styles['log-nav']}><NavBar isHome={false} /></div>
      <section id={styles['main-div']}>
        <div className={styles['log-content']}> {
          !onRegister ?
            <div className={`${styles['sub-content']} ${styles['login']}`}> { }
              <Login onReg={setOnRegister} signErr={error} setErr={setError}/>
            </div>
            : <div className={`${styles['sub-content']} ${styles['login']}`}>
                <Register onLog={setOnRegister} signErr={error} setErr={setError}/>
              </div>}

          <div className={`${styles['content-img']} ${styles['sub-content']}`}>
          </div>
        </div>
      </section>
    </section>
  )
}

export default LoginScreen