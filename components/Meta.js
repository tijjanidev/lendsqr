import Head from 'next/head'

const Meta = ({ title, keywords, description }) => {
  return (
    <Head>
      <meta name='viewport' content='width=device-width, initial-scale=1' />
      <meta name='keywords' content={keywords} />
      <meta name='description' content={description} />
      <meta charSet='utf-8' />
      <link rel='icon' href='/lendsqr.png' />
      <title>{title}</title>
    </Head>
  )
}

Meta.defaultProps = {
  title: 'Lendsqr',
  keywords: 'Wallet, Lendsqr',
  description: 'A simple user wallet to save, make transfers and withdraw.',
}

export default Meta