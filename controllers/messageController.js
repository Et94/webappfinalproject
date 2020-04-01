let messageModel = require('../models/messages');
let nodemailer = require('../utils/nodemailer');

const sortByDate = (results) => {

  // results is an array of messages, each with the following:
  // conversationid, messageid, body, senderid, firstname, 
  // lastname, imageurl, date and time

  // this fcn returns an array with the following format:
  // sortedMsgList = [
  //    { date: "Mar 31",
  //      messages: [ {}, {}, {} ]
  //    },
  //    { date: "Apr 1",
  //      messages: [ {} ]
  //    }
  // ]
    
  let messages = [];
  let sameDateMsgs = [];
  let index = 0;
  let currentDate = results[index].date;

  while(index < results.length) {

    results[index].body = results[index].body.replace(/&#39;/g, "'");

    if (results[index].date !== currentDate) {
      messages.push(sameDateMsgs);
      sameDateMsgs = [];
      currentDate = results[index].date;
    } 
    sameDateMsgs.push(results[index]);
    index++;
  } 
  messages.push(sameDateMsgs);

  let sortedMsgList = [];
  for (let i = 0; i < messages.length; ++i) {
    let section = {
      date: messages[i][0].date,
      messages: messages[i]
    }
    sortedMsgList.push(section);
  }

  return sortedMsgList;
}

const getCurrentTimestamp = () => {
    
  let t = new Date();
  let YYYY = t.getFullYear();
  let MM = ((t.getMonth() + 1 < 10) ? '0' : '') + (t.getMonth() + 1);
  let DD = ((t.getDate() < 10) ? '0' : '') + t.getDate();
  let HH = ((t.getHours() < 10) ? '0' : '') + t.getHours();
  let mm = ((t.getMinutes() < 10) ? '0' : '') + t.getMinutes();
  let ss = ((t.getSeconds() < 10) ? '0' : '') + t.getSeconds();

  let date = YYYY+'-'+MM+'-'+DD+' '+HH+':'+mm+':'+ss;

  return date;
}

exports.sendMessageView = (req,res,next) => {
  // TO UPDATE: get profile user's image from url
  // let receiverId = 3;

  // messageModel.getUserImage(receiverId)
  //   .then((data) => {
  //     // console.log("ImageURL retrieved:");
  //     // console.log(data);

  //     res.render('sendMessageView', { 
  //     pageTitle: 'Send a Message',
  //     imageURL: data.rows[0].imageurl,
  //     searchResultCSS: true,
  //     sendMsgCSS: true });
  //   })
  //   .catch((error) => {
  //     console.log("Failed to retrieve imageURL due to error:");
  //     console.log(error);
  //   });

   res.render('sendMessageView', { 
      pageTitle: 'Send a Message',
      searchResultCSS: true,
      sendMsgCSS: true });
};

exports.sendMessage = (req,res,next) => {

  let { conversationid, body } = req.body;
  let senderId = req.session.userid;
  let date = getCurrentTimestamp();

  let input = {
    conversationId: conversationid,
    senderId: senderId,
    msg: body.replace(/'/g, "&#39;"),
    date: date
  }

  // console.log(input);

  messageModel.sendMessage(input)
    .then((data) => {
      // console.log("Message saved");
      // console.log(data);

      res.redirect(301, '/conversations')
    })
    .catch((error) => {
      console.log("Failed to save msg due to error:");
      console.log(error);
    });
}

exports.startConvo = (req,res,next) => {
  let { subject, msg } = req.body;
  let senderId = req.session.userid; // current user from session
  let receiverId = 3; // TO UPDATE: from profile url
  
  let input = {
    senderId: senderId,
    receiverId: receiverId,
    subject: subject.replace(/'/g, "&#39;"),
    msg: msg.replace(/'/g, "&#39;")
  }

  // console.log("Input from sendMessageView:");
  // console.log(input);

  messageModel.createConversation(input)
  	.then((data) => {
		  // console.log("Conversation successfully created:", )
  		// console.log(data.rows[0]);

  		input.conversationId = data.rows[0].conversationid;
      input.date = getCurrentTimestamp();

  		return messageModel.sendMessage(input);
    })
  	.then((data) => {
			console.log("Message succesfully saved to database");

      return messageModel.getUserEmail(receiverId);
    })
    .then((data) => {
      console.log("Recipient email retrieved:");
      console.log(data.rows[0].email);

      input.email = data.rows[0].email;
      return nodemailer.sendEmail(input.email, subject, msg);
    })
    .then((data) => {
      console.log("Recipient emailed");
      console.log(data);

      res.redirect(301, '/conversations')
    })
    .catch((error) => {
      console.log("Failed to create conversation due to error:");
      console.log(error);
    });
}

exports.getConversations = (req,res,next) => { 
  let currentUserId = req.session.userid; // current user from session
  let conversations = [];

  messageModel.getConvoList(currentUserId)
    .then((data) => {
      // console.log("ConvoList:")
      // console.log(data.rows);

      if (data.rows.length > 0) {
        conversations = data.rows;

        for(let i = 0; i < conversations.length; ++i) {
          conversations[i].subject = conversations[i].subject.replace(/&#39;/g, "'");
        }

        messageModel.getMsgList(currentUserId)
          .then((data) => { 
            // console.log("MsgList:")
            // console.log(data.rows);

            let messagesList = sortByDate(data.rows);

            res.render('messageInboxView', { 
            pageTitle: 'Message Inbox',
            messagesList: messagesList,
            conversations: conversations,
            searchResultCSS: true,
            msgInboxCSS: true });
          })
          .catch((error) => {
            console.log("Failed to get convo/msg list due to error:");
            console.log(error);
          });
      } else {
        res.render('messageInboxView', { 
        pageTitle: 'Message Inbox',
        messagesList: {},
        conversations: {},
        searchResultCSS: true,
        msgInboxCSS: true });
      }
    })
    .catch((error) => {
      console.log("Failed to get convo/msg list due to error:");
      console.log(error);
    });
}