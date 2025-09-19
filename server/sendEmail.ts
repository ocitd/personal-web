"use server";

import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendEmail(formData: {
  name: string;
  email: string;
  phone: string;
  service: string;
  timeline: string;
  details: string;
}) {
  try {
    await resend.emails.send({
      from: "ocidsupport <admin@support.rasyidabqarihasibuan.my.id>", // harus verified domain/email
      to: "rasyidabqarihasibuan@gmail.com", // ganti ke email lu
      subject: `New Contact from ${formData.name}`,
      html: `
        <h2>New Contact Request</h2>
        <p><b>Name:</b> ${formData.name}</p>
        <p><b>Email:</b> ${formData.email}</p>
        <p><b>Phone:</b> ${formData.phone}</p>
        <p><b>Service:</b> ${formData.service}</p>
        <p><b>Timeline:</b> ${formData.timeline}</p>
        <p><b>Details:</b> ${formData.details}</p>
      `,
    });

    return { success: true };
  } catch (error) {
    console.error("Resend Error:", error);
    return { success: false, error: "Gagal kirim email" };
  }
}