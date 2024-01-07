import { Tooltip  , Button, Box, Text, Menu, MenuButton, MenuDivider,MenuItem,MenuList, DrawerOverlay,DrawerHeader,Drawer,DrawerContent, DrawerBody,Input} from '@chakra-ui/react';
import React,{useState} from 'react'
import {BellIcon, ChevronDownIcon} from '@chakra-ui/icons';
import {Avatar} from '@chakra-ui/avatar'
import { ChatState } from '../Context/ChatProvider';
import ProfileModal from './ProfileModal';
import { useHistory } from 'react-router-dom';
import {useDisclosure} from '@chakra-ui/hooks'
const SideDrawer = () => {
    const [search,setSearch] = useState("");
    const [searchResult,setSearchResult] = useState([]);
    const [loading,setLoading] = useState(false);
    const [loadingChat,setLoadingChat] = useState(false);
    const {user} = ChatState();
    const history = useHistory();
    const {isOpen,onOpen,onClose} = useDisclosure();
    const handleSearch=()=>{

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
            </DrawerBody>            
            </DrawerContent>
        </Drawer>
        </>
    )
}

export default SideDrawer;
