import styles from '../pages/LoginScreen/LockScreen.module.css'


const Login = () => {

    const handleSubmit = (e: React.SubmitEvent) => {
        e.preventDefault();
        const form: HTMLFormElement = e.target;
        const formData = new FormData(form);
        console.log(formData)

    }

    return (
        <div className={styles['login-container']}>
            <section className={styles['login-header']}>
                <p id={styles.header1}>Welcome Back!</p>
                <p id={styles.header2}>Login in to your TODO account</p>
                <span id={styles.headerError}></span>
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