// Importa los routers de cada módulo
import productsRouter from "./products.js"; // Router para gestionar productos
import cartsRouter from "./carts.js"; // Router para gestionar carritos
import authRouter from "./auth.js"; // Router para gestionar autenticación
import blogRouter from "./blog.js"; // Router para gestionar el blog

// Exporta los routers para ser utilizados en otros módulos
export { productsRouter, cartsRouter, authRouter, blogRouter };
