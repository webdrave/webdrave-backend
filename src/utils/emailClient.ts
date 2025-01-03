import nodemailer from 'nodemailer';
import client from './dbClient.js';

const mails = ["khushzx8630@gmail.com", "webdrave.agency@gmail.com"];

export async function sendContactEmail(
  fullname: string,
  email: string,
  mobile: string,
  reason: string,
  message: string
) {

  const transporter = nodemailer.createTransport({
    host: "smtp.hostinger.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.SUPPORT_EMAIL,
      pass: process.env.SUPPORT_EMAIL_PASSWORD,
    }
  });

  try {
    const htmlMsg = `<h1>Contact Form Submission</h1>
        <p><strong>Name:</strong> ${fullname}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Mobile:</strong> ${mobile}</p>
        <p><strong>Reason:</strong> ${reason}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>`

    mails.forEach(mail => {
      transporter.sendMail({
        from: process.env.SUPPORT_EMAIL,
        to: mail,
        subject: `Contact Form Submission: ${reason}`,
        html: htmlMsg,
      });
    });

    const ResponseMsg = `Thank you for your submission. We will get back to you soon.`;

    transporter.sendMail({
      from: process.env.SUPPORT_EMAIL,
      to: email,
      subject: "Thank you ",
      html: ResponseMsg,
    });

    await client.contact.create({
      data: {
        name: fullname,
        email,
        phone: mobile,
        reasonOfContact : reason,
        message,
      },
    });

  } catch (error) {
    console.error("Error from Resend API:", error);
  }
}
