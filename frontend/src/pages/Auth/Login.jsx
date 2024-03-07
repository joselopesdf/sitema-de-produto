import axios from "axios"

import {useNavigate } from "react-router-dom"
import { useState ,useContext} from "react"
import {AppContext} from '../../App'

import styles from './Login.module.css'


function Login(){

const {auth} = useContext(AppContext)
const {setAuth} = useContext(AppContext)
const [email,setEmail] = useState("")
const [password,setPassword] = useState("")
const navigate = useNavigate()

const data = {
    email,
    password
}

const HandleLogin = ()=>{
    axios.post("http://localhost:3500/user/login",data).then((response)=>{
        setAuth(true)
        navigate('/dashboard')
        console.log(auth)
    })
    .catch((erro)=>{
        setAuth(false)
        console.log(erro)
       
    })
}

    return (

        <div className={styles.LoginForm}>

            <div className={styles.container}>
            <div  className={styles.element}>
            <label htmlFor="email" id="email">Email:</label>
            <input type="email" name="email" placeholder="Digite o seu email" onChange={(e)=>{
                setEmail(e.target.value)
            }} />
           </div>

           <div className={styles.element} >
            <label htmlFor="password"id="password">Senha:</label>
            <input type="password" name="password" placeholder="Digite  a sua senha" onChange={(e)=>{
                setPassword(e.target.value)
            }} />
           </div>

           <div className={styles.btn}>
            <input type="button" value="Login"  onClick={HandleLogin} />
           </div>


            </div>

        
            

        

        </div>
    )
}
export default Login