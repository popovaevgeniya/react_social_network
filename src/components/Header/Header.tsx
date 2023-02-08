import React from "react";
import {Link} from 'react-router-dom';
import {Avatar, Button} from 'antd';
import { Typography } from 'antd';
import {selectCurrentUserLogin, selectIsAuth} from '../../redux/auth-selectors';
import {useDispatch, useSelector} from 'react-redux';
import {logout} from '../../redux/auth-reducer';
import {AppSateType} from '../../redux/redux-store';
import {UserOutlined} from '@ant-design/icons';
import './Header.css';

const HeaderApp: React.FC = () => {
    const { Text } = Typography;

    const isAuth = useSelector(selectIsAuth)
    const login = useSelector(selectCurrentUserLogin)
    const avatar = useSelector((state: AppSateType) => state.profilePage.profile?.photos.small)

    const dispatch = useDispatch()
    const logoutCallBack = () => {
        dispatch(logout())
    }

    return(
        <header className='header'>
            <div className='loginBlock'>
                {isAuth
                    ? <>
                        <Link to={'/profile'} className='avatarBlock'>
                            {avatar ? <img src={avatar} alt='avatar'/>
                                : <Avatar style={{ backgroundColor: '#87d068' }} icon={<UserOutlined />} />}
                            <Text strong type="warning">{login}</Text>
                        </Link>
                        <Button onClick={logoutCallBack}>Logout</Button>
                    </>
                    : <Button><Link to={'/login'}>Login</Link></Button>}
            </div>
        </header>
    )
}

export default HeaderApp;