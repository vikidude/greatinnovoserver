var nodemailer = require('nodemailer');


var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'farm2bag.info@gmail.com' , //'ganesanbe1996@gmail.com',
      pass: 'Farm2Bag1234'
    }
  });


  exports.sentMailToSingle = (email,subject,msg,callback) =>{

    //console.log(email,transporter,callback);

    var mailOptions = {
        from: 'farm2bag.info@gmail.com',
        to: email,
        subject: subject,
        text: msg,
        html:msg
      };


      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
          callback();
        }
      });

  }


  exports.sentMailToMultiple = (emails,subject,msg,callback) =>{

    console.log(emails,transporter,callback);

    var mailOptions = {
        from: 'farm2bag.info@gmail.com',
        to: emails.toString(),
        subject: subject,
        text: msg,
        html : msg
      };


      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
          callback();
        }
      });

  }