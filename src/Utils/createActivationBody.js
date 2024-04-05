const createActivationBody = (token, name) => {
  const body = `
      <h1>Hola ${name}</h1>
      <h2>¡Bienvenido a Bosco!</h2>
      <p>Activa tu cuenta de Bosco accediendo al enlace de abajo</p>
      <a href="http://localhost:5173/activate-account?token=${token}"><h3>Activar cuenta</h3></a>
      `;

  return body;
};

module.exports = createActivationBody;
