import React, { useContext, useEffect, useState } from "react";

import { AuthContext } from "../context/AuthContext";
import {useHttp} from "../hooks/http.hook";

export const AuthPage = () =>{

    const {loading,error,request,clearError} = useHttp()

    const auth = useContext(AuthContext)

    const [form,setForm] = useState({
        email:"",password:""
    })

    useEffect(()=>{
        clearError()
    },[error,clearError])


    const changeHandler = event =>{
        setForm({...form,[event.target.name]:event.target.value})
    }

    const registerHandler = async() =>{

        try {
            const data = await request('http://localhost:5000/api/auth/register','POST',{...form})
            console.log(data);
        } catch (error) {
            
        }
    }

    const loginHandler = async() =>{
        try {
            const data = await request('http://localhost:5000/api/auth/login','POST',{...form});
            auth.login(data.token,data.userId)
        } catch (error) {
            
        }
    }


    return (
        <div className="row">
            <div className="col s6 offset-s3">
            <h1>Сократи Ссылку</h1>
            <div className="card blue darken-1">
                <div className="card-content white-text">
                    <span className="card-title">Авторизация</span>
    
                    <div >
                        <div className="input-field ">
                            <input 
                            placeholder="Введите email"
                            id="email"
                            type="text"
                            name="email"
                            value={form.email}
                            onChange={changeHandler}
                            />
                        </div>
                        <div className="input-field ">
                            <input 
                            placeholder="Введите пароль"
                            id="password"
                            type="password"
                            name="password"
                            value={form.password}
                            onChange={changeHandler}
                            />
                        </div>    
                    </div>

                </div>
                <div className="card-action">
                    <button 
                    className="btn yellow darken-4" 
                    style={{marginRight:10}}
                    onClick={loginHandler}
                    disabled={loading}
                    >Войти</button>
                    
                    <button 
                    className="btn grey lighten-1 black-text"
                    onClick={registerHandler}
                    disabled={loading}
                    >Регистрация</button>
                    
                </div>
            </div>
            </div>
        </div>
    )
}