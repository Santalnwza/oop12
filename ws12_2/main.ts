import { ProductDAO } from "./ProductDAO";
import { OrderDAO } from "./OrderDAO";

const productDAO = new ProductDAO();
const orderDAO = new OrderDAO(productDAO);

productDAO.addProduct('Mouse ', 450, 10);
productDAO.addProduct('Keyboard ', 1200, 5);
productDAO.addProduct('Lenovo PC ', 7500, 10);
productDAO.addProduct('HP printer ', 2000, 20);

const product = productDAO.findProductById(1);

if (product) {
    console.log(`ก่อนสั่งซื้อ: ${product.getName()} สต็อกคงเหลือ = ${product.getStock()}`);
    const newOrder = orderDAO.createOrder(product, 3);
    if (newOrder) {
        console.log(`สั่งซื้อสำเร็จ! ${newOrder.getInfo()}`);
        const updatedProduct = productDAO.findProductById(1);
        console.log(`หลังสั่งซื้อ: ${updatedProduct?.getName()} สต็อกคงเหลือ = ${updatedProduct?.getStock()}`);
    }
}