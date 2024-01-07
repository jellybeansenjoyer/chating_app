import { Tooltip  , Button, Box, Text, Menu, MenuButton} from '@chakra-ui/react';
import React,{useState} from 'react'
import {BellIcon, ChevronDownIcon} from '@chakra-ui/icons';
import {Avatar} from '@chakra-ui/avatar'
import { ChatState } from '../Context/ChatProvider';

const SideDrawer = () => {
    const [search,setSearch] = useState("");
    const [searchResult,setSearchResult] = useState([]);
    const [loading,setLoading] = useState(false);
    const [loadingChat,setLoadingChat] = useState(false);
    const {user} = ChatState();
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
             <Button variant="ghost" >
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
                       <Avatar size='sm' cursor="pointer" name="user.name"/> 
                    </MenuButton> 
                </Menu> 
            </div>
        </Box>
        </>
    )
}

export default SideDrawer;
