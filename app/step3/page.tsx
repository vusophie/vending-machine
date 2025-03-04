import { Button, Card, CardBody, Image } from "@heroui/react";
import { useEffect, useState } from "react";

export default function Step3Page({
  onNext,
  selectedItem,
  amounts,
  setAmounts,
  wallet,
  setWallet
}) {
  if (!selectedItem) {
    return <div>No item selected.</div>;
  }

  const [timer, setTimer] = useState(30);
  const [isTimerExpired, setIsTimerExpired] = useState(false);

  useEffect(() => {
    const countdown = setInterval(() => {
      setTimer(prevTimer => {
        if (prevTimer === 1) {
          clearInterval(countdown);
          setIsTimerExpired(true); // Time is up, redirect to modify payment
          handleModifyPayment();   // Automatically trigger modify payment
        }
        return prevTimer - 1;
      });
    }, 1000);
  
    return () => clearInterval(countdown); // Cleanup on component unmount
  }, []);

  useEffect(() => {
    console.log("Updated Wallet in Step3Page:", wallet);
  }, [wallet]);

  const totalAmount = Object.entries(amounts).reduce(
    (acc, [coin, count]) => acc + count * (coin === "nickel" ? 5 : coin === "dime" ? 10 : 25),
    0
  );

  const changeDue = totalAmount - selectedItem.price;
  const isChangeDue = changeDue >= 0;

  // Function to reset coin amounts when going back to the coins step
  const handleModifyPayment = () => {
    console.log("Wallet before modifying payment:", wallet);
    console.log("Amounts before modifying payment:", amounts);

    // Add the total amount paid back to the wallet
    const updatedWallet = {
      nickel: wallet.nickel + amounts.nickel,
      dime: wallet.dime + amounts.dime,
      quarter: wallet.quarter + amounts.quarter,
    };

    console.log("Updated Wallet after adding total amount back:", updatedWallet);
    setWallet(updatedWallet);

    // Call onNext with the updated wallet and reset selected amounts
    onNext("coins", {
      nickel: 0,
      dime: 0,
      quarter: 0,
    }, updatedWallet);

    console.log("Wallet after calling onNext:", updatedWallet);
  };

  const handleConfirm = () => {
    console.log("Confirming payment...");
    console.log("Selected Item:", selectedItem);
    console.log("Total Amount Paid:", totalAmount);
    console.log("Change Due:", isChangeDue ? changeDue : 0);
    console.log("Wallet Before Confirmation:", wallet);
    console.log("Amounts Used:", amounts);

    onNext("enjoy", amounts, wallet);
    
  };

  return (
    <div className="flex flex-col items-center gap-6 p-6">
      {/* Drink Selection Card */}
      <Card shadow="lg" className="rounded-xl ">
        <CardBody className="flex flex-col items-center text-center">
          {/* Drink Image */}
          <Image alt={selectedItem.drink} className="rounded-xl mb-6" src={selectedItem.img} width={180} height={180} />
  
          {/* Drink Name and Price */}
          <p className="text-2xl font-semibold mb-2">{selectedItem.drink}</p>
          <p className="text-lg mb-4">Price: {selectedItem.price}¢</p>
  
          
          {/* Change Due */}
          <p className="font-semibold text-lg mt-2">
            Change Due: {isChangeDue ? changeDue : 0}¢
          </p>
  
          {/* Insufficient funds message */}
          {!isChangeDue && (
            <p className="text-red-500 text-sm mt-2">Oops! You don't have enough funds for this item.</p>
          )}
  
          {/* Timer Display */}
          <p className="mt-4 text-sm">
            Time remaining: <strong>{timer}s</strong>
          </p>
        </CardBody>
      </Card>
  
      {/* Action Buttons */}
      <div className="w-full max-w-md">
        <div className="flex space-x-4 mt-4">
          {/* Confirm Payment Button */}
          <Button
            onClick={handleConfirm}
            color="primary" variant="solid" 
            className="w-full sm:w-auto"
          >
            Confirm Payment
          </Button>
  
          {/* Modify Payment Button */}
          <Button
            onClick={handleModifyPayment}
            color="danger"
            variant="light"
            className="w-full sm:w-auto"
          >
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
  
}
