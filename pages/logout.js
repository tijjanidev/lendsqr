import Link from 'next/link'

import { useRouter } from 'next/router'


export default function Logout() {
    const router = useRouter()

    const logUserOut = async (event) => {
        sessionStorage.clear();
        router.push('/login');        
    }

    logUserOut();

    return (
        <div>

        </div>
    )
}
