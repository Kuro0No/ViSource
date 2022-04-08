import React, { useEffect, useState } from 'react'
import axios from 'axios'

const UseFetch = (url) => {
    const [list,setList] = useState([])
    
    useEffect(() => {
        async function getData (){
            const res = await axios.get(url)
            setList(res.data)
            
        } 
        getData()
    },[])

    

    return {
        list
    }

  
}

export default UseFetch