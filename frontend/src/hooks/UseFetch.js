import React, { useEffect, useState } from 'react'
import axios from 'axios'

const UseFetch = (url) => {
    const [list, setList] = useState([])
    const [listOrigin,setlistOrigin] = useState([])
    const [width, setWidth] = useState(window.innerWidth)
   

    useEffect(() => {
        async function getData() {
            const res = await axios.get(url)
            setList(res.data.results)
            setlistOrigin(res.data.results)


        }
        getData()
    }, [])




    useEffect(() => {
        window.addEventListener('resize', () => {
            setWidth(window.innerWidth)
            
        })
    }, [])
    useEffect(() => {
        if(width > 992) setList([...listOrigin])
        else if(width> 768 && width <992) setList([...listOrigin].splice(0,6))
        else if(width < 768 && width >576) setList([...listOrigin].splice(0,4))
        else{ setList([...listOrigin].splice(0,2))}

      
        
    },[width])


    return {
        list,
    }


}

export default UseFetch