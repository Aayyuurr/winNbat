import nodemailer from 'nodemailer';
import {Node_Email,Mdp_Email} from "$env/static/private";
import { dev } from "$app/environment";

async function sendEmail(to:string,html:string,subject:string){
  //create a NodeMailer transporter using SMTP
  const transporter = nodemailer.createTransport({
    host: "smtp.office365.com",
    port: 587,
    auth:{
      user: Node_Email,
      pass: Mdp_Email
    }
  });
  const info= await transporter.sendMail({
    from: Node_Email,
    to: to,
    subject: subject,
    text: html
  })
}

export const sendVerificationEmail= async (to:string, token:string)=>{
  const verificationLink= `${dev ? "http://localhost:5173" : "https://win-nbat.vercel.app"}/email-verification/${token}`;
  const html= `<p>Click <a href="${verificationLink}">here</a> to verify your email</p>`;

  await sendEmail(to,html,"Verify your email");
}

export const sendPasswordResetEmail= async (to:string, token:string)=>{
  const passwordResetLink= `${dev ? "http://localhost:5173" : "https://win-nbat.vercel.app"}/password-reset/${token}`;
  const html= `<p>Click <a href="${passwordResetLink}">here</a> to reset your password</p>`;
  await sendEmail(to,html,"Reset your password");
}
