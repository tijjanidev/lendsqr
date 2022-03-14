import Link from 'next/link'
import styles from '../styles/Home.module.css'

import Meta from '../components/Meta'
import Logo from '../components/logo'

export default function Home() {
    return (
        <div className={styles.container}>
            <Meta title='Home ' />

            <main className={styles.main}>
              <h1 className={styles.title}>
                Welcome to <Logo width="40" height="40"/> <Link href="/login">Lendsqr!</Link>
              </h1>

              <div className={styles.grid}>
                <Link href="/login">
                  <h2 className={styles.card}>Login &rarr;</h2>
                </Link>
                <Link href="/register">
                  <h2 className={styles.card}>Sign Up &rarr;</h2>
                </Link>
                
              </div>
            </main>


        </div>
    )
}
