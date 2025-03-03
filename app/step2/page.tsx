import { Button, Card, CardBody, Drawer, DrawerBody, DrawerContent, DrawerFooter, DrawerHeader, Image, Input, useDisclosure } from "@heroui/react";
import { useState, useEffect } from "react";
import { Item, stockService } from "../services/stockservice";

interface Step2PageProps {
  onNext: (page: string) => void;
  selectedItem: Item | null;
  setSelectedItem: (item: Item | null) => void;
  amounts: { nickel: number; dime: number; quarter: number }; // Inserted coin breakdown
}

export default function Step2Page({ onNext, selectedItem, setSelectedItem, amounts }: Step2PageProps) {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const [localSelectedItem, setLocalSelectedItem] = useState<Item | null>(selectedItem);
  const [quantity, setQuantity] = useState(1);
  const [stock, setStock] = useState<Item[]>([]);

  // Calculate total amount dynamically from inserted coins
  const totalAmount = (amounts.nickel * 5) + (amounts.dime * 10) + (amounts.quarter * 25);

  useEffect(() => {
    setStock(stockService.getStock());
  }, []);

  useEffect(() => {
    setLocalSelectedItem(selectedItem);
  }, [selectedItem]);


  const [isCheckingOut, setIsCheckingOut] = useState(false);

  const handleOpen = (item: Item) => {
    setLocalSelectedItem(item);
    setQuantity(1);
    onOpen();
  };

  const handleCheckout = () => {
    if (isCheckingOut) return;
    setIsCheckingOut(true);

    if (localSelectedItem && quantity > 0 && quantity <= localSelectedItem.amount) {
      setSelectedItem({ ...localSelectedItem, quantity });
      onClose();
      onNext("confirm");
    }

    setTimeout(() => setIsCheckingOut(false), 500);
  };

  return (
    <div className="flex flex-col items-center">
      <h2 className="text-xl font-bold mb-4">Total Inserted: {totalAmount}¢</h2>

      {/* Display inserted coin breakdown */}
      <div className="mb-4 p-4 border rounded-lg bg-gray-100">
        <h3 className="text-lg font-semibold mb-2">Inserted Coins:</h3>
        <p>Nickels: {amounts.nickel} ({amounts.nickel * 5}¢)</p>
        <p>Dimes: {amounts.dime} ({amounts.dime * 10}¢)</p>
        <p>Quarters: {amounts.quarter} ({amounts.quarter * 25}¢)</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stock.map((item, index) => (
          <Card key={index} shadow="sm" className="p-4">
            <CardBody>
              <Image alt={item.drink} className="rounded-xl mb-2" src={item.img} width={150} height={150} />
              <p>{item.drink}</p>
              <p>{item.price}¢</p>
              <p>Available: {item.amount}</p>
              <Button 
                onPress={() => handleOpen(item)} 
                isDisabled={quantity * item.price > totalAmount}
              >
                {item.amount === 0 ? "Out of Stock" : item.price > totalAmount ? "Insufficient Funds" : "Add"}
              </Button>
            </CardBody>
          </Card>
        ))}
      </div>

      {localSelectedItem && (
        <Drawer isOpen={isOpen} onOpenChange={onOpenChange}>
          <DrawerContent>
            <DrawerHeader>{localSelectedItem.drink}</DrawerHeader>
            <DrawerBody>
              <Image alt={localSelectedItem.drink} src={localSelectedItem.img} width={100} height={100} className="mb-4" />
              <p>Price: {localSelectedItem.price}¢</p>
              <p>Available: {localSelectedItem.amount}</p>
              <Input
                type="number"
                min={1}
                max={localSelectedItem.amount}
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
              />
            </DrawerBody>
            <DrawerFooter>
              <Button color="danger" variant="light" onPress={onClose}>Cancel</Button>
              <Button 
                color="primary" 
                onPress={handleCheckout} 
                isDisabled={quantity * localSelectedItem.price > totalAmount}
              >
                Checkout
              </Button>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      )}
    </div>
  );
}
