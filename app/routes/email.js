let nodemailer = require('nodemailer');
let pass = "DUMMY";
let user = "DUMMY";
module.exports = {
    forgotPass:function(email){
    let transporter = nodemailer.createTransport({
        service: 'outlook',
        auth: {
            user: user,
            pass: pass
        }
    });

// setup email data with unicode symbols
    let mailOptions = {
        from: '"Famingo Squad Inc." <chamich196@hotmail.com>', // sender address
        to: email, // list of receivers
        subject: 'SOEN 341 - Password reset', // Subject line
        text: 'Hello world ?', // plain text body
        html: '<b>Hello world ?</b>' // html body
    };

// send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message %s sent: %s', info.messageId, info.response);
    });
    },


    newInvite : function(email){
        let transporter = nodemailer.createTransport({
            service: 'outlook',
            auth: {
                user: user,
                pass: pass
            }
        });

// setup email data with unicode symbols
        let mailOptions = {
            from: '"Famingo Squad Inc." <chamich196@hotmail.com>', // sender address
            to: email, // list of receivers
            subject: 'SOEN 341 - Password reset', // Subject line
            text: 'Hello world ?', // plain text body
            html: '<b>Hello world ?</b>' // html body
        };

// send mail with defined transport object
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return console.log(error);
            }
            console.log('Message %s sent: %s', info.messageId, info.response);
        });
    },

   newAccount : function(email){
        let transporter = nodemailer.createTransport({
            service: 'outlook',
            auth: {
                user: user,
                pass: pass
            }
        });
        console.log(email);

// setup email data with unicode symbols
        let mailOptions = {
            from: '"Famingo Squad Inc." <chamich196@hotmail.com>', // sender address
            to: email, // list of receivers
            subject: 'SOEN 341 - Password reset', // Subject line
            text: 'Hello world ?', // plain text body
            html: '<b>Hello world ?</b>' // html body
        };

// send mail with defined transport object
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return console.log(error);
            }
            console.log('Message %s sent: %s', info.messageId, info.response);
        });
   }
}
