import styles from '../pages/LoginScreen/LockScreen.module.css';

interface LoginProps {
    onReg: React.Dispatch<React.SetStateAction<boolean>>
    setErr: React.Dispatch<React.SetStateAction<string>>
    signErr: string
}

const Login = ({ onReg, setErr, signErr }: LoginProps) => {



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
            setErr("🍽️ Loading..")
            fetch('http://localhost:8080/createUser', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(loginBody),
            }).then(res => {
                if (!res.ok) {
                    if (res.status == 409) setErr("😬 Oh, username already exists!")
                    throw new Error("Creating new user failed")
                }

                setErr("")
                return res.text()
            })
                .then(data => console.log(data))
                .catch(err => {
                    console.log(err.message)
                })

        }
    }

    function isValidLoginBody(loginBody: LoginBody): boolean {

        const name = loginBody.name;
        const password = loginBody.password;

        if (name.length < 6) {
            setErr("⛔ Username must contain at least 6 characters!");
            return false;
        }

        if (name.length > 9) {
            setErr("⛔ Username must not contain more than 9 characters!");
            return false;
        }

        if (!/^[A-Za-z]{4}/.test(name)) {
            setErr("⛔ The first 4 characters must be alphabets!");
            return false;
        }

        if (!/^[A-Za-z][A-Za-z0-9_]*$/.test(name)) {
            setErr("⛔ Username can contain only letters, digits, and underscores!");
            return false;
        }

        if ((name.match(/[0-9]/g) ?? []).length > 2) {
            setErr("⛔ Username can contain at most 2 digits!");
            return false;
        }

        if ((name.match(/_/g) ?? []).length > 1) {
            setErr("⛔ Username can contain at most 1 underscore!");
            return false;
        }

        if (password.length < 6) {
            setErr("⛔ Password must contain at least 6 characters!");
            return false;
        }

        if (!/[!#@$]/.test(password)) {
            setErr("⛔ Password must contain at least one of !, #, @, $!");
            return false;
        }

        setErr("");
        return true;
    }


    return (
        <div className={styles['login-container']}>
            <section className={styles['login-header']}>
                <p id={styles.header1}>Welcome Back!</p>
                <p id={styles.header2}>Login in to your TODO account</p>
                <span id={styles.headerError}>{signErr}</span>
            </section>
            <section >
                <form onSubmit={e => handleSubmit(e)} className={styles['login-input']}>
                    <label htmlFor="username">UserId</label>
                    <input type="text" name="username" />
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" />
                    <p>Forgot your password? <a><span>Reset</span></a></p>
                    <button type="submit" className={styles.loginBtn}>Log in</button>
                </form>
            </section>
            <section className={styles['register']}>
                <fieldset>
                    <legend> New to TODO App? </legend>
                </fieldset>
                <div><button onClick={() => {
                    onReg(prev => !prev); setErr("")
                }}>Sign up</button></div>
            </section>
        </div>
    )
}

export default Login