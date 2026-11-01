import { useEffect, useRef, useState } from 'react'
import styles from '../pages/LoginScreen/LockScreen.module.css'
import { validatePassword, validateUserId } from '../utils/validate'

interface RegisterProps {
    setAccountToggle: React.Dispatch<React.SetStateAction<boolean>>
    setErr: React.Dispatch<React.SetStateAction<string>>
    signErr: string
}

const Register = ({ setAccountToggle, setErr, signErr }: RegisterProps) => {

    const [passwordLock, setPasswordLock] = useState<boolean>(true);
    const [passwordMatcher, setPasswordMatcher] = useState<string>("");
    const [match, setMatch] = useState<boolean>(false)

    const inputRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        inputRef.current?.focus();
    }, [])

    function handleChangeUsername(e: React.ChangeEvent<HTMLInputElement>) {
        const userId = e.currentTarget.value
        const userIdErr = validateUserId(userId);
        setErr(userIdErr)
        if (userIdErr == '') setPasswordLock(false)
        else setPasswordLock(true)

    }

    function handlePassword(e: React.ChangeEvent<HTMLInputElement>) {
        const password = e.currentTarget.value;
        const passwordErr = validatePassword(password)
        setErr(passwordErr)
    }

    function handleReEnterPassword(e: React.ChangeEvent<HTMLInputElement>) {
        const passwordReEntered = e.currentTarget.value;
        const currentPassword = passwordRef.current?.value ?? "";

        if (currentPassword === passwordReEntered) {
            setMatch(true)
            setPasswordMatcher("password matches ✅ ")
        }

        else {
            setMatch(false)
            setPasswordMatcher("⛔️ password is not matching")
        }
    }

    return (
        <div className={styles['login-container']}>
            <section className={styles['login-header']}>
                <p id={styles.header1}>Hey There!</p>
                <p id={styles.header2}>Create your TODO account</p>
                <span className={styles.headerError}>{signErr}</span>
            </section>
            <section >
                <form onClick={(e) => { e.preventDefault() }} className={styles['login-input']}>
                    <input ref={inputRef} type="text" placeholder='userId' onChange={handleChangeUsername} />
                    <input ref={passwordRef} type="password" placeholder='password' disabled={passwordLock} onChange={handlePassword} />
                    <input type="password" placeholder='re-enter password' disabled={signErr != '' || passwordLock} onChange={handleReEnterPassword} />
                    <span  className={`${styles['ps-match']} ${match ? styles['ps-match-true']: styles['ps-match-false']}`}>{passwordMatcher}</span>
                    <button type="submit" className={styles.signUpBtn} disabled={! match || signErr != ''}>Sign up</button>
                </form>
            </section>
            <section className={styles['register']}>
                <fieldset>
                    <legend> Already have an account? </legend>
                </fieldset>
                <div><button onClick={() => { setAccountToggle(prev => !prev); setErr("") }}>Log in</button></div>
            </section>
        </div>
    )
}

export default Register