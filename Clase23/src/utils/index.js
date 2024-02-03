/**
 * Función para verificar si un usuario tiene todos los documentos necesarios para ser premium.
 * @param {Array} documents - Los documentos del usuario.
 * @returns {Boolean} - True si el usuario tiene todos los documentos necesarios, false de lo contrario.
 */
export const hasAllRequiredDocuments = (documents) => {
  const requiredDocuments = [
    "Identificación",
    "Comprobante de domicilio",
    "Comprobante de estado de cuenta",
  ];
  return requiredDocuments.every((doc) =>
    documents.some((userDoc) => userDoc.name === doc)
  );
};

/**
 * Función para formatear la fecha y hora de la última conexión.
 * @param {Date} date - La fecha de la última conexión.
 * @returns {String} - La fecha formateada.
 */
export const formatLastConnection = (date) => {
  return date.toLocaleString("es-ES", { timeZone: "Europe/Madrid" });
};
