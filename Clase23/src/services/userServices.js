import User from "../model/User"; // Asume un modelo Mongoose para User

const getUserById = async (userId) => {
  try {
    const user = await User.findById(userId);
    return user;
  } catch (error) {
    throw new Error("Error al obtener el usuario: " + error.message);
  }
};

const updateUser = async (userId, updateData) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(userId, updateData, {
      new: true,
    });
    return updatedUser;
  } catch (error) {
    throw new Error("Error al actualizar el usuario: " + error.message);
  }
};

const verifyDocumentsForPremium = (documents) => {
  const requiredDocuments = [
    "Identificación",
    "Comprobante de domicilio",
    "Comprobante de estado de cuenta",
  ];
  const uploadedDocuments = documents.map((doc) => doc.name);
  return requiredDocuments.every((doc) => uploadedDocuments.includes(doc));
};

export { getUserById, updateUser, verifyDocumentsForPremium };
