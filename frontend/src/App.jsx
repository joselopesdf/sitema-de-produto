

import {Routes,Route,BrowserRouter as Router} from "react-router-dom"
import './App.css'

import Home from './pages/Home/Home'
import NavBar from './pages/NavBar/NavBar'
import Register from './pages/Auth/Register'
import Login from './pages/Auth/Login'
import DashBoard from './pages/DashBoard/DashBoard'
import Edit from "./pages/DashBoard/Edit"


import { useState ,createContext,useReducer} from 'react'

export  const AppContext = createContext()

function App() {

  const update =(state,action)=>{

    switch (action.type) {
      case 'get' :
        return {
          produtos : action.payload
        }
      case 'delete' :
        return {
          produtos : [action.payload]
        }
      case 'create' :
          return {
            produtos : [action.payload,...state.produtos]
          }
      
      default : return state


    }


  }

  const [state,dispatch] =useReducer(update,{produtos :[]})

  const [auth,setAuth] = useState(false)
  const [user,setUser] = useState("")


  return (
    
    <AppContext.Provider value={{auth,setAuth,user,setUser,...state,dispatch,}}>

    <Router>
      <NavBar/>
      <Routes>
      <Route path='/'  element = {<Home/>}  />
      <Route path='/dashboard'  element = {<DashBoard/>}  />
      <Route path='/register'  element = {<Register/>}  />
      <Route path='/login'  element = {<Login/>}  />
      <Route path='/dashboard/edit/:id'  element = {<Edit/>}  />
      

      </Routes>

    </Router> 
   </AppContext.Provider>

  )

}

export default App
