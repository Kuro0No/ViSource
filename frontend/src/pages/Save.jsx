import React from 'react'
import { useAuth } from '../hooks/useAuth'
import { FolderOpenOutlined } from '@ant-design/icons'
import '../style/Save.scss'
import { Link } from 'react-router-dom'


const Save = () => {
    const { user } = useAuth()
    return (
        <div className='save-container'>
            {!user ?
                <div className='save-bef-loggin'>

                    <div >
                        <FolderOpenOutlined style={{ fontSize: 100 }} />
                        <h5>You need to Login to see your saved video</h5>
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

export default Save