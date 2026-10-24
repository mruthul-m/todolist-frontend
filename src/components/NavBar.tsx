import { useNavigate } from "react-router-dom";
import styles from '../pages/HomeScreen/HomeScreen.module.css'
import type { MouseEvent } from 'react';
import logo from '../assets/astrazeneca.png'


type NavBarProps = {
    isHome : boolean
}
function NavBar({ isHome } : NavBarProps) {

    const navigate = useNavigate();

    type navList = {
        id: string,
        value: string,
        func?: (e: MouseEvent) => void
    }

    const handleClick = (e: MouseEvent) => {
        if (e.currentTarget.childNodes[0].nodeName == 'IMG') {
            navigate('/')
        } else
            navigate('/login')
    }

    const navListContainer: navList[] = [
        { id: '1', value: 'Admin' }, { id: '2', value: 'Help' }, { id: '3', value: 'Theme' }, { id: '4', value: 'Account', func: handleClick }
    ]


    return (
        <div className={styles['nav-container']}>
            <section className={styles['logo']} onClick={(e) => {
                handleClick(e)
            }} nonce="logo"><img src={logo} alt="logo"/></section>
            {isHome &&
                <section>
                    <ul className={styles['nav-list']}>
                        {
                            navListContainer.map(item =>
                                <li key={item.id} onClick={(e) => item.func ? item.func(e) : null}>{item.value}</li>
                            )
                        }
                    </ul>
                </section>
            }
        </div>
    )
}

export default NavBar
