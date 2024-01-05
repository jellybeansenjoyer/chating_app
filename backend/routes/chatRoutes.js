const express = require('express');
const router = express.Router();
const {accessChat,fetchChats} = require('../controller/chatController')
const { protect } = require('../middleware/authMiddleware')
router.route('/').post(protect,accessChat);
router.route('/').get(protect,fetchChats);
// router.route('/group').post(protect,createGroupChat)
// router.route('/rename').put(protect,renameGroup);
// router.route('/groupRemove').put(protect,removeFromGroup);
// router.route('/groupAdd').put(protect,addToGroup)

module.exports = router;