import { useRecoilValue, useSetRecoilState } from 'recoil';
import { currentUserState } from '../atoms/userAtom'

export function useUserState() {
  const userState = useRecoilValue(currentUserState);
  const setUserState = useSetRecoilState(currentUserState);

  return {
    userState,
    setUserState,
  };
}
