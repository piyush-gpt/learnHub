const nodemailer=require("nodemailer");
require("dotenv").config();
exports. mailSender= async(email,title,body)=>{
    try{
        const transporter = nodemailer.createTransport({
            host:process.env.MAIL_HOST,
            secure: true,
            auth: {
              user: process.env.MAIL_USER,
              pass: process.env.MAIL_PASS
            },
          });
        
          const info = await transporter.sendMail({
            from: 'LearnHub', // sender address
            to: `${email}`, // list of receivers
            subject: `${title}`, // Subject line
            html: `${body}`, // html body
          });
    }
    catch(e){
        console.log(e.message);
    }
}

