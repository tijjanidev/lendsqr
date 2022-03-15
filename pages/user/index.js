import Link from 'next/link'
import styles from '../../styles/User.module.css'

import Meta from '../../components/Meta'
import Logo from '../../components/logo'
import Errors from '../../components/errors'

import { useRouter } from 'next/router'
import {useState} from 'react'
import React, {useEffect} from 'react'

import Axios from './../../api/axios'

const  Wallet = () => {

    // Render data...
    const [user, setUser] = useState(null)
    const router = useRouter()

    const fetchUser = (token='') => {

        Axios
            .get('/auth', { headers: {"Authorization" : `Bearer `+ token} })
            .then(response => {
                if(response.status == 200)
                    return response.data
            })
            .then(data => {
                if(data.status)
                    data = data.data
                    Axios
                        .get('/user/'+data.user, { headers: {"Authorization" : `Bearer `+ sessionStorage.getItem('tkn')} })
                        .then(response => {
                            if(response.status == 200)
                                return response.data
                        })
                        .then(data => {
                            if(data.status)
                                user = data.data
                                setUser(user)
                                console.log(user)
                        })
                        .catch(error => {
                            console.log(error)
                        })                       
            })
            .catch(error => {
                router.push('/logout')
            })             
    
    }

    useEffect(() => {
        let tkn = sessionStorage.getItem('tkn')
        fetchUser(tkn);
    }, [])


    return (
        <div className={styles.container}>
            <Meta title='Wallet | Lendsqr' />

            <main className={styles.main}>
                {user &&
                    <>
                        <div className="flex-col w-full bg-gray-500 p-5 pb-10 flex-row text-white">
                            <div className="flex flex-row">
                                <div className="flex-initital">
                                    <Logo width={15} height={15}/>
                                    <span className="ml-1 text-md font-semibold">Lendsqr</span>
                                </div>
                                <div className="flex-grow justify-center text-center">
                                    <span className="text-lg font-bold">
                                        N{user.balance}
                                    </span>
                                </div>
                                <div className="flex-initial">
                                    <Link href="/logout">
                                        <a>
                                            <span className="bg-gray-100 text-gray-700 font-semibold text-xs px-2 py-1 rounded">sign out</span>
                                        </a>
                                    </Link>
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
                                    <h2 className="text-sm font-semibold">{user.first_name} {user.last_name}</h2>
                                </div>
                                <div className="flex pt-2  text-sm">
                                    <div className="flex items-center mr-auto">
                                        <span>{user.email}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="flex mx-auto w-4/5 m-2 items-center border-gray-light bg-white border p-2 rounded">
                            <div className="flex-grow">
                                <h2 className="font-semibold">Transaction</h2>
                                <p className="text-sm">22-10-12</p>
                            </div>
                            <h2 className="flex-1 text-red-500 font-bold text-right">N10,000</h2>
                        </div>

                    </>
                }

            </main>
    
    
        </div>
    )  
}
  

export default Wallet;