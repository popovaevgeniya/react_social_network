import React, {useEffect, useRef, useState} from 'react';
import {Avatar, Button, Form, Input} from 'antd';
import {UserOutlined} from '@ant-design/icons';
import {ChatMessageAPIType} from '../../api/chat-api';
import {useDispatch, useSelector} from 'react-redux';
import {sendMessages, startMessagesListening, stopMessagesListening} from '../../redux/chat/chat-reducer';
import {selectChatMessages, selectChatStatus} from '../../redux/chat/chat-selectors';

export const Chat: React.FC = () => {
    const status = useSelector(selectChatStatus)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(startMessagesListening())

        return () => {
            dispatch(stopMessagesListening())
        }
    }, [])

    return <div>
        {status === 'error' && <div>Some error occurred. Please refresh the page.</div>}
        <>
            <Messages/>
            <AddMessageForm/>
        </>
    </div>
}

const Messages: React.FC = () => {
    const messages = useSelector(selectChatMessages)
    const messagesAnchorRef = useRef<HTMLDivElement>(null)
    const [isAutoScroll, setIsAutoScroll] = useState(true)

    const scrollHandler = (e: React.UIEvent<HTMLDivElement, UIEvent>) => {
        const element = e.currentTarget
        if (Math.abs((element.scrollHeight - element.scrollTop) - element.clientHeight) < 300) {
            !isAutoScroll && setIsAutoScroll(true)
        } else {
            isAutoScroll && setIsAutoScroll(false)
        }
    }

    useEffect(() => {
        if (isAutoScroll) {
            messagesAnchorRef.current?.scrollIntoView({behavior: 'smooth'})
        }
    }, [messages])

    return <div style={{height: '600px', overflowY: 'auto'}} onScroll={scrollHandler}>
        {messages.map((message, i) => <Message message={message} key={`${i}_${message.userId}_${message.message}`}/>)}
        <div ref={messagesAnchorRef}></div>
    </div>
}

const Message: React.FC<{ message: ChatMessageAPIType }> = React.memo(({message}) => (
    <div>
        {message.photo ? <img src={message.photo} alt='User avatar' style={{width: '32px', borderRadius: '6px'}}/>
            : <Avatar size={32} shape='square' icon={<UserOutlined/>}/>}
        <b>{message.userName}</b>
        <p>{message.message}</p>
        <hr/>
    </div>
))

const AddMessageForm: React.FC = () => {
    const {TextArea} = Input
    const [form] = Form.useForm()
    const dispatch = useDispatch()
    const status = useSelector(selectChatStatus)

    const onFinish = ({message}: any) => {
        dispatch(sendMessages(message))
        form.resetFields()
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    return <div><br/>
        <Form
            form={form}
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
                <Button type="primary" htmlType="submit" disabled={status !== 'ready'}>
                    Send
                </Button>
            </Form.Item>
        </Form>
    </div>
}