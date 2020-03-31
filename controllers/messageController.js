let messageModel = require('../models/messages');
let nodemailer = require('../utils/nodemailer');

const sortByDate = (results) => {
    
  let messages = [];
  let sameDate = [];
  let num = 0;
  let currDate = results[num].date;

  while(num < results.length) {
    if (results[num].date !== currDate) {
      messages.push(sameDate);
      sameDate = [];
      currDate = results[num].date;
    } 
    sameDate.push(results[num]);
    num++;
  } 
  messages.push(sameDate);

  let messagesList = [];
  for (let i = 0; i < messages.length; ++i) {
    let section = {
      date: messages[i][0].date,
      messages: messages[i]
    }
    messagesList.push(section);
  }

  return messagesList;
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
    msg: body,
    date: date
  }

  console.log(input);

  messageModel.sendMessage(input)
    .then((data) => {
      console.log("Message saved");
      console.log(data);

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
  let receiverId = 3; // from profile url
  
  let input = {
    senderId: senderId,
    receiverId: receiverId,
    subject: subject,
    msg: msg
  }

  messageModel.createConversation(input)
  	.then((data) => {

		  console.log("Conversation successfully created:", )
  		console.log(data.rows[0]);

  		input.conversationId = data.rows[0].conversationid;

      let date = getCurrentTimestamp();
      input.date = date;

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

exports.getMsgList = (req,res,next) => { 

  // Get current user from session
  let currentUserId = req.session.userid;
  let conversations = [];

  messageModel.getConvoList(currentUserId)
    .then((data) => {
      // console.log("ConvoList:")
      // console.log(data.rows);

      conversations = data.rows;
      return messageModel.getMsgList(currentUserId);
    })
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

}