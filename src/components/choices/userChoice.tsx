import Link from "next/link";
import {useUserState, useTokenState} from "../../hooks/useUser"
import { putt } from "@/libs/putFunc";
import { deletee } from "@/libs/deleteFunc";
import {User} from "./../../types/user"
import FollowButton from "./../button/folllowButton"

type Props ={
  user: User | null
}


const UserChoice:React.FC<Props> =({user})=>{
  const {userState, setUserState}=useUserState()
  const {TokenState}=useTokenState()
  const onFollow = async() => {
    if(!userState)return
    let res: number = await putt(`/user/insert_follow/${user?.id}`, "", TokenState ? TokenState : " ")
    if (res==1){
      let demo: number[]=[]
      if(userState.following_user_ids){demo=[...userState.following_user_ids]}
      demo.push(Number(user?.id))
      setUserState({...userState, following_user_ids: demo})
      console.log(userState.following_user_ids)
    }
  }
  const onDeleteFollow = async() => {
    if(!userState)return
    let res: number = await deletee(`/user/delete_follow/${user?.id}`, TokenState ? TokenState : " ")
    if (res==1){
      let demo: number[]=[...userState.following_user_ids]
      demo = demo.filter((i)=> i != Number(user?.id))
      setUserState({...userState, following_user_ids: demo})
    }
  }


  return(
    <>
        <div className="flex border-b w-full bg-white">
        <Link href={`/user/${user?.id_name}`} className="py-3 flex justify-between bg-white w-full ">
            <div className="flex">
              <div className="">
                <h1 className="pt-1 font-semibold">{user?.user_name}</h1>
                <h2 className="text-xs">@{user?.id_name}</h2>
                <p className="mt-1 w-full text-xs line-clamp-3 text-gray-500">{user?.profile}</p>
              </div>
            </div>
        </Link>
        {!userState ?
                <FollowButton onClick={()=>{}} display="follow"></FollowButton>
                : userState.following_user_ids && userState.following_user_ids.length ? userState.following_user_ids.filter((i)=>{i==user?.id}) ?<FollowButton onClick={onDeleteFollow} display="following"></FollowButton> : 
                <FollowButton onClick={onFollow} display="follow"></FollowButton>:
                <FollowButton onClick={onFollow} display="follow"></FollowButton>}
        </div>


    </>
  )
}

export default UserChoice