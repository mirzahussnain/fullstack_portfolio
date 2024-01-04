const {createTransport}=require('nodemailer')

const sendMail=async(contactDetails)=>{
    const transporter=createTransport({
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS
        }
    })
    const text=contactDetails.message
    await transporter.sendMail({subject:`CONTACT REQUEST FROM PORTFOLIO-${contactDetails.subject}`,to:process.env.MYMAIL,from:`${contactDetails.name} <${contactDetails.email}>`,text})
   
}

module.exports.sendMail=sendMail