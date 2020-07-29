import React from "react";
import s from './Users.module.css';

const Users = (props) => {
    return (
        <div>
            {
                props.users.map((u) => <div key={u.id} className={s.item}>
                    <span className={s.area}>
                        <div>
                            <img src={u.photoUrl} alt='user_photo' className={s.photo}/>
                        </div>
                        <div>
                            { u.subscribed
                            ? <button onClick={ () => {props.unsubscribe(u.id)} }>Unsubscribe</button>
                            : <button onClick={ () => {props.subscribe(u.id)} }>Subscribe</button> }
                        </div>
                    </span>
                    <span className={s.area + '' + s.field}>
                        <span className={s.area}>
                            <div>{u.fullName}</div>
                            <div>{u.status}</div>
                        </span>
                        <span className={s.area}>
                             <div>{u.location.country}</div>
                             <div>{u.location.city}</div>
                        </span>
                    </span>
                </div>)
            }
        </div>
    )
}

export default Users;