import React, { useCallback, useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useHttp } from "../hooks/http.hook";
import { Loader } from "../components/Loader";
import { LinksList } from "../components/LinksList";

export const LinksPage = () =>{
    const [links,setLinks] = useState([])
    const {loading,request} = useHttp()
    const {token} = useContext(AuthContext)

    const featchLinks = useCallback(async () =>{
        try{
            const featched = await request('http://localhost:5000/api/link/','GET',null,{
                Authorization:`Bearer ${token}`
            })
            setLinks(featched)
        } catch(error){

        }
    },[token,request])

    useEffect(()=>{
        featchLinks()
    },[featchLinks])
    if(loading){
        return <Loader/>
    }
    return (
        <div>
            {!loading && <LinksList links={links}/>}
        </div>
    )
}