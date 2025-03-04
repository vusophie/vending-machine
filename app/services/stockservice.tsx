// stockService.ts
export type Item = {
  drink: string;
  price: number;
  img: string;
  amount: number;
};

class StockService {
  private stock: Item[] = [
    { amount: 10, drink: "Cola", price: 25, img: "/cola.png" },
    { amount: 8, drink: "Diet Cola", price: 35, img: "/diet.png" },
    { amount: 0, drink: "Lime Soda", price: 25, img: "/sprite.png" },
    { amount: 2, drink: "Water", price: 45, img: "/water.png" },
  ];

  getStock() {
    return this.stock;
  }

  updateStock(drink: string, quantity: number) {
    this.stock = this.stock.map((item) => {
      if (item.drink === drink) {
        const newAmount = item.amount - quantity;

        return { ...item, amount: newAmount };
      }

      return item;
    });
  }
}

export const stockService = new StockService();
