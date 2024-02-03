import Joi from "joi";

// Definición de la clase Article
class Article {
  // Constructor de la clase que toma un objeto article como argumento
  constructor(article) {
    // Asigna el objeto article al objeto Article
    this.article = article;
  }

  // Método estático para confirmar la validez de un objeto article
  static confirm(article) {
    // Define el esquema de validación para un objeto article usando Joi
    const ArticleSchema = Joi.object({
      // El artículo debe tener un encabezado (heading) que es una cadena y es obligatorio
      heading: Joi.string().required(),
      // El artículo debe tener un cuerpo (body) que es una cadena y es obligatorio
      body: Joi.string().required(),
      // El artículo puede tener un enlace (link) que es una cadena
      link: Joi.string(),
      // El artículo puede tener una marca de tiempo (timestamp) de creación que es una fecha
      creationDate: Joi.date(),
    });

    // Valida el objeto article proporcionado contra el esquema definido anteriormente
    const { error } = ArticleSchema.validate(article);
    // Si hay un error en la validación, lanza el error
    if (error) throw error;
  }
}

// Exporta la clase Article para que pueda ser utilizada en otros módulos
export default Article;
