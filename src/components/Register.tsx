import { useEffect, useRef, useState } from 'react'
import styles from '../pages/LoginScreen/LockScreen.module.css'
import { RegisterApi } from '../utils/api'
import { validatePassword, validateUserId } from '../utils/validate'

interface RegisterProps {
    setAccountToggle: React.Dispatch<React.SetStateAction<boolean>>
    setErr: React.Dispatch<React.SetStateAction<string>>
    signErr: string
}

type Body = {
    name: string,
    password: string
}

type Response = {
    status : boolean
    message: string
    data: {
        userId: string
        userName: string
    }
}
const Register = ({ setAccountToggle, setErr, signErr }: RegisterProps) => {


    const [passwordLock, setPasswordLock] = useState<boolean>(true);
    const [passwordMatcher, setPasswordMatcher] = useState<string>("");
    const [match, setMatch] = useState<boolean>(false);
    const [response, setResponse] = useState<Response | null>(null);

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

    async function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {

        e.preventDefault()
        const form: HTMLFormElement = e.target;
        const formData = new FormData(form);

        const body: Body = {
            name: formData.get("userid")?.toString() ?? "",
            password: formData.get("password")?.toString() ?? ""
        }

        try {
            const resp = await RegisterApi.post('createUser', body)

            if (!resp.ok) {
                if (resp.status >= 500) setErr("Dont panic! Server issue..")
                else if (resp.status === 409) setErr("Oh userid already taken, try new user id")
                setResponse(null)
                throw new Error(`Response status: ${resp.status}`)

            }

            const result : Response = await resp.json();
            setResponse(result)
            alert(`User ${result?.data.userName} created successfully, you can login now.`)
            setAccountToggle((prev) => !prev)
            

        } catch (error) {
            if (error instanceof Error) {
                alert("Oh sorry some issue!")
                console.log(error.message)
            }
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
                
                {/* empty braces to handle response in future */}
                {false && response} 

                <form onSubmit={(e) => handleSubmit(e)} className={styles['login-input']}>
                    <input ref={inputRef} type="text" placeholder='userId' onChange={handleChangeUsername} name='userid' />
                    <input ref={passwordRef} type="password" name='password' placeholder='password' disabled={passwordLock} onChange={handlePassword} />
                    <input type="password" placeholder='re-enter password' disabled={signErr != '' || passwordLock} onChange={handleReEnterPassword} />
                    <span className={`${styles['ps-match']} ${match ? styles['ps-match-true'] : styles['ps-match-false']}`}>{passwordMatcher}</span>
                    <button type="submit" className={styles.signUpBtn} disabled={!match || signErr != ''}>Sign up</button>
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