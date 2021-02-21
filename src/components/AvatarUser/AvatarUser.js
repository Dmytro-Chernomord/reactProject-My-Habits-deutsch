import React from 'react';
import { useSelector } from 'react-redux';
import userSelector from '../../redux/user/userSelector';
import avatars from '../../avatars';
import s from './Avatar.module.css';

const AvatarUser = ({ width }) => {
  const state = useSelector(state => state);
  const avatar = userSelector.getAvatar(state);
  return (
    <div className={s.avatarBox}>
      {avatars.map(el => {
        if (avatar === el.id) {
          return (
            <img
              className={s.avatar}
              key={el.id}
              src={el.avatar}
              alt="avatar"
              width={width}
            />
          );
        }
      })}
    </div>
  );
};

export default AvatarUser;
