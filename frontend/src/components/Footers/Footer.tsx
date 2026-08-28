import styles from './Footer.module.css'

export function Footer() {
  return (
    <>
      <hr className={styles.footerBar} />
      <footer className={styles.footerItems}>
        <img src="src/assets/images/name.png" alt="" />
        <div className={styles.linksSpace}>
        
          <a href="https://www.instagram.com/polymathech/" target="_blank" rel="noopener noreferrer"><img style={{zoom: '5%'}} src="https://ascotlife.church/wp-content/uploads/2020/06/white-instagram-icon-png.png" alt="" />Instagram</a>
        </div>
      </footer>
    </>
  )
}
