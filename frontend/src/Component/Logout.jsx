import axios from 'axios'
import { Link } from 'react-router-dom'
import { useState ,useContext} from "react"
import { AppContext } from '../App'
import { useNavigate } from 'react-router-dom'

import styles from "./Logout.module.css"


function Logout(){
const navigate =  useNavigate()
const {auth} = useContext(AppContext)
const {setAuth} = useContext(AppContext)
const HandleLogout = ()=>{
    axios.post("http://localhost:3500/user/logout",null)
    .then((response)=>{
        setAuth(false)
        navigate("/")
      
    })
    .catch((erro)=>{
        setAuth(true)
        console.log(erro)
    })


}

    return (
        <Link to={"/"}  onClick={HandleLogout}  className={auth  ?  styles.logout :styles.hidden }> <li>Logout </li> </Link>
    )



}
export default Logout