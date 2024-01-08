import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { ChatState } from '../Context/ChatProvider';
import SideDrawer from '../miscellaneous/SideDrawer';
import ChatBox from '../miscellaneous/ChatBox';
import MyChats from '../miscellaneous/MyChats';
import { Box} from '@chakra-ui/react';
const Chatpage = () => {
    const {user} = ChatState();
    return (
    <div style={{width:'100%'}}>
        {user && <SideDrawer/>}
        <Box
        sx={{display:'flex' ,justifyContent:'space-between', flexDir:'row'}}
        d='flex'
        justifyContent='space-between'
        w='100%'
        h='91.5vh'
        p='10px'
        >
            {user && <MyChats/>}
            {user && <ChatBox/>}

        </Box>
    </div>
  )
}

export default Chatpage
