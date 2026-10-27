import { useState } from 'react';
import styles from '../pages/LoginScreen/LockScreen.module.css';


const Login = () => {

    const [error, setError] = useState<string>("");

    interface LoginBody {
        name: string
        password: string
    }

    const handleSubmit = async (e: React.SubmitEvent) => {

        e.preventDefault();

        const form: HTMLFormElement = e.target;
        const formData = new FormData(form);

        const loginBody: LoginBody = {
            name: formData.get("username")?.toString() ?? "",
            password: formData.get("password")?.toString() ?? ""
        }


        if (isValidLoginBody(loginBody)) {
            setError("🍽️ Loading..")
            fetch('http://localhost:8080/createUser', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(loginBody),
            }).then(res => {
                if (!res.ok)
                    throw new Error("Creating new user failed")
                return res.text()
            })
                .then(data => console.log(data))
                .catch(err => {
                    console.log(err.message)
                    setError("😬 Oh, some issues!")
                })

        }
    }

    function isValidLoginBody(loginBody: LoginBody): boolean {

        const name = loginBody.name?.trim() ?? "";
        const password = loginBody.password ?? "";

        if (name.length < 6) {
            setError("⛔ Username must contain at least 6 characters!");
            return false;
        }

        if (name.length > 9) {
            setError("⛔ Username must not contain more than 9 characters!");
            return false;
        }

        if (!/^[A-Za-z]{4}/.test(name)) {
            setError("⛔ The first 4 characters must be alphabets!");
            return false;
        }

        if (!/^[A-Za-z][A-Za-z0-9_]*$/.test(name)) {
            setError("⛔ Username can contain only letters, digits, and underscores!");
            return false;
        }

        if ((name.match(/[0-9]/g) ?? []).length > 2) {
            setError("⛔ Username can contain at most 2 digits!");
            return false;
        }

        if ((name.match(/_/g) ?? []).length > 1) {
            setError("⛔ Username can contain at most 1 underscore!");
            return false;
        }

        if (password.length < 6) {
            setError("⛔ Password must contain at least 6 characters!");
            return false;
        }

        if (!/[!#@$]/.test(password)) {
            setError("⛔ Password must contain at least one of !, #, @, $!");
            return false;
        }

        setError("");
        return true;
    }

    return (
        <div className={styles['login-container']}>
            <section className={styles['login-header']}>
                <p id={styles.header1}>Welcome Back!</p>
                <p id={styles.header2}>Login in to your TODO account</p>
                <span id={styles.headerError}>{error}</span>
            </section>
            <section >
                <form onSubmit={e => handleSubmit(e)} className={styles['login-input']}>
                    <label htmlFor="username">UserId</label>
                    <input type="text" name="username" />
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" />
                    <p>Forgot your password? <a><span>Reset</span></a></p>
                    <button type="submit">Log in</button>
                </form>
            </section>
            <section className={styles['register']}>
                <fieldset>
                    <legend> New to TODO App? </legend>
                </fieldset>
                <div><button>Register</button></div>
            </section>
        </div>
    )
}

export default Login