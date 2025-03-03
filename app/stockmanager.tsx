import { useState, useEffect } from 'react';

interface Stock {
  [key: string]: number;
}

const StockManager = () => {
  const initialStock: Stock = {
    Cola: 1,
    'Diet Cola': 8,
    'Lime Soda': 0, // Out of stock
    Water: 2,
  };

  // Get stock from localStorage or use initial stock if no stock is available
  const getStockFromStorage = () => {
    const storedStock = localStorage.getItem('stock');
    if (storedStock) {
      return JSON.parse(storedStock);
    }
    return initialStock;
  };

  const [stock, setStock] = useState<Stock>(getStockFromStorage);

  // Store stock in localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('stock', JSON.stringify(stock));
  }, [stock]);

  // Update stock when a drink is purchased
  const updateStock = (drink: string) => {
    if (stock[drink] > 0) {
      setStock({ ...stock, [drink]: stock[drink] - 1 });
    }
  };

  return { stock, updateStock };
};

export default StockManager;
