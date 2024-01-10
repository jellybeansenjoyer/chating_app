import {createContext,useState,useEffect,useContext} from 'react';
import { useHistory } from 'react-router-dom';
const ChatContext = createContext();
const ChatProvider = ({children}) => {
    const [user,setUser] = useState();
    const [selectedChats,setSelectedChats] = useState();
    const [chats,setChats] = useState([]);
    const history = useHistory();
    useEffect(()=>{
       const userInfo = JSON.parse(localStorage.getItem("userInfo"));
        setUser(userInfo);
        if(!userInfo){
            history.push('/');
            localStorage.getItem("userInfo")
        }
    },[history]);
    return <ChatContext.Provider value={{user,setUser,selectedChats,setSelectedChats,chats,setChats}}>
        {children}
    </ChatContext.Provider>
};

export const ChatState = ()=>{
    return useContext(ChatContext);
};

export default ChatProvider;