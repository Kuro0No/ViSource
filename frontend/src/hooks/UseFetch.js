import React, { useEffect, useState } from 'react'
import axios from 'axios'

const UseFetch = (url) => {
    const [list, setList] = useState([])
    // const accessToken = JSON.parse(localStorage.getItem('authTokens')).access
    // const config = {
    //     headers: {
    //        "Authorization": `Bearer ${accessToken}`
    //     },
    //     // plenty more options can be added, refer source link above
    // }

    useEffect(() => {
        async function getData() {
            const res = await axios.get(url)
            setList(res.data.results)
            

        }
        getData()
    }, [])


    return {
        list
    }


}

export default UseFetch