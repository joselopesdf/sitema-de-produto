import axios from "axios"
import { useState } from "react"
import {useNavigate } from "react-router-dom"

import styles from './Register.module.css'

function  Register() {
const navigate = useNavigate()
   
const [name,setName] = useState("")
const [email,setEmail] = useState("")
const [password,setPassword] = useState("")
const [confirmpassword,setConfirmpassword] = useState("")

const data = {
    name,
    email,
    password,
    confirmpassword
}

    const HandleRegister = ()=>{

        axios.post("http://localhost:3500/user/register",data).then((response)=>{
            console.log(response)
            navigate('/login')

        })
        .catch((erro)=>{
            console.log(erro)
        })
    }

    return (
        <div className={styles.RegisterForm}>


            <div className={styles.container}>
            <div className={styles.element} >
            <label htmlFor="name" id="name">Name:</label>
            <input type="text" name="name"  placeholder="Digite o seu nome" onChange={(e)=>{
                setName(e.target.value)
            }} />
           </div>

           <div className={styles.element}>
            <label htmlFor="email" id="email">Email:</label>
            <input type="email" name="email" placeholder="Digite o seu email" onChange={(e)=>{
                setEmail(e.target.value)
            }} />
           </div>

           <div className={styles.element}>
            <label htmlFor="password" id="password">Senha:</label>
            <input type="password" name="password" placeholder="Digite  a sua senha" onChange={(e)=>{
                setPassword(e.target.value)
            }} />
           </div>

           <div className={styles.element}>
            <label htmlFor="confirmpassword" id="confirmpassword" >Confirme a Senha:</label>
            <input type="password"  name="confirmpasword" placeholder="Confirme a senha" onChange={(e)=>{
                setConfirmpassword(e.target.value)
            }}  />
           </div>

           <div className={styles.btn}>
            <input type="button" value="Register"  onClick={HandleRegister} />
           </div>
           

                
            </div>


          

        </div>




    )
    
}
export default Register