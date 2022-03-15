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


export default function Signup() {


    const [errors, setErrors] = useState([])
    const [message, setMessage] = useState('')
    const router = useRouter()

    const registerUser = async (event) => {
        // Stop the form from submitting and refreshing the page.
        event.preventDefault()
    
        // Get data from the form.
        const data = {
            first_name: event.target.first_name.value,
            last_name: event.target.last_name.value,
            email: event.target.email.value,
            password: event.target.password.value,
        }
        
        Axios
            .post('/signup',data,{

                    headers: {
                        'Content-Type': 'application/json'
                        },
                }
            )
            .then(response => {
                if(response.status == 201)
                    return response.data
            })
            .then((data) => {
                if(data.status){
                    setErrors([]);
                    setMessage('Loggedin');
                    router.push('/login');
                } else    
                    console.log(data)
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
            <Meta title='Signup |' />

            <main className={styles.main}>

                <div className="flex items-center justify-center min-h-screen bg-gray-100">
                    <div className="px-8 py-6 mt-4 text-left bg-white shadow-lg">
                        <div className="flex justify-center">
                            <Logo/>
                        </div>

                        <h3 className="text-2xl font-bold text-center">Signup your new account</h3>
                        <Errors className="mb-5" errors={errors} />
                        <form onSubmit={registerUser} className="m-2">

                            <div className="mt-4">
                                <Label htmlFor="firstname">Fistname</Label>
                                <Input id="firstname" name="first_name" type="text" required autoFocus />
                            </div>
                            <div className="mt-4">
                                <Label htmlFor="lastname">Lastname</Label>
                                <Input id="lastname" name="last_name" type="text" required  />
                            </div>
                            
                            <div className="mt-4">
                                <Label htmlFor="email">Email</Label>
                                <Input id="email" name="email" type="email" required  />
                            </div>                            
                            <div className="mt-4">
                                <Label htmlFor="password">Password</Label>
                                <Input id="password" nmae="password" type="password" required />
                            </div>
                            
                            <div className="flex items-baseline justify-between">
                                <Link href="/login">
                                    <a className="underline text-sm text-gray-600 hover:text-gray-900">
                                        Login
                                    </a>
                                </Link>
                                
                                <Button>Sign up</Button>
                            </div>

                        </form>

                    </div>
                </div>
            </main>

        </div>
    )
}

