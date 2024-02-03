// Definición de la clase UserDTO (Data Transfer Object para Usuarios)
class UserDTO {
  // Constructor de la clase que toma un objeto con propiedades específicas
  constructor({
    accountId,
    accountEmail,
    accountUsername,
    accountPassword,
    accountPhone,
    accountConfirmed,
    accountToken,
    accountTimestamp,
  }) {
    // Asigna el ID de la cuenta al objeto
    this.accountId = accountId;
    // Asigna el correo electrónico de la cuenta al objeto
    this.accountEmail = accountEmail;
    // Asigna el nombre de usuario de la cuenta al objeto
    this.accountUsername = accountUsername;
    // Asigna la contraseña de la cuenta al objeto
    this.accountPassword = accountPassword;
    // Asigna el número de teléfono asociado a la cuenta al objeto
    this.accountPhone = accountPhone;
    // Asigna el estado de confirmación de la cuenta al objeto (por ejemplo, si el usuario ha confirmado su correo electrónico)
    this.accountConfirmed = accountConfirmed;
    // Asigna el token asociado a la cuenta al objeto
    this.accountToken = accountToken;
    // Asigna la marca de tiempo (timestamp) de cuando se creó la cuenta al objeto
    this.accountTimestamp = accountTimestamp;
  }
}

// Exporta la clase UserDTO para que pueda ser utilizada en otros módulos
export default UserDTO;
