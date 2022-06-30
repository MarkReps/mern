import React, { useContext, useState } from "react";
import {useNavigate} from "react-router-dom";

import { AuthContext } from "../context/AuthContext";
import { useHttp } from "../hooks/http.hook";

export const CreatePage = () =>{

    const navigate = useNavigate()
    const {request} = useHttp()
    const auth = useContext(AuthContext)
    const [link,setLink] = useState('')

    const pressHandler = async event =>{
        if(event.key ==="Enter"){
            try {
                const data = await request('http://localhost:5000/api/link/generate','POST',{from:link},{Authorization:`Bearer ${auth.token}`})
                navigate(`/detail/${data.link._id}`)
            } catch (error) {
                
            }
        }
    }

    return (
        <div className="row">
            <div className="col s8 offset-2" style={{paddingTop:'2rem'}}>
                <div className="input-field ">
                    <input placeholder="Введите ссылку"
                            id="link"
                            type="text"
                            name="link"
                            value={link}
                            onChange={e => setLink(e.target.value)}
                            onKeyPress ={pressHandler}
                            />
                </div>
            </div>
        </div>
    )
}