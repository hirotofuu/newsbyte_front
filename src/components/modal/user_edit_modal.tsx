  import { ReactNode, useState, useEffect } from 'react';
  import { useRouter } from 'next/router';
  import { useUserState } from '@/hooks/useUser';
  import { useTokenState } from '@/hooks/useUser';
  import {deleteSpaceStr} from "./../../libs/helper"
  import {putt} from "./../../libs/putFunc";
  import {
    Box,
    Modal,
    Button,
    TextareaAutosize,
    Alert,
    TextField
  } from "@mui/material";

  type Props = {
    isModal: boolean
    setIsModal: VoidFunction
  }

  type submission = {
    id: number
    user_name: string
    profile: string
  }

  const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
  };

  const UserEditModal: React.FC<Props> =({isModal, setIsModal})=>{
    const {userState, setUserState} = useUserState()
    const {TokenState} = useTokenState()
    const router = useRouter()
    const [validation, setValidation] = useState("");
    const [submitContent, SetSubmitContent] = useState<submission>({
      id:  0,
      user_name: "",
      profile: ""
    })

    useEffect(()=>{
      SetSubmitContent({
        id: userState ? userState.id : 0,
        user_name: userState ? userState.user_name : "",
        profile: userState ? userState.profile : ""
      })
    }, [userState])

    const update_profile = async() =>{
      if (!userState || !TokenState)return 
      if(!deleteSpaceStr(submitContent.user_name) || submitContent.user_name.length>50){
        setValidation("50字以内の名前が必要です")
        return ;
      }
      if(submitContent.profile.length>200){
        setValidation("プロフィールは200字以内です")
        return ;
      }
      if(submitContent.user_name == userState.user_name && submitContent.profile == userState.profile) {
        setIsModal()
        return ;
      }

      let res: number = await putt(`/user/update_user`, JSON.stringify(submitContent), TokenState ? TokenState : " ")
      if (res==1){
        setUserState({...userState, user_name: submitContent.user_name, profile: submitContent.profile})
        setIsModal()
      }else{
        setValidation("サーバー内でエラーが発生しました")
      }

      }


    return(
      <>
        <Modal
          open={isModal}
          onClose={setIsModal}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
              <h1 className="m-4 font-semibold text-center">ユーザー編集</h1>
              <TextField
              label="表示名"
              className="w-full px-1 mb-3"
              id="user_name"
              name="user_name"
              placeholder="最大100文字"
              size="small"
              value={submitContent.user_name}
              onChange={e => {
                SetSubmitContent({...submitContent, user_name:e.target.value});
              }}
              />
              <h2 className="text-xs text-gray-500">プロフィール</h2>
              <TextareaAutosize
              className="w-full  border-2 p-2"
              id="profile"
              name="profile"
              placeholder="最大100文字"
              value={submitContent.profile}
              onChange={e => {
                SetSubmitContent({...submitContent, profile:e.target.value});
              }}
              />
              {validation ? <Alert className="m-4" variant="filled" severity="error">
                {validation}
              </Alert> : ""}
              <Button className="w-full mt-4" onClick={update_profile}>更新</Button>
          </Box>
        </Modal>     
      </>
    )
  };

  export default UserEditModal;