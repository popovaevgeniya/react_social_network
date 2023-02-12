import React, {useEffect, useState} from 'react';
import {Avatar, Button, Form, Input} from 'antd';
import {UserOutlined} from '@ant-design/icons';
import {ChatMessageType} from '../../api/chat-api';

export const Chat: React.FC = () => {
    const [wsChannel, setWsChannel] = useState<WebSocket | null>(null)
    useEffect(() => {
        let ws: WebSocket

        const closeHandler = () => {
            console.log('CLOSE WS');
            setTimeout(createChannel, 3000)
        }

        function createChannel() {
            // if (ws) {} ===> ws?.
            ws?.removeEventListener('close', closeHandler)
            ws?.close()
            ws = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx')
            ws.addEventListener('close', closeHandler)
            setWsChannel(ws)
        }
        createChannel()

        // like componentWilUnmount
        // clean up
        return () => {
            ws.removeEventListener('close', closeHandler)
            ws.close()
        }
    }, [])

    return <div>
        <Messages wsChannel={wsChannel}/>
        <AddMessageForm wsChannel={wsChannel}/>
    </div>
}

const Messages: React.FC<{wsChannel: WebSocket | null}> = ({wsChannel}) => {
    const [messages, setMessages] = useState<ChatMessageType[]>([])
    useEffect(() => {
        const messageHandler = (e: MessageEvent) => {
            const newMessages = JSON.parse(e.data);
            setMessages((prevMessages) => [...prevMessages, ...newMessages])
        };
        wsChannel?.addEventListener('message', messageHandler)

        return () => {
            wsChannel?.removeEventListener('message', messageHandler)
        }
    }, [wsChannel])

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

const AddMessageForm: React.FC<{wsChannel: WebSocket | null}> = ({wsChannel}) => {
    const {TextArea} = Input
    const [form] = Form.useForm()
    const [readyStatus, setReadyStatus] = useState<'pending' | 'ready'>('pending')

    const onFinish = (values: any) => {
        wsChannel?.send(values.message)
        form.resetFields()
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    useEffect(() => {
        let openHandler = () => {
            setReadyStatus('ready')
        }
        wsChannel?.addEventListener('open', openHandler)

        return () => {
            wsChannel?.removeEventListener('open', openHandler)
        }
    }, [wsChannel])

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
                <Button type="primary" htmlType="submit" disabled={!wsChannel || readyStatus !== 'ready'}>
                    Send
                </Button>
            </Form.Item>
        </Form>
    </div>
}