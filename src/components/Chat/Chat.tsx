import React, {useEffect} from 'react';
import {Avatar, Button, Form, Input} from 'antd';
import {UserOutlined} from '@ant-design/icons';
import {ChatMessageType} from '../../api/chat-api';
import {useDispatch, useSelector} from 'react-redux';
import {sendMessages, startMessagesListening, stopMessagesListening} from '../../redux/chat/chat-reducer';
import {AppSateType} from '../../redux/redux-store';

export const Chat: React.FC = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(startMessagesListening())

        return () => {
            dispatch(stopMessagesListening())
        }
    }, [])

    return <div>
        <Messages/>
        <AddMessageForm/>
    </div>
}

const Messages: React.FC = () => {
    const messages = useSelector((state: AppSateType) => state.chat.messages)

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
    const [form] = Form.useForm()
    const dispatch = useDispatch()

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
                <Button type="primary" htmlType="submit">
                    Send
                </Button>
            </Form.Item>
        </Form>
    </div>
}