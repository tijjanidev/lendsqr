import Link from 'next/link'
import styles from '../styles/Login.module.css'

import Meta from '../components/Meta'
import Input from '../components/input'
import Label from '../components/label'
import Button from '../components/button'
import Logo from '../components/logo'
import Errors from '../components/errors'
import Message from '../components/message'

import { useRouter } from 'next/router'
import {useState} from 'react'
import Axios from './../api/axios'

export default function Login() {

    const [errors, setErrors] = useState([])
    const [message, setMessage] = useState('')
    const router = useRouter()

    const loginUser = async (event) => {
        
        // Stop the form from submitting and refreshing the page.
        event.preventDefault()
    
        // Get data from the form.
        const data = {
            email: event.target.email.value,
            password: event.target.password.value,
        }
        
        Axios
            .post('/login',
                {
                    email: data.email,
                    password: data.password
                },{

                    headers: {
                        'Content-Type': 'application/json'
                        },
                }
            )
            .then(response => {
                if(response.status == 200)
                    return response.data
            })
            .then((data) => {
                if(data.status){
                    setErrors([]);
                    setMessage('Loggedin');

                    data = data.data
                    
                    if (typeof window !== 'undefined') {
                        window.sessionStorage.setItem('tkn', data.token);
                        data = window.sessionStorage.getItem('tkn');
                    }
                                          
                    router.push('/user');
                }            
            })
            .catch(error => {

                let errors = []
                if(errors = error.response.data.data){
                    errors = errors.errors

                    let errorsArr = [];
                    errors.forEach(function(error) {
                        errorsArr.push(error.msg)
                    });
                    setErrors(errorsArr);
                } else 
                    console.log(errors.data);
            })      
            
    }



    return (
        <div className={styles.container}>
            <Meta title='Login | '/>

            <main className={styles.main}>

                <div className="flex items-center justify-center min-h-screen bg-gray-100">
                    <div className="px-8 py-6 mt-4 text-left bg-white shadow-lg">
                        <div className="flex justify-center">
                            <Logo/>
                        </div>


                        <h3 className="text-2xl font-bold text-center">Login to your account</h3>
                        <Message className="mb-5" message={message} />
                        <Errors className="mb-5" errors={errors} />
                        <form onSubmit={loginUser} className="m-2">

                            <div className="mt-4">
                                <Label htmlFor="email">Email</Label>
                                <Input id="email" name="email" type="email" required  />
                            </div>                            
                            <div className="mt-4">
                                <Label htmlFor="password">Password</Label>
                                <Input id="password" nmae="password" type="password" required />
                            </div>
                            
                            <div className="flex items-baseline justify-between">
                                <Link href="/register">
                                    <a className="underline text-sm text-gray-600 hover:text-gray-900">
                                        Sign up
                                    </a>
                                </Link>
                                
                                <Button>Login</Button>
                            </div>

                        </form>

                    </div>
                </div>
            </main>

        </div>
    )
}
