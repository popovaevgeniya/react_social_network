import React from "react";
import s from './Users.module.css';
import * as axios from 'axios';
import userPhoto from '../../assets/images/1200px-User_icon_2.svg.png';

class Users extends React.Component {
    componentDidMount() {
        axios.get('https://social-network.samuraijs.com/api/1.0/users').then(response => {
            this.props.setUsers(response.data.items);
        });
    }

    render() {
        let pagesCount = this.props.totalUsersCount / this.props.pageSize;
        let pages = [];
        for (let i=1; i<=pagesCount; i++){
            <span className={this.props.currentPage === p && s.selectedPage}> {p} </span>
            pages.push(i);
        }
        return (
            <div>
                <div>
                    <span>1</span><span>2</span><span>3</span><span>4</span><span>5</span>
                </div>
                <button onClick={this.getUsers}>Get Users</button>
                {
                    this.props.users.map((u) => <div key={u.id} className={s.item}>
                    <span className={s.area}>
                        <div>
                            <img src={u.photos.small != null ? u.photos.small : userPhoto} alt='user_photo' className={s.photo}/>
                        </div>
                        <div>
                            { u.subscribed
                                ? <button onClick={ () => {this.props.unsubscribe(u.id)} }>Unsubscribe</button>
                                : <button onClick={ () => {this.props.subscribe(u.id)} }>Subscribe</button> }
                        </div>
                    </span>
                        <span className={s.area + '' + s.field}>
                        <span className={s.area}>
                            <div>{u.name}</div>
                            <div>{u.status}</div>
                        </span>
                        <span className={s.area}>
                             {/*<div>{u.location.country}</div>
                             <div>{u.location.city}</div>*/}
                        </span>
                    </span>
                    </div>)
                }
            </div>
        )
    }
}

export default Users;