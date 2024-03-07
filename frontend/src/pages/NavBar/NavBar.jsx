import { Link } from 'react-router-dom'
import styles from './NavBar.module.css'
import { useContext} from "react"
import { AppContext } from '../../App'
import Logout from '../../Component/Logout'

function NavBar(){
    const {auth} = useContext(AppContext)


    return (
        <div className={styles.Container} >
            <div>
            <Link to={"/"} className={styles.title}><h1 >MaxProduts</h1></Link>

            </div>

            <div className={styles.navbar}>
            <nav >
            
            <ul >

                <Link to={"/register"}   className={ auth ? styles.hidden :styles.list }> <li>Register </li>  </Link>
                <Link to={"/login"} className={ auth ? styles.hidden :styles.list } > <li>Login </li>  </Link>
                <Logout /  >
            </ul>

        </nav>


            </div>
            

           

        </div>
        

       
    )
}
export default NavBar