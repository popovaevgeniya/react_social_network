import React, {useEffect, useState} from 'react';
import {Avatar, Button, Form, Input} from 'antd';
import {UserOutlined} from '@ant-design/icons';

const wsChannel = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx')

type ChatMessageType = {
    userId: number
    userName: string
    photo: string
    message: string
}
export const Chat: React.FC = () => {
    return <div>
        <Messages/>
        <AddMessageForm/>
    </div>
}

const Messages: React.FC = () => {
    const [messages, setMessages] = useState<ChatMessageType[]>([])
    useEffect(() => {
        wsChannel.addEventListener('message', (e) => {
            const newMessages = JSON.parse(e.data);
            setMessages((prevMessages) => [...prevMessages, ...newMessages])
        })
    }, [])

    return <div style={{height: '600px', overflowY: 'auto'}}>
        {messages.map((message, i) => <Message message={message} key={`${i}_${message.userId}_${message.message}`}/>)}
    </div>
}
const Message: React.FC<{ message: ChatMessageType }> = ({message}) => (
    <div>
        {message.photo ? <img src={message.photo} alt='User avatar' style={{width: '32px', borderRadius: '6px'}}/>
            : <Avatar size={32} shape='square' icon={<UserOutlined/>}/>}
        <b>{message.userName}</b>
        <p>{message.message}</p>
        <hr/>
    </div>
)

const AddMessageForm: React.FC = () => {
    const {TextArea} = Input

    const onFinish = (values: any) => {
        wsChannel.send(values.message)
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    return <div><br/>
        <Form
            name="addMessageForm"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
        >
            <Form.Item
                name="message"
                rules={[{ required: true, message: 'Please input your message!' }]}
            >
                <TextArea rows={4}/>
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="submit">
                    Send
                </Button>
            </Form.Item>
        </Form>
    </div>
}