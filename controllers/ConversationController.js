const msgModel = require('../models/mod_message.js');

exports.getConversations = (req, res) => {
    const self_id = 1;
    // TODO: what if the last thread is not made by myself?
    msgModel.getThreads(self_id).then(([allthreads, metadata]) => {
        if(allthreads.length == 0) {
            res.render('conversations', {
                allthreads,
                // allmessages,
                message_user:null,
                thread_id: null,
                conversationsCSS:true,
                conversationsJS:true
            })
        }
        msgModel.getMessages(allthreads[0].thread_id).then(([allmessages, metadata]) => {
            if (allmessages[0].user_sender_id == self_id)
                message_user = allmessages[0].user_receiver_id
            else
                message_user = allmessages[0].user_sender_id
            res.render('conversations', {
                allthreads,
                // allmessages,
                message_user,
                thread_id: allthreads[0].thread_id,
                conversationsCSS:true,
                conversationsJS:true
            })
        })
    })
}

exports.getConversation = (req, res) => {
    const self_id = 1;
    // TODO: what if the last thread is not made by myself?
    // msgModel.getThreads(self_id).then(([allthreads, metadata]) => {
    msgModel.getMessages(req.params.thread_id).then(([allmessages, metadata]) => {
        let message_user;
        if (allmessages[0].user_sender_id == self_id)
            message_user = allmessages[0].user_receiver_id
        else
            message_user = allmessages[0].user_sender_id
        let thread_id = allmessages[0].thread_id
        // res.render('conversations', {
        //     allthreads,
        //     allmessages,
        //     message_user,
        //     thread_id,
        //     conversationsCSS:true,
        //     conversationsJS:true
        // })
        res.send({allmessages,message_user,thread_id})
    })
    // })
}

exports.writeMessage = (req, res) => {
    const self_id = 1;
    let data = {
        thread_id: req.params.thread_id,
        message: req.params.message,
        receiver_id: req.params.receiver_id,
        sender_id: self_id
    }
    msgModel.writeMessage(data).then(([onemessage, metadata]) => {
        res.send({onemessage})
    })
}