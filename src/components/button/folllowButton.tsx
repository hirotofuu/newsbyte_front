// ボタンのコンポーネント

type Props = {
  onClick : VoidFunction
  display: string
}

export const FollowButton:React.FC<Props> = ({onClick, display}) => {



  return(
    <>
        <button onClick={onClick} className="block border-2 m-3 mt-4 text-blue-500  text-sm h-8 font-semibold px-2   rounded-l-full rounded-r-full "> {display}</button>
    </>
     )
};

export default FollowButton;