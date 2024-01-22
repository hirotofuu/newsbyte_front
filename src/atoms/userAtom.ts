import { atom, useRecoilState } from 'recoil';
import { User } from '../types/user'; 

// recoilのatom


export const currentUserState = atom< null | User>({
  key: 'currentUser',
  default: null,
});

export const tokenState = atom< null | string>({
  key: 'token',
  default: null,
});
