import { atom, useRecoilState } from 'recoil';
import { User } from '../types/user'; 



export const currentUserState = atom< null | User>({
  key: 'currentUser',
  default: null,
});