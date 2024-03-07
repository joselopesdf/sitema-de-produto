import Form from "../../Component/Form"
import { AppContext } from "../../App"
import {useNavigate } from "react-router-dom"
import { useState,useEffect,useContext } from "react"
import styles from './Edit.module.css'

import axios from "axios"
import { useParams } from "react-router-dom"

function Edit(){
   
    const [file,setFile] = useState("")
    const [price,setPrice] = useState("")
    const [name,setName] = useState("")
    const  [id,setId]=useState()
    const {auth,setAuth} = useContext(AppContext)
    const navigate = useNavigate()

   const MyId = useParams()
   const Id = MyId.id
   
    const Mydata = new FormData()
        Mydata.append("file",file)
        Mydata.append("name",name)
        Mydata.append("price",price)
        Mydata.append("UserId",id)

    useEffect(()=>{
        
        axios.get(`http://localhost:3500/produts/${Id}`).then((response)=>{
            
            setName(response.data.msg.name)
            setPrice(response.data.msg.price)
            setFile(response.data.msg.file)
            setId(response.data.msg.UserId)
            setAuth(true)
        })
        .catch((erro)=>{console.log(erro)
            console.log(erro)
            if(erro.response.data.msg==="token nao encontrado"){

                navigate("/login") 
            }
            setAuth(false)})
    },[])

    const HandleEditar = (e)=>{
        e.preventDefault()
        axios.patch(`http://localhost:3500/produts/${Id}`,Mydata)
        .then((response)=>{
            navigate('/dashboard')
            
            
        })
        .catch((erro)=>{console.log(erro)
           } )
     
    }
    return (
        <div className={styles.container}>


            <div className={styles.form}>
            <Form name={name} setName={setName} price={price} setPrice={setPrice} file={file} setFile={setFile} id={id} submit={"Editar"} onSubmit={HandleEditar}  />

            </div>

        </div>
    )
}
export default Edit