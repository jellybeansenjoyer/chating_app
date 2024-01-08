import { Tooltip  , Button, Box, Text, Menu, MenuButton, MenuDivider,MenuItem,MenuList, DrawerOverlay,DrawerHeader,Drawer,DrawerContent, DrawerBody,Input, useToast} from '@chakra-ui/react';
import {Spinner} from '@chakra-ui/spinner';
import React,{useState} from 'react'
import {BellIcon, ChevronDownIcon} from '@chakra-ui/icons';
import {Avatar} from '@chakra-ui/avatar'
import { ChatState } from '../Context/ChatProvider';
import ProfileModal from './ProfileModal';
import { useHistory } from 'react-router-dom';
import {useDisclosure} from '@chakra-ui/hooks'
import axios from 'axios';
import ChatLoading from './ChatLoading';
import UserListItem from '../UserAvatar/UserListItem';
const SideDrawer = () => {
    const [search,setSearch] = useState("");
    const [searchResult,setSearchResult] = useState([]);
    const [loading,setLoading] = useState(false);
    const [loadingChat,setLoadingChat] = useState(false);
    const {user,setSelectedChats,chats,setChats} = ChatState();
    const history = useHistory();
    const {isOpen,onOpen,onClose} = useDisclosure();
    const toast = useToast();
    const accessChat = async (userId)=>{
        console.log(userId)
        try{
            setLoadingChat(true);
            const config = {
                headers:{
                    "Content-type":"application/json",
                    Authorization:`Bearer ${user.token}`
                }
            };

            const {data} = await axios.post('/api/chat',{userId},config);
            if(!chats.find((c)=>c._id===data._id)) setChats([data,...chats]);
            setSelectedChats(data);
            setLoadingChat(false);
            onClose();
        }catch(err){
            toast({
                title:"Error fetching the chat",
                status:"warning",
                description:err.message,
                duration:5000,
                isClosable:true,
                posistion:"bottom-left"
            });
        }
    }
    const handleSearch=async ()=>{
        if(!search){
            toast({
                title:"Please enter something in search",
                status:"warning",
                duration:5000,
                isClosable:true,
                posistion:"top-left"
            })
            return;
        }
        try {
            setLoading(true);
            const config = {
                headers:{
                    Authorization:`Bearer ${user.token}`      
                }
            }
            const {data} = await axios.get(`/api/user?search=${search}`,config);
            setLoading(false);
            setSearchResult(data);
        } catch (error) {
            toast({
                title:"Error Occured!",
                description:"Failed to Load the search result",
                status:"warning",
                duration:5000,
                isClosable:true,
                posistion:"top-left"
            });
            console.log(error.message);
            return;
        }
    }
    const logoutHandler = ()=>{
        localStorage.removeItem("userInfo");
        history.push("/");
      }
    return (
        <>
        <Box
        sx={{display:"flex",justifyContent:"space-between"}}
            d='flex'
            justifyContent="space-between"
            alignItems="center"
            bg='white'
            w="100"
            p="5px 10px 5px 10px"
            borderWidth="5px"
        >
            <Tooltip
                label = "Search Users to Chat"
                hasArrow placement = "bottom-end"
            >
             <Button variant="ghost" onClick={onOpen} >
             <i class="fas fa-search"></i>
             <Text d={{base:'none',md:'flex'}} px='4'>
                Search User
             </Text>
             </Button>   
            </Tooltip>
            <Text fontSize="2xl" fontFamily="Work sans">
                Talk-A-Tive
            </Text>
            <div>
                <Menu>
                    <MenuButton p={1}>
                        <BellIcon fontSize="2xl" m={1}/>
                    </MenuButton>
                    {/* <MenuList>
                    </MenuList> */}
                </Menu>
                 <Menu>
                    <MenuButton as={Button} rightIcon={<ChevronDownIcon/>}>
                       <Avatar size='sm' cursor="pointer" name="user.name" src={user.pic}/>
                    </MenuButton> 
                    <MenuList>
                        <ProfileModal user = {user}>
                        <MenuItem>My Profile</MenuItem>
                        </ProfileModal>
                        <MenuDivider/>
                        <MenuItem onClick={logoutHandler}>Logout</MenuItem>
                    </MenuList>
                </Menu> 
            </div>
        </Box>
        <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
            <DrawerOverlay/>
            <DrawerContent>
                <DrawerHeader borderBottomWidth="1px">Search Users</DrawerHeader>
                <DrawerBody>
                <Box sx={{display:"flex"}} d="flex" pb={2}>
                    <Input placeholder="Search by name or email"
                            mr={2}
                            value={search}
                            onChange={(e)=>{
                                setSearch(e.target.value)
                            }}/>
                    <Button onClick={handleSearch}>Go</Button>
                </Box>
                {loading ? (
                    <ChatLoading/>
                ):(
                    // <span>results</span>
                    searchResult?.map(user=>(
                        <UserListItem
                            key={user._id}
                            user={user}
                            handleFunction={()=>accessChat(user._id)}
                        />
                    ))
                )}
                {loadingChat && <Spinner ml="auto" d="flex" />}
            </DrawerBody>            
            </DrawerContent>
        </Drawer>
        </>
    )
}

export default SideDrawer;
