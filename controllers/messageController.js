let messageModel = require('../models/messages');
let emailModel = require('../models/email');

exports.startConvo = (req,res,next) => {
    let { subject, msg } = req.body;
    let senderId = 1;
    let receiverId = 3;

    // need to get senderId from session user
    // need to get receiverId from url
    
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
                
                emailModel.sendEmail(input.email, subject, msg)
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

