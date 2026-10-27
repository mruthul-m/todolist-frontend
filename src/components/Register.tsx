import styles from '../pages/LoginScreen/LockScreen.module.css'

interface RegisterProps {
    onLog : React.Dispatch<React.SetStateAction<boolean>>
    setErr: React.Dispatch<React.SetStateAction<string>>
    signErr: string
}

const Register = ({onLog, setErr, signErr} : RegisterProps) => {
    
  return (
    <div className={styles['login-container']}>
            <section className={styles['login-header']}>
                <p id={styles.header1}>Hey There!</p>
                <p id={styles.header2}>Create your TODO account</p>
                <span id={styles.headerError}>{signErr}</span>
            </section>
            <section >
                <form onClick={(e) => {e.preventDefault()}} className={styles['login-input']}>
                    <input type="text" name="username" placeholder='userId'/>
                    <input type="password" name="password" placeholder='password'/>
                    <input type="password" name="password" placeholder='re-enter password'/>
                    
                    <button type="submit" className={styles.signUpBtn}>Sign up</button>
                </form>
            </section>
            <section className={styles['register']}>
                <fieldset>
                    <legend> Already have an account? </legend>
                </fieldset>
                <div><button onClick={() => {onLog(prev => ! prev); setErr("")}}>Log in</button></div>
            </section>
        </div>
  )
}

export default Register