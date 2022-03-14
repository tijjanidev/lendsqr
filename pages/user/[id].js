import Head from 'next/head'
import Link from 'next/link'
import API from '../../lib/axios'


import Button from '../../components/button'
import Meta from '../../components/Meta'

import styles from '../../styles/User.module.css'


const User = ({ user }) => {

    return (
        <div className={styles.container}>
            <Meta title='tjj' />
        
            <main className={styles.main}>
                <div className="flex-col w-full bg-gray-500 p-5 pb-10 flex-row text-white">
                    <div className="flex flex-row">
                        <div className="flex-initital">
                            <span className="text-md font-semibold">Lendsqr</span>
                        </div>
                        <div className="flex-grow justify-center text-center">
                            <span className="text-lg font-bold">
                                N10,000 
                            </span>
                        </div>
                        <div className="flex-initial">
                            <span className="bg-gray-100 text-gray-700 font-semibold text-xs px-2 py-1 rounded">sign out</span>
                        </div>
                    </div>
    
                    <div className="flex flex-row justify-center ">
                        <div className="flex-1 justify-center text-center ">
                            <div className="rounded-lg text-sm mb-2" role="group">
                                <button className="bg-gray-400 text-white hover:bg-gray-300 rounded-l-lg px-4 py-2 mx-0 outline-none focus:shadow-outline">Fund</button>
                                <button className="bg-gray-400 text-white hover:bg-gray-300  px-4 py-2 mx-0 outline-none focus:shadow-outline">Transfer</button>
                                <button className="bg-gray-400 text-white hover:bg-gray-300 rounded-r-lg px-4 py-2 mx-0 outline-none focus:shadow-outline">Withdraw</button>
                            </div>         
                        </div>         
                    </div>
                </div>
    
                <div className="flex mx-auto w-4/5 -mt-5 bg-white shadow-md  rounded-md p-2 text-gray">
                    <div className="flex-col flex-grow justify-center px-2 py-1">
                        <div className="flex justify-between items-center ">
                            <h2 className="text-sm font-semibold"></h2>
                        </div>
                        <div className="flex pt-2  text-sm">
                            <div className="flex items-center mr-auto">
                                <span>''</span>
                            </div>
                        </div>
                    </div>
                </div>
                
            </main>

        </div>
    )

}
  
User.getInitialProps = async fnctn => {

    const res = await fetch('https://3000-tijjvni-lendsqr-9lyeh4g677s.ws-eu34.gitpod.io/api/users/1')
    console.log(res)

    const user = await res;
  
    return {
      props: {
        user,
      },
    }

};
  

export default User