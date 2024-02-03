// Importa la biblioteca Joi, que se utiliza para la validación de datos
import Joi from "joi";

// Definición de la clase User
class User {
  // Constructor de la clase que toma un objeto user como argumento
  constructor(user) {
    // Asigna el objeto user al objeto User
    this.user = user;
  }

  // Método estático para autenticar un objeto user
  static authenticate(user) {
    // Define el esquema de validación para un objeto user usando Joi
    const PersonSchema = Joi.object({
      // El usuario debe tener un nombre (name) que es una cadena y es obligatorio
      name: Joi.string().required(),
      // El usuario debe tener una contraseña o secreto (secret) que es una cadena y es obligatorio
      secret: Joi.string().required(),
      // El usuario puede tener un número de contacto (contact) que es un número
      contact: Joi.number(),
      // El usuario debe tener un correo electrónico (mail) que es una cadena y es obligatorio
      mail: Joi.string().required(),
      // El usuario debe tener una clave de acceso (accessKey) que es una cadena y es obligatorio
      accessKey: Joi.string().required(),
      // El usuario puede tener un campo verificado (verified) que es un booleano
      verified: Joi.boolean(),
      // El usuario puede tener una fecha de registro (registrationDate) que es una fecha
      registrationDate: Joi.date(),
      documents: Joi.array().items(
        Joi.object({
          name: Joi.string().required(),
          reference: Joi.string().required(),
        })
      ),
      last_connection: Joi.date(),
    });

    // Valida el objeto user proporcionado contra el esquema definido anteriormente
    const { error } = PersonSchema.validate(user);
    // Si hay un error en la validación, lanza el error
    if (error) throw error;
  }
}

// Exporta la clase User para que pueda ser utilizada en otros módulos
export default User;
