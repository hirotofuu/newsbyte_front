import { useRecoilValue, useSetRecoilState } from 'recoil';
import { currentUserState, tokenState } from '../atoms/userAtom'

// recoil用ユーザー、トークン情報操作用フック

export function useUserState() {
  const userState = useRecoilValue(currentUserState);
  const setUserState = useSetRecoilState(currentUserState);
  const isAuthChecking = userState === undefined;
  return {
    userState,
    setUserState,
    isAuthChecking,
  };
}

export function useTokenState() {
  const TokenState = useRecoilValue(tokenState);
  const setTokenState = useSetRecoilState(tokenState);

  return {
    TokenState,
    setTokenState,
  };
}
