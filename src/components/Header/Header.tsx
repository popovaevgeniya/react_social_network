import React from 'react';
import {Link} from 'react-router-dom';
import {Button, Typography} from 'antd';
import {selectCurrentUserLogin, selectIsAuth} from '../../redux/auth/auth-selectors';
import {useDispatch, useSelector} from 'react-redux';
import {logout} from '../../redux/auth/auth-reducer';
import './Header.css';
import {UserAvatar} from '../Avatar/Avatar';

const HeaderApp: React.FC = () => {
    const { Text } = Typography;

    const isAuth = useSelector(selectIsAuth)
    const login = useSelector(selectCurrentUserLogin)

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
                            <UserAvatar small/>
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