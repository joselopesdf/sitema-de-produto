import { useState } from "react"
import axios from "axios"
import { useContext } from "react"
import { AppContext } from "../App"

import styles from "./Form.module.css"

function Form({name,price,file,setName,setFile,setPrice,submit,onSubmit,id}){

    
    return (

        <div className={styles.container} >
            <div className={styles.form}>

            <form  encType="multipart/form-data" onSubmit={onSubmit} >
            <input type="hidden" name="UserId" value={id}  />

            <input type="text"  name="name" placeholder="Nome do Produto" onChange={(e)=>{setName(e.target.value)}} value={name}  />

            <input type="number" value={price} name="price" placeholder="Preco do Produto" onChange={(e)=>{setPrice(e.target.value)}}   />
            
            <input type="file"  name="file" onChange={(e)=>{
                setFile(e.target.files[0])
            }}   />
            <input type="submit" value={submit}  />
            </form>
            </div>
        </div>
    )

}

export default Form