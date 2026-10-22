import { useNavigate } from 'react-router-dom'
import styles from './HomeScreen.module.css'

const HomeScreen = () => {

  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/login')
  }
  
  type navList = {
    id : string,
    value: string,
    func ?: ()=> void
  }

  const navListContainer : navList[] = [
    {id: '1', value: 'Admin'}, {id: '2', value:'Help'}, {id: '3', value: 'Theme'}, {id: '4', value: 'Account', func: handleClick}
  ]
  return (

    <section id={styles['main-page']}>
      {/* NaveBar */}
      <nav id={styles['nav']}>
        <div className={styles['nav-container']}>
          <section className={styles['logo']}>Todo-APP</section>
          <section>
            <ul className={styles['nav-list']}>
              {
                navListContainer.map(item => 
                  <li key={item.id} onClick={item.func}>{item.value}</li>
                )
              }
            </ul>
          </section>
        </div>
      </nav>
      <div id={styles['main-sub-page']}>
        <div className={styles['content-container']}>
          <h1>A Beginner TODO-APP for maintaining your todo's..</h1>          
        </div>

      </div>
    </section>


  )
}

export default HomeScreen