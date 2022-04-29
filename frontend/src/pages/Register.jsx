import React from 'react'
import { Form, Input, Button, Checkbox } from 'antd';
import { useAuth } from '../hooks/useAuth';
import '../style/Register.scss'

const Register = () => {
    const { register } = useAuth()
    

    return (
        <div className='register-container'>
            <Form
                name="basic"
                labelCol={{ span: 6 }}
                initialValues={{ remember: true }}
                autoComplete="off"
                onFinish={register}
            >
                <Form.Item
                    label="Email"
                    name="email"
                    rules={[{type: 'email', required: true, message: 'Please input your email!' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Username"
                    name="username"
                    rules={[{ required: true, message: 'Please input your username!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Password"
                    name="password"
                    rules={[{ required: true, message: 'Please input your password!' }]}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button type="primary" htmlType="submit">
                        Register
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
}

export default Register