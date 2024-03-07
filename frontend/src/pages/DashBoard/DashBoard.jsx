import axios from "axios"
import {useNavigate } from "react-router-dom"
import { useState,useEffect,useContext} from "react"
import { AppContext } from "../../App"
import Form from "../../Component/Form"
import { Link } from "react-router-dom"
import styles from './DashBoard.module.css'
axios.defaults.withCredentials = true


function DashBoard(){
     
    const {auth,setAuth} = useContext(AppContext)
    const {user,setUser} = useContext(AppContext)
    const {produtos,dispatch} = useContext(AppContext)

    const [file,setFile] = useState("")
    const [price,setPrice] = useState("")
    const [name,setName] = useState("")
    const [id,setId] = useState("")

     
    const data = new FormData()
    data.append("file",file)
    data.append("name",name)
    data.append("price",price),
    data.append("UserId",id)

    useEffect(()=>{
        const res =  axios.get("http://localhost:3500/user/")
        .then((response)=>{
            setAuth(true)
            setUser(response.data.msg)
            setId(response.data.msg.id)
            dispatch({type:'get',payload : response.data.produts})
        })
        .catch((erro)=>{
            setAuth(false)
            console.log(erro)
            navigate('/login')
        })  
    },[])


    const HandleCreate =(e)=>{
        e.preventDefault()
        axios.post("http://localhost:3500/produts/",data)
        .then((response)=>{
            dispatch({type:'create',payload :response})
            
        })
        .catch((erro)=>console.log(erro))

    }
    const navigate = useNavigate()

    const DeleteProdut = (id)=>{

        axios.delete(`http://localhost:3500/produts/${id}`).then((res)=>{
            dispatch({type:'delete',payload :produtos})
        })
        .catch((erro)=>{console.log(erro)})

    }

    
    return (

        <div className={styles.container}>
            <div className={styles.header}>
            <h1>DashBoard</h1>
            
            <h2> ola {user.name} </h2>
            </div>

            <div className={styles.form} >
            <Form name={name} setName={setName}   file={file} setFile={setFile} price={price} setPrice={setPrice}  submit={"Cadastrar"} onSubmit={HandleCreate}  id={id}/>
            </div>
            
            <div className={styles.produts}  >

            {
                produtos.map((produto)=>(
                    
                    <div key={produto.id} className={styles.produt}>
                        
                        <img src={`http://localhost:3500/upload/${produto.file}`} alt={produto.file} />
                        <div className={styles.content}>

                        <p>{produto.name}</p>
                        <p>{produto.price} escudos</p>
                        </div>

                        <div className={styles.btn}>
                        <Link to={`/dashboard/edit/${produto.id}`} className={styles.title}> <input type="button"  value={"Alterar"}  /></Link>
                          
                           <input type="button" value={"Remover"} onClick={()=>{DeleteProdut(produto.id)}} />
                            
                        </div>
                        
                        
                        
                    </div>
                ))
            }

            </div>
           
        </div>
    )
}

export default DashBoard