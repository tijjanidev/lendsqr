import Link from 'next/link'
import styles from '../styles/Login.module.css'

import Meta from '../components/Meta'
import Input from '../components/input'
import Label from '../components/label'
import Button from '../components/button'
import Logo from '../components/logo'
import Errors from '../components/errors'

import { useRouter } from 'next/router'
import {useState} from 'react'

export default function Login() {

    const [errors, setErrors] = useState([])
    const router = useRouter()

    const loginUser = async (event) => {
        
        // Stop the form from submitting and refreshing the page.
        event.preventDefault()
    
        // Get data from the form.
        const data = {
            email: event.target.email.value,
            password: event.target.password.value,
        }
        
    
        fetch('https://8080-tijjvni-lendsqr-9lyeh4g677s.ws-eu34.gitpod.io/api/login',
        {
            body: JSON.stringify({
                email: data.email,
                password: data.password
            }),
            headers: {
              'Content-Type': 'application/json'
            },
            method: 'POST'
        })
        .then(response => response.json())
        .then(data => {
            if(data.status){
                data = data.data
                sessionStorage.setItem('tkn', data.token);
                data = sessionStorage.getItem('tkn');

                // console.log(data);
                // setErrors([])
                router.push('/user');
            }else {
                data.errors = data.data.errors
                errors = [];
                data.errors.forEach(function(error) {
                    errors.push(error.msg)
                });
                setErrors(errors);

          }
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    }



    return (
        <div className={styles.container}>
            <Meta title='Login | {process.env.PROJECT}' />

            <main className={styles.main}>

                <div className="flex items-center justify-center min-h-screen bg-gray-100">
                    <div className="px-8 py-6 mt-4 text-left bg-white shadow-lg">
                        <div className="flex justify-center">
                            <Logo/>
                        </div>


                        <h3 className="text-2xl font-bold text-center">Login to your account</h3>
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
