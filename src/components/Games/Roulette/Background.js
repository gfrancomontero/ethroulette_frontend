import Image from 'next/image'
import styles from './Background.module.scss'


export default function Background() {
  return <Image src="/images/games/roulette.png" className={`absolute w-full h-full ${styles.image}`} alt="Roulette Image" width={1000} height={1000}/>
}