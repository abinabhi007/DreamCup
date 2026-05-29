import Head from 'next/head'
import styles from '../styles/Home.module.scss'

export default function Home() {
  return (
    <>
      <Head>
        <title>DreamCup</title>
        <meta name="description" content="DreamCup - Welcome to our platform" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={`${styles.main} container`}>
        <div className="row">
          <div className="col-12">
            <h1>Welcome to DreamCup</h1>
            <p>Your Next.js project with Bootstrap and SCSS is ready!</p>
          </div>
        </div>
      </main>
    </>
  )
}
