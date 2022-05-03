import React from 'react'
import { Form, Input, Button, Checkbox } from 'antd';
import { useAuth } from '../hooks/useAuth';
import '../style/Register.scss'
import { LockOutlined, MailOutlined, UserOutlined } from '@ant-design/icons';

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
                    name="email"
                    rules={[{ type: 'email', required: true, message: 'Please input your email!' }]}
                >
                    <Input prefix={<MailOutlined className="site-form-item-icon" />} placeholder="Email" />

                </Form.Item>
                <Form.Item
                    name="username"
                    rules={[{ required: true, message: 'Please input your username!' }]}
                >
                    <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />

                </Form.Item>

                <Form.Item
                    name="password"
                    rules={[{ required: true, message: 'Please input your password!' }]}
                >
                    <Input
                        prefix={<LockOutlined className="site-form-item-icon" />}
                        type="password"
                        placeholder="Password"
                    />
                </Form.Item>

                <Form.Item >
                    <Button type="primary" htmlType="submit">
                        Register
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
}

export default Register