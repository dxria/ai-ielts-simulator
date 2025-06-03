import nodemailer, { type Transporter } from 'nodemailer';

import { ContactInput } from '@/api/dto';

const transporter = nodemailer.createTransport({
    secure: true,
    service: 'Gmail',
    host: process.env.MAIL_HOST,
    port: Number(process.env.MAIL_PORT),
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
    },
});

class MailService {
    client: Transporter;
    constructor(client: Transporter) {
        this.client = client;
    }

    async send(args: ContactInput) {
        await this.client.sendMail({
            to: process.env.MAIL_TO,
            from: process.env.MAIL_FROM,
            subject: 'Get in Touch SpeakPro',
            html: `
            <p><b>Ім'я відправника:</b> ${args.name} </p>
            <p><b>Email:</b> ${args.email} </p>
            <p><b>Текст повідомлення:</b> ${args.message} </p>
            `,
        });
    }
}

export default new MailService(transporter);
