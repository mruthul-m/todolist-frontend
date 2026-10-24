import styles from './HomeScreen.module.css'
import NavBar from '../../components/NavBar';

const HomeScreen = () => {

  return (

    <section id={styles['main-page']}>
      {/* NaveBar */}
      <nav id={styles['nav']}>
        <div className={styles['home-nav']}>
        <NavBar isHome={true}/>
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