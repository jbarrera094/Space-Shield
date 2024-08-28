import { transporter } from "config/nodemailer";

export const MailsRepo = {
  firstContact,
  resetPassword,
};

const generateEmailContentFirstContact = (data) => {
  return {
    text: "",
    html: `<!DOCTYPE html>
    <html>
    <head>
        <meta charset="UTF-8">
        <title>Bienvenido a LPS CAD</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                background-color: #f5f5f5;
            }
    
            .container {
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
                background-color: #fff;
                border-radius: 5px;
                box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            }
    
            h1 {
                color: #333;
            }
    
            p {
                color: #666;
            }
    
            .btn {
                display: inline-block;
                background-color: #007BFF;
                color: #fff;
                padding: 10px 20px;
                text-decoration: none;
                border-radius: 5px;
            }
    
            .btn:hover {
                background-color: #0056b3;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <h1>Bienvenido a LPS CAD</h1>
            <p>¡Gracias por unirte a nuestra plataforma LPS CAD! Estamos emocionados de tenerte a bordo y esperamos que disfrutes de todos los beneficios que ofrecemos.</p>
            <p>Con LPS CAD, puedes proteger tus dispositivos y datos personales en línea de manera efectiva. Nuestros servicios incluyen:</p>
            <ul>
                <li>Seguridad en línea avanzada</li>
                <li>Protección de datos</li>
                <li>Actualizaciones regulares</li>
            </ul>
            <p>No dudes en ponerte en contacto con nuestro equipo de soporte si tienes alguna pregunta o necesitas ayuda. Puedes escribirnos a <a href="mailto:sps@bsenergy.co">lps@bsenergy.co</a>.</p>
            <p>Antes de empezar, te recomendamos leer nuestros <a href="https://lpscad.bsenergy.co/termConditions" target="_blank">Términos y Condiciones</a> para conocer tus derechos y responsabilidades como usuario.</p>
            <p>Para obtener consejos y novedades, ¡síguenos en nuestro canal de YouTube! <a href="https://www.youtube.com/@SpaceShieldEGM" target="_blank">Canal de YouTube</a></p>
            <p>Para comenzar a utilizar LPS CAD, simplemente haz clic en el siguiente botón:</p>
            <a class="btn" href="https://lpscad.bsenergy.co/licences" style="color: #fff;">Comenzar</a>
        </div>
    </body>
    </html>
    `,
  };
};

const generateEmailContentPasswordRecovery = (data) => {
  return {
    text: "",
    html: `<!DOCTYPE html>
    <html>
    <head>
        <meta charset="UTF-8">
        <title>Password Recovery - LPS CAD</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                background-color: #f5f5f5;
            }
    
            .container {
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
                background-color: #fff;
                border-radius: 5px;
                box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            }
    
            h1 {
                color: #333;
            }
    
            p {
                color: #666;
            }
    
            .btn {
                display: inline-block;
                background-color: #007BFF;
                color: #fff;
                padding: 10px 20px;
                text-decoration: none;
                border-radius: 5px;
            }
    
            .btn:hover {
                background-color: #0056b3;
            }
        </style>
    </head>
    <body>
        <div class="container">
          <h1>Password Recovery - LPS CAD</h1>
          <p>We received a request to reset your password for your LPS account. Please click the button below to reset your password:</p>
          <a class="btn" href="${data.url}" style="color: #fff;">Reset Password</a>
          <p>If you did not request this password reset, you can safely ignore this email.</p>
          <p>Thank you,<br> The LPS CAD Team</p>
        </div>
    </body>
    </html>
    `,
  };
};

async function firstContact(params) {
  console.log("params: " + params.email);

  const data = "";

  const mailOptionsTest = {
    from: "info@lpscad.bsenergy.co",
    to: params.email,
  };

  try {
    const resSenderEmail = await transporter.sendMail({
      ...mailOptionsTest,
      ...generateEmailContentFirstContact(data),
      subject: "Hi! from LPS CAD",
    });

    return { success: true };
  } catch (err) {
    console.log(err);
    return { message: err.message };
  }
}

async function resetPassword(params) {
  const data = {
    url: params.url,
  };

  const mailOptionsTest = {
    from: "info@lpscad.bsenergy.co",
    to: params.email,
  };

  try {
    await transporter.sendMail({
      ...mailOptionsTest,
      ...generateEmailContentPasswordRecovery(data),
      subject: "Password Recover",
    });

    return { success: true };
  } catch (err) {
    console.log(err);
    return { message: err.message };
  }
}
