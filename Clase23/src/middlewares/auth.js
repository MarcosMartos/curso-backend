import jwt from "jsonwebtoken";
import config from "../../config.js";

// Función para crear un token de autenticación
const createAuthToken = (payload) => {
  // Devuelve un token firmado con la clave privada y con un tiempo de expiración
  return jwt.sign({ payload }, config.JWT_PRIVATE_KEY, {
    expiresIn: config.JWT_EXPIRATION_TIME,
  });
};

// Middleware para verificar la autenticación
const verifyAuth = (req, res, next) => {
  // Obtiene el encabezado de autorización de la solicitud
  const authHeader = req.headers.authorization;

  // Si no hay encabezado de autorización, devuelve un error
  if (!authHeader) {
    const errorMsg = new Error("Token inválido");
    return res.status(401).json({ mensaje: errorMsg.message });
  }

  // Extrae el token JWT del encabezado de autorización
  const jwtToken = authHeader.split(" ")[1];

  // Verifica el token JWT
  jwt.verify(jwtToken, config.JWT_PRIVATE_KEY, (error, decodedToken) => {
    // Si hay un error en la verificación, devuelve un error
    if (error) {
      return res.status(403).json({ mensaje: "Acceso no autorizado" });
    }
    // Si la verificación es exitosa, guarda el payload decodificado en req.currentUser
    req.currentUser = decodedToken.payload;
    // Continúa con el siguiente middleware o ruta
    next();
  });
};

// Middleware para verificar roles
const verifyRoles = (roles) => (req, res, next) => {
  if (!req.currentUser || !roles.includes(req.currentUser.role)) {
    return res.status(403).json({ mensaje: "Acceso denegado" });
  }
  next();
};

// Exporta las funciones para que puedan ser utilizadas en otros módulos
export { createAuthToken, verifyAuth, verifyRoles };
