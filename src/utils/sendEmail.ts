import emailjs from 'emailjs-com';

interface IsendEmailParams {
    serviceId: string;
    templateId: string;
    publicKey: string;
}

export function sendEmail(email : string, { serviceId, templateId, publicKey }: IsendEmailParams): Promise<void> {
    const templateParams = {
        to_email: email,  // Ensure 'to_email' matches the variable in your EmailJS template
        from_name: 'Myimages', // Add more parameters as required by your template
    };

    return emailjs.send(serviceId, templateId, templateParams, publicKey)
        .then((response) => {
            console.log('SUCCESS!', response.status, response.text);
        }, (error) => {
            console.log('FAILED...', error);
        });
};