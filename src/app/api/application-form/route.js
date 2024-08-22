import nodemailer from 'nodemailer';

export const runtime = 'node'; // Use Node.js runtime instead of Edge

export async function POST(req) {
  try {
    const form = new FormData();
    await req.formData().then((data) => {
      data.forEach((value, key) => form.append(key, value));
    });

    const name = form.get('name');
    const email = form.get('email');
    const phone = form.get('phone');
    const about = form.get('about');
    const resume = form.get('resume');

    const resumeBuffer = Buffer.from(await resume.arrayBuffer());

    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: email,
      to: process.env.EMAIL_USER,
      subject: `New Application from ${name}`,
      text: `
        Name: ${name}
        Email: ${email}
        Phone: ${phone}
        About: ${about}
      `,
      attachments: [
        {
          filename: resume.name,
          content: resumeBuffer,
        },
      ],
    };

    await transporter.sendMail(mailOptions);
    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error) {
    console.error('Error sending email:', error);
    return new Response(JSON.stringify({ success: false, error: 'Failed to send email. Please try again later.' }), { status: 500 });
  }
}
