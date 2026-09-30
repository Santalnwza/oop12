import { BaseDAO } from "./BaseDAO";
import { Product } from "./Product";

export class ProductDAO extends BaseDAO {
    protected iniTable(): void {
        this.db.exec(`
            CREATE TABLE IF NOT EXISTS products (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL,
                price REAL NOT NULL,
                stock INTEGER NOT NULL
            )
        `);
    }

    public addProduct(name: string, price: number, stock: number): boolean {
        const stmt = this.db.prepare(
            'INSERT INTO products (name, price, stock) VALUES (?, ?, ?)'
        );
        const result = stmt.run(name, price, stock);
        return result.changes > 0;
    }

    public findProductById(id: number): Product | null {
        const stmt = this.db.prepare('SELECT * FROM products WHERE id = ?');
        const row = stmt.get(id) as { id: number, name: string, price: number, stock: number } | undefined;
        
        if (!row) return null;
        return new Product(row.id, row.name, row.price, row.stock);
    }

    public updateStock(id: number, newStock: number): boolean {
        const stmt = this.db.prepare('UPDATE products SET stock = ? WHERE id = ?');
        const result = stmt.run(newStock, id);
        return result.changes > 0;
    }
}