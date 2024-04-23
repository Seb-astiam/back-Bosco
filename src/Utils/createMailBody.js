const createMailBody = (password, name) => {
  const body = `
    <h1>Hola ${name}</h1>
    <p>La contraseña de tu cuenta de Bosco ha sido reseteada.</p>
    <p>Te recomendamos cambiarla, aunque puedes utilizarla sin peligro.</p>
    <p>Tu nueva contraseña es:</p>
    <h2>${password}</h2>
    <a href="https://front-bosco.up.railway.app/login"><h3>Login Bosco</h3></a>
    `;

  return body;
};

module.exports = createMailBody;
