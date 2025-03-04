import { Button, Card, CardBody, Drawer, DrawerBody, DrawerContent, DrawerFooter, DrawerHeader, Image, Input, useDisclosure } from "@heroui/react";
import { useState, useEffect } from "react";
import { Item, stockService } from "../services/stockservice";

export default function Step2Page({ onNext, selectedItem, setSelectedItem, amounts, wallet, setWallet }) {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const [localSelectedItem, setLocalSelectedItem] = useState<Item | null>(selectedItem);
  const [quantity, setQuantity] = useState(1);
  const [stock, setStock] = useState<Item[]>([]);

  const totalAmount = (amounts.nickel * 5) + (amounts.dime * 10) + (amounts.quarter * 25);

  useEffect(() => {
    setStock(stockService.getStock());
  }, []);

  useEffect(() => {
    setLocalSelectedItem(selectedItem);
  }, [selectedItem]);

  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [totalDrawerOpen, setTotalDrawerOpen] = useState(false);

  /**
   * Opens the drawer for the selected item.
   * @param {Item} item - The selected item.
   */
  const handleOpen = (item) => {
    setLocalSelectedItem(item);
    setQuantity(1);
    onOpen();
  };

  /**
   * Handles the checkout process for the selected item.
   */
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

  /**
   * Cancels the current selection and resets the wallet and amounts.
   */
  const handleCancel = () => {
    const updatedWallet = {
      nickel: wallet.nickel + amounts.nickel,
      dime: wallet.dime + amounts.dime,
      quarter: wallet.quarter + amounts.quarter,
    };

    setWallet(updatedWallet);

    onNext("coins", {
      nickel: 0,
      dime: 0,
      quarter: 0,
    }, updatedWallet);
  };

  return (
    <div className="flex flex-col items-center space-y-6 p-6 min-h-screen">
      <Button 
        onPress={() => setTotalDrawerOpen(true)} 
        variant="solid" 
        color="primary" 
        className="w-full mb-4"
      >
        Total Inserted: {totalAmount}¢ (View Details)
      </Button>
  
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
        {stock.map((item, index) => (
          <Card key={index} shadow="sm" className="p-4 rounded-lg hover:shadow-lg transition-all">
            <CardBody className="flex flex-col items-center text-center">
              <Image 
                alt={item.drink} 
                src={item.img} 
                width={180} 
                height={180} 
                className="rounded-xl mb-4"
              />
              <h4 className="text-lg font-medium">{item.drink}</h4>
              <p>{item.price}¢</p>
              <p className="mb-4">Available: {item.amount}</p>
  
              <Button
                onPress={() => handleOpen(item)}
                isDisabled={item.amount === 0 || quantity * item.price > totalAmount}
                variant={item.amount === 0 ? "light" : item.price > totalAmount ? "outline" : "solid"}
                color={item.amount === 0 ? "gray" : item.price > totalAmount ? "orange" : "primary"}
                className="w-full text-sm"
              >
                {item.amount === 0 ? "Out of Stock" : item.price > totalAmount ? "Insufficient Funds" : "Add"}
              </Button>
            </CardBody>
          </Card>
        ))}
      </div>

      <Button
        onClick={handleCancel}
        color="danger"
        variant="light"
        className="w-full sm:w-auto"
      >
        Cancel
      </Button>
  
      {localSelectedItem && (
        <Drawer isOpen={isOpen} onOpenChange={onOpenChange} size="md">
          <DrawerContent className="flex flex-col items-center">
            <DrawerHeader className="font-semibold text-lg text-center w-full mb-6">
              {localSelectedItem.drink}
            </DrawerHeader>
  
            <DrawerBody className="flex flex-col items-center w-full p-6">
              <Image
                alt={localSelectedItem.drink}
                src={localSelectedItem.img}
                width={250}
                height={250}
                className="rounded-lg mb-6"
              />
  
              <div className="w-full text-center">
                <p className="text-lg mb-2">Price: {localSelectedItem.price}¢</p>
                <p className="text-lg mb-4">Available: {localSelectedItem.amount}</p>
              </div>
            </DrawerBody>
  
            <DrawerFooter className="flex justify-around w-full p-4">
              <Button
                color="danger"
                variant="light"
                onPress={onClose}
                className="w-1/3 text-lg py-3"
              >
                Cancel
              </Button>
  
              <Button
                color="primary"
                onPress={handleCheckout}
                isDisabled={quantity * localSelectedItem.price > totalAmount}
                className="w-1/3 text-lg py-3"
              >
                Checkout
              </Button>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      )}
  
      <Drawer isOpen={totalDrawerOpen} onOpenChange={() => setTotalDrawerOpen(false)} size="md">
        <DrawerContent className="flex flex-col items-center">
          <DrawerBody className="flex flex-col items-center w-full p-6">
            <h3 className="text-xl font-semibold mb-4">Total Inserted: {totalAmount}¢</h3>
            <div className="mb-6 p-4 rounded-lg border border-gray-200 w-full">
              <p>Nickels: {amounts.nickel} ({amounts.nickel * 5}¢)</p>
              <p>Dimes: {amounts.dime} ({amounts.dime * 10}¢)</p>
              <p>Quarters: {amounts.quarter} ({amounts.quarter * 25}¢)</p>
            </div>
          </DrawerBody>
  
          <DrawerFooter className="flex justify-around w-full p-4">
            <Button 
              color="danger" 
              variant="light" 
              onPress={() => setTotalDrawerOpen(false)} 
              className="w-1/3 text-lg py-3"
            >
              Close
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </div>
  );
}
