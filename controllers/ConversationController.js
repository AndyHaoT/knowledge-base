const msgModel = require('../models/mod_message.js');
const sessionModel = require('../models/session');

exports.getConversations = (req, res) => {
    sessionModel.getUser(req.sessionID)
        .then(([data, metadata]) => {
            if (data.length > 0) {
                // const self_id = 1;
                const self_id = data[0].data;
                // TODO: what if the last thread is not made by myself?
                msgModel.getThreads(self_id).then(([allthreads, metadata]) => {
                    if (allthreads.length == 0) {
                        res.render('conversations', {
                            allthreads,
                            // allmessages,
                            message_user: null,
                            thread_id: null,
                            conversationsCSS: true,
                            conversationsJS: true
                        });
                    } else {
                        msgModel.getMessages(allthreads[0].thread_id).then(([allmessages, metadata]) => {
                            if (allmessages[0].user_sender_id == self_id)
                                message_user = allmessages[0].user_receiver_id;
                            else
                                message_user = allmessages[0].user_sender_id;
                            res.render('conversations', {
                                allthreads,
                                // allmessages,
                                message_user,
                                thread_id: allthreads[0].thread_id,
                                conversationsCSS: true,
                                conversationsJS: true
                            });
                        });
                    }
                });
            }
            else {
                res.redirect('/login');
            }
        });
}

exports.getConversation = (req, res) => {
    sessionModel.getUser(req.sessionID)
        .then(([data, metadata]) => {
            if (data.length > 0) {
                // const self_id = 1;
                const self_id = data[0].data;
                // TODO: what if the last thread is not made by myself?
                // msgModel.getThreads(self_id).then(([allthreads, metadata]) => {
                msgModel.getMessages(req.params.thread_id).then(([allmessages, metadata]) => {
                    let message_user;
                    if (allmessages[0].user_sender_id == self_id)
                        message_user = allmessages[0].user_receiver_id;
                    else
                        message_user = allmessages[0].user_sender_id;
                    let thread_id = allmessages[0].thread_id;
                    // res.render('conversations', {
                    //     allthreads,
                    //     allmessages,
                    //     message_user,
                    //     thread_id,
                    //     conversationsCSS:true,
                    //     conversationsJS:true
                    // })
                    res.send({ allmessages, message_user, thread_id });
                });
            }
            else {
                res.redirect('/login');
            }
        });
    // })
}

exports.writeMessage = (req, res) => {
    sessionModel.getUser(req.sessionID)
        .then(([rows, metadata]) => {
            if (rows.length > 0) {
                // const self_id = 1;
                const self_id = rows[0].data;
                let data = {
                    thread_id: req.params.thread_id,
                    message: req.body.message,
                    receiver_id: req.params.receiver_id,
                    sender_id: self_id
                }
                msgModel.writeMessage(data).then(([onemessage, metadata]) => {
                    res.send({ onemessage })
                });
            }
            else {
                res.redirect('/login');
            }
        });
}