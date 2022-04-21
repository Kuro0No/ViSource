import React from 'react'
import { useAuth } from '../hooks/useAuth'
import { HistoryOutlined } from '@ant-design/icons'
import '../style/History.scss'
import { Link } from 'react-router-dom'


const History = () => {
    const { user } = useAuth()
    return (
        <div className='history-container'>
            {!user ?
                <div className='history-bef-loggin'>

                    <div >
                        <HistoryOutlined  style={{ fontSize: 100 }} />
                        <h5>You need to Login to see your watched video</h5>
                        <Link type='button' className='btn btn-outline-primary'  to='/login' danger >
                            Login
                        </Link>
                    </div>
                </div>
                :
                <>
                </>
            }
        </div>
    )
}

export default History