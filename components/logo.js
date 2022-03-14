import Image from 'next/image'
import Link from 'next/link'

const Logo = ({ width, height }) => {
    return (
        <Link href="/">
            <Image src="/lendsqr.png" width={width} height={height}/>        
        </Link>
    )
}

Logo.defaultProps = {
    width: 20,
    height: 20,
  }
  
export default Logo