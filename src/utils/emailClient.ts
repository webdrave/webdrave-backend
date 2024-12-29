import { Resend } from 'resend';

export async function sendContactEmail(
  fullname: string,
  email: string,
  mobile: string | undefined,
  reason: string,
  message: string
) {
  const resend = new Resend();
  try {
    const response = await resend.emails.send({
      from: `${fullname} <${email}>`,

      //^ Update the 'to' email address with your email address
      to: process.env.SUPPORT_EMAIL || 'agency.email.com',

      subject: `Contact Form Submission: ${reason}`,
      html: `
        <h1>Contact Form Submission</h1>
        <p><strong>Name:</strong> ${fullname}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Mobile:</strong> ${mobile || "Not Provided"}</p>
        <p><strong>Reason:</strong> ${reason}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
    });
  
    console.log("Resend API response:", response); 
    console.log("Email sent successfully.");
  } catch (error) {
    console.error("Error from Resend API:", error);
    throw new Error("Failed to send email.");
  }  
}
