import React from "react";
import s from './Users.module.css';

const Users = (props) => {
    if (props.users.length === 0) {
        props.setUsers([
            {id: 1, photoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d2/Crystal_Clear_kdm_user_female.svg/1200px-Crystal_Clear_kdm_user_female.svg.png',
                fullName: 'Evgeniya P.', status: 'I am a boss', location: {city: 'Kharkov', country: 'Ukraine'}, subscribed: true},
            {id: 2, photoUrl: 'https://www.pavilionweb.com/wp-content/uploads/2017/03/man-300x300.png',
                fullName: 'Yaroslav K.', status: 'I am a boss too', location: {city: 'Liman', country: 'Ukraine'}, subscribed: false},
            {id: 3, photoUrl: 'https://i.pinimg.com/originals/a6/58/32/a65832155622ac173337874f02b218fb.png',
                fullName: 'Marina M.', status: 'I am a boss too', location: {city: 'Lothovaya', country: 'Ukraine'}, subscribed: true}
        ]);
    }


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