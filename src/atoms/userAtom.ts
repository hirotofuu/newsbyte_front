import { atom, useRecoilState } from 'recoil';
import { User } from '../types/user'; 

// recoilのatom

// Atomとは状態の単位です。Atomが更新されるとコンポーネントは再レンダリングされます。
// 同じAtomが複数のコンポーネントで使われるとき、すべてのコンポーネントがそのAtomを共有します。


export const currentUserState = atom< null | User>({
  key: 'currentUser',
  default: null,
});

export const tokenState = atom< null | string>({
  key: 'token',
  default: null,
});
