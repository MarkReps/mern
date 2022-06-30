import React, { useCallback, useContext, useEffect, useState } from "react";
import {useParams} from "react-router-dom";

import { Loader } from "../components/Loader";
import { LinkCard } from "../components/LinkCard";
import { AuthContext } from "../context/AuthContext";
import { useHttp } from "../hooks/http.hook";

export const DetailPage = () =>{
    const {token} = useContext(AuthContext)
    const {request, loading} = useHttp()
    const [link,setLink] = useState(null)
    const linkId = useParams().id;

    const getLink = useCallback(async ()=> {
        try{    
            const featched = await request(`http://localhost:5000/api/link/${linkId}`,'GET',null,{
                Authorization:`Bearer ${token}`
            })
            setLink(featched)
        } catch(error){
            console.log(error.message)
        }
    },[token,linkId,request])

    useEffect(()=>{
        getLink()
    },[getLink])

    if(loading){
        return <Loader/>
    }

    return (
        <div>
            {!loading && link && <LinkCard link={link}/>}
        </div>
    )
}