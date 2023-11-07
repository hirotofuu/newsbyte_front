import { useRecoilValue, useSetRecoilState } from 'recoil';
import { currentUserState, tokenState } from '../atoms/userAtom'

export function useUserState() {
  const userState = useRecoilValue(currentUserState);
  const setUserState = useSetRecoilState(currentUserState);

  return {
    userState,
    setUserState,
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
