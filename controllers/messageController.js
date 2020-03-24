let messageModel = require('../models/messages');

exports.startConvo = (req,res,next) => {
    let { subject, msg } = req.body;

    // need to get senderId from session user
    // need to get receiverId from url
    
    // let input = {
    //    senderId: senderId,
    //    receiverId: receiverId,
    //    subject: subject,
    //    msg: msg
    // }

    let input = {
       senderId: 1,
       receiverId: 2,
       subject: subject,
       msg: msg
    }
 
    messageModel.createConversation(input)
    	.then((data) => {

			console.log("Conversation successfully created:", )
    		console.log(data.rows[0]);

    		input.conversationId = data.rows[0].conversationid;

    		messageModel.sendMessage(input)
    			// need to change the redirect to messages inbox
    			.then((data) => {
    				console.log("Message succesfully saved to database")
    				res.redirect(301, '/')
    			})
      			.catch((error) => console.log(error));

    	})
      .catch((error) => console.log(error));
}

// SELECT to_char(now()::timestamp, 'Month DD') as date, to_char(now()::timestamp, 'HH:MI PM') as time;

// output: 
// date = March 24
// time = 6:42 AM