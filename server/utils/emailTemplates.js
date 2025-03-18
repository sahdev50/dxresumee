// utils/emailTemplates.js

exports.getOtpEmailTemplate = (name, otp) => {
    return `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border-radius: 10px; background: #f9f9f9; color: #333;">
        <h2 style="color: #4a90e2;">Welcome, ${name}!</h2>
        <p>Thank you for registering with us. Please use the following OTP code to verify your email address:</p>
        <div style="margin: 20px 0; font-size: 32px; font-weight: bold; letter-spacing: 5px; color: #111; background: #e0e0e0; padding: 15px; border-radius: 8px; text-align: center;">
          ${otp}
        </div>
        <p>This code is valid for 5 minutes. Please do not share it with anyone.</p>
        <p style="margin-top: 30px;">If you didn’t create this account, you can safely ignore this email.</p>
        <p style="color: #aaa;">— Your App Team</p>
      </div>
    `;
  };
  
  exports.getResendOtpEmailTemplate = (name, otp) => {
    return `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border-radius: 10px; background: #fefefe; color: #333;">
        <h2 style="color: #e67e22;">Hello again, ${name}!</h2>
        <p>You requested a new verification code. Please use the OTP below to verify your email address:</p>
        <div style="margin: 20px 0; font-size: 32px; font-weight: bold; letter-spacing: 5px; color: #111; background: #ffeaa7; padding: 15px; border-radius: 8px; text-align: center;">
          ${otp}
        </div>
        <p>This code is valid for 5 minutes. If you didn’t request this, just ignore this email.</p>
        <p style="color: #aaa;">— Your App Team</p>
      </div>
    `;
  };
  