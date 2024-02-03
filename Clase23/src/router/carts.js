import { Router } from "express";
import CartsController from "../controllers/cart.js";
import { verifyAuth } from "../middlewares/auth.js";
import Ticket from "../models/model/Tickets.js";

const router = Router();

router.get("/create/:userId", verifyAuth, CartsController.createUserCart);

router.get("/:userId", verifyAuth, CartsController.getByUserId);

router.put("/remove/:userId", verifyAuth, CartsController.removeAllProducts);

router.put("/:userId", verifyAuth, CartsController.saveProduct);

router.put(
  "/:userId/:productId",
  verifyAuth,
  CartsController.updateProductOnCart
);

router.delete("/:userId", verifyAuth, CartsController.deleteCart);

router.post("/:cid/purchase", verifyAuth, async (req, res) => {
  try {
    const { cid } = req.params; // ID del carrito
    const cart = await Cart.findById(cid);

    if (!cart) {
      return res.status(404).json({ message: "Carrito no encontrado" });
    }

    // Lógica para generar un nuevo ticket
    const newTicket = new Ticket({
      code: generateTicketCode(), // Generar un código de ticket
      purchase_datetime: new Date(),
      amount: calculateTotalAmount(cart.items), // Calcular el monto total
      purchaser: req.currentUser.username,
    });

    // Guardar el nuevo ticket en la base de datos
    await newTicket.save();

    // Lógica para actualizar el stock de productos
    for (const item of cart.items) {
      const product = await Product.findById(item.itemId);
      if (product) {
        product.stock -= item.itemQuantity; // Actualizar el stock del producto
        await product.save();
      }
    }

    // Lógica para eliminar el carrito después de la compra
    await Cart.findByIdAndDelete(cid);

    res.status(200).json({ message: "Compra realizada con éxito" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al procesar la compra" });
  }
});

// Exporta el router para ser utilizado en otros módulos
export default router;
