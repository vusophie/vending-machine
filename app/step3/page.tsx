'use client';
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
          setIsTimerExpired(true);
          handleModifyPayment();
        }
        return prevTimer - 1;
      });
    }, 1000);
  
    return () => clearInterval(countdown);
  }, []);

  useEffect(() => {
    console.log("Updated Wallet:", wallet);
  }, [wallet]);

  const totalAmount = Object.entries(amounts).reduce(
    (acc, [coin, count]) => acc + count * (coin === "nickel" ? 5 : coin === "dime" ? 10 : 25),
    0
  );

  const changeDue = totalAmount - selectedItem.price;
  const isChangeDue = changeDue >= 0;

  /**
   * Resets coin amounts and navigates back to the coins step.
   * @returns {void}
   */
  const handleModifyPayment = () => {
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

  /**
   * Confirms the payment and navigates to the enjoy step.
   * @returns {void}
   */
  const handleConfirm = () => {
    onNext("enjoy", amounts, wallet);
  };

  return (
    <div className="flex flex-col items-center gap-6 p-6">
      <Card shadow="lg" className="rounded-xl ">
        <CardBody className="flex flex-col items-center text-center">
          <Image alt={selectedItem.drink} className="rounded-xl mb-6" src={selectedItem.img} width={180} height={180} />
          <p className="text-2xl font-semibold mb-2">{selectedItem.drink}</p>
          <p className="text-lg mb-4">Price: {selectedItem.price}¢</p>
          <p className="font-semibold text-lg mt-2">
            Change Due: {isChangeDue ? changeDue : 0}¢
          </p>
          {!isChangeDue && (
            <p className="text-red-500 text-sm mt-2">Oops! You don't have enough funds for this item.</p>
          )}
          <p className="mt-4 text-sm">
            Time remaining: <strong>{timer}s</strong>
          </p>
        </CardBody>
      </Card>
      <div className="w-full max-w-md">
        <div className="flex space-x-4 mt-4">
          <Button
            onClick={handleConfirm}
            color="primary" variant="solid" 
            className="w-full sm:w-auto"
          >
            Confirm Payment
          </Button>
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
