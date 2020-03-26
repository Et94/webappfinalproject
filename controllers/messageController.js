let messageModel = require('../models/messages');
let nodemailer = require('../utils/nodemailer');

exports.startConvo = (req,res,next) => {
  let { subject, msg } = req.body;

  let senderId = 1; // current user from session
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

  		messageModel.sendMessage(input)
  			.then((data) => {
  				console.log("Message succesfully saved to database");

          messageModel.getUserEmail(receiverId)
            .then((data) => {
              console.log("Recipient email retrieved:");
              console.log(data.rows[0].email);

              input.email = data.rows[0].email;
              
              nodemailer.sendEmail(input.email, subject, msg)
                .then((data) => {
                  console.log("Recipient emailed");
                  console.log(data);

                  // need to change the redirect to messages inbox
                  res.redirect(301, '/')
                })
                .catch((error) => {
                  console.log("Email failed to send");
                  console.log(error);
                });

            })
            .catch((error) => {
              console.log("Failed to retrieve email");
              console.log(error);
            });

  			})
    		.catch((error) => {
          console.log("Failed to save message in database");
          console.log(error);
        });

  	})
    .catch((error) => {
      console.log("Failed to create convo in database");
      console.log(error);
    });
}

exports.getConvoList = (req,res,next) => { 

  // need to get current user from session
  let currentUserId = 1;

  messageModel.getConvoList(currentUserId)
    .then((data) => {
      console.log(data.rows);

      res.render('messageInboxView', { 
        pageTitle: 'Message Inbox', 
        conversations: data.rows, 
        searchResultCSS: true,
        msgInboxCSS: true });
    })
    .catch((error) => {
      console.log("Failed to get convo list");
      console.log(error);
    });

}

exports.getMsgList = (req,res,next) => { 

  // need to get current user from session
  let currentUserId = 1;
  let conversations = [];

  messageModel.getConvoList(currentUserId)
    .then((data) => {
      console.log(data.rows);

      conversations = data.rows;

      // if form is get
      // let conversationid = req.query.conversationid;
      
      // if form is post
      let conversationid = req.body.conversationid;

      console.log("conversationid from frontend:");
      console.log(conversationid);

      messageModel.getMsgList(conversationid)
        .then((data) => {
          console.log(data.rows);

          let messages = [];
          let sameDate = [];
          let num = 0;
          let currDate = data.rows[num].date;

          while(num < data.rows.length) {
            if (data.rows[num].date !== currDate) {
              messages.push(sameDate);
              sameDate = [];
              currDate = data.rows[num].date;
            } 
            sameDate.push(data.rows[num]);
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

          res.render('messageInboxView', { 
            pageTitle: 'Message Inbox',
            messagesList: messagesList,
            conversations: conversations,
            searchResultCSS: true,
            msgInboxCSS: true });
        })
        .catch((error) => {
          console.log("Failed to get messages list");
          console.log(error);
        });

    })
    .catch((error) => {
      console.log("Failed to get convo list");
      console.log(error);
    });

}