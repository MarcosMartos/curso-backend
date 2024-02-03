// Definición de la clase ArticleDTO (Data Transfer Object para artículos)
class ArticleDTO {
  // Constructor de la clase que toma un objeto con propiedades específicas
  constructor({
    articleTitle,
    articleURL,
    articleContent,
    articleTimestamp,
    articleId,
  }) {
    // Asigna el ID del artículo al objeto
    this.articleId = articleId;
    // Asigna el título del artículo al objeto
    this.articleTitle = articleTitle;
    // Asigna el contenido del artículo al objeto
    this.articleContent = articleContent;
    // Asigna la marca de tiempo del artículo al objeto
    this.articleTimestamp = articleTimestamp;
    // Asigna la URL del artículo al objeto
    this.articleURL = articleURL;
  }
}

// Exporta la clase ArticleDTO para que pueda ser utilizada en otros módulos
export default ArticleDTO;
