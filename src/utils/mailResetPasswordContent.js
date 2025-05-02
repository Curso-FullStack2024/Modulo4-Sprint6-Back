const  mailContent=(mail, link)=>{
    return(
        `
  <!DOCTYPE html>
  <html lang="es">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Verifica tu cuenta</title>
      <style>
          body {
              font-family: Arial, sans-serif;
              line-height: 1.6;
              color: #333;
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
          }
          .header {
              text-align: center;
              padding: 20px 0;
          }
          .header-banner {
          background-color: #E50914;
          height:auto;
          width:100%;
          color: #fcfcfc
          }
          .logo {
              max-width: 150px;
              height:auto;
              margin-bottom: 15px
          }
          .content {
              background-color: #f9f9f9;
              padding: 25px;
              border-radius: 5px;
          }
          .button {
              display: inline-block;
              padding: 12px 24px;
              background-color: #E50914;
              color: white !important;
              text-decoration: none;
              border-radius: 4px;
              font-weight: bold;
              margin: 20px 0;
          }
          .footer {
              text-align: center;
              margin-top: 20px;
              font-size: 12px;
              color: #777;
          }
      </style>
  </head>
  <body>
        <div class="header-banner"> 

            <div class="header">
                <img src="https://c0.klipartz.com/pngpicture/970/73/gratis-png-texto-de-netflix-logotipo-de-la-marca-netflix-ilustrador-thumbnail.png" alt="Logo" class="logo">
                <h2>Cambio de contraseñaa</h2>
                </div>
        </div>

      <div class="content">
          <p>Hola <strong>${mail}</strong>,</p>
          <p>has click en el siguiente botón para cambiar la contraseña:</p>
          
          <div style="text-align: center;">
              <a href="${link}" class="button">Cambiar contraseña</a>
          </div>
          
          <p>Si el botón no funciona, copia y pega la siguiente URL en tu navegador:</p>
          <p><small>${link}</small></p>
          
          <p>Si no has solicitado un cambio de contraseña, por favor ignora este mensaje.</p>
      </div>
      
      <div class="footer">
          <p>© ${new Date().getFullYear()} NextFliks. Todos los derechos reservados.</p>
          <p>
              <a href="https://nextfliks.com" style="color: #777; text-decoration: none;">Visita nuestro sitio web</a>              
          </p>
      </div>
  </body>
  </html>
  `
    )
}

export default mailContent