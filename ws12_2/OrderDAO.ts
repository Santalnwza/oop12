import { BaseDAO } from "./BaseDAO";
import { Order } from "./Order";
import { Product } from "./Product";
import { ProductDAO } from "./ProductDAO";

export class OrderDAO extends BaseDAO {
    private productDAO: ProductDAO;

    constructor(productDAO: ProductDAO) {
        super();
        this.productDAO = productDAO;
    }

    protected iniTable(): void {
        this.db.exec(`
            CREATE TABLE IF NOT EXISTS orders (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                productName TEXT NOT NULL,
                quantity INTEGER NOT NULL,
                totalPrice REAL NOT NULL
            )
        `);
    }

    public createOrder(product: Product, quantity: number): Order | null {
        if (product.getStock() < quantity) {
            console.log(` สินค้าไม่พอสั่งซื้อ! (${product.getName()} เหลือสต็อก: ${product.getStock()})`);
            return null;
        }

        const totalPrice = product.getPrice() * quantity;


        const stmt = this.db.prepare(
            'INSERT INTO orders (productName, quantity, totalPrice) VALUES (?, ?, ?)'
        );
        const result = stmt.run(product.getName(), quantity, totalPrice);

        if (result.changes > 0) {
            const newStock = product.getStock() - quantity;
            this.productDAO.updateStock(product.getId(), newStock);
            product.setStock(newStock);

            return new Order(Number(result.lastInsertRowid), product.getName(), quantity, totalPrice);
        }

        return null;
    }
}