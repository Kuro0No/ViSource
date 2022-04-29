import React, { useEffect, useState } from 'react'
import axios from 'axios'

const UseFetch = (url, url2, url3) => {
    const [list, setList] = useState([])
    const [listMusic, setListMusic] = useState([])
    const [listAnimation, setListAnimation] = useState([])

    const [listOrigin, setlistOrigin] = useState([])
    const [width, setWidth] = useState(window.innerWidth)


    useEffect(() => {
        async function getData() {
            const res = axios.get(url)
            const res2 = axios.get(url2)
            const res3 = axios.get(url3)
        
            Promise.all([res, res2,res3]).then(function (values) {
                setList(values[0].data.results)
                setListMusic(values[1].data.results)
                setListAnimation(values[2].data.results)
            }).catch(function (err) {
                console.log(err);
            })
        }
        getData()
    }, [])





    useEffect(() => {
        window.addEventListener('resize', () => {
            setWidth(window.innerWidth)

        })
    }, [])
    // useEffect(() => {
    //     if (width >= 992) setList([...listOrigin])
    //     else if (width >= 768 && width < 992) setList([...listOrigin].splice(0, 6))
    //     else if (width < 768 && width > 576) setList([...listOrigin].splice(0, 4))
    //     else { setList([...listOrigin].splice(0, 2)) }


    // }, [width])


    return {
        list,listMusic, listAnimation
    }


}

export default UseFetch