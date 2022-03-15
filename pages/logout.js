import Link from 'next/link'

import { useRouter } from 'next/router'
import React, {useEffect} from 'react'


export default function Logout() {
    const router = useRouter()

    const logUserOut = () => {
        sessionStorage.clear();
        router.push('/login');        
    }

    useEffect(() => {
        let tkn = sessionStorage.getItem('tkn')
        logUserOut();
    }, [])
    
    return (
        <div>

        </div>
    )
}
