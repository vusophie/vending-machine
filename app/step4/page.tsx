import { Button, Card, CardBody, Image } from "@heroui/react";
import { CheckCircle } from "lucide-react";
import { useEffect, useState, useRef } from "react";
import { stockService } from "../services/stockservice";

export default function Step4Page({ onNext, selectedItem, amounts, wallet, setWallet }) {
  const updateStockRef = useRef(null);
  const [change, setChange] = useState(0);
  const [selectedCoin, setSelectedCoin] = useState(null);
  const [coinOptions, setCoinOptions] = useState({ nickel: true, dime: true, quarter: true, none: true });

  useEffect(() => {
    if (selectedItem && updateStockRef.current !== selectedItem.drink) {
      stockService.updateStock(selectedItem.drink, selectedItem.quantity);
      updateStockRef.current = selectedItem.drink;
    }
  }, [selectedItem]);

  const totalAmount = Object.entries(amounts).reduce(
    (acc, [coin, count]) => acc + count * (coin === "nickel" ? 5 : coin === "dime" ? 10 : 25),
    0
  );

  const itemPrice = selectedItem.price;
  const changeDue = totalAmount - itemPrice;

  useEffect(() => {
    setChange(changeDue);
    setCoinOptions({
      nickel: changeDue >= 5,
      dime: changeDue >= 10,
      quarter: changeDue >= 25,
      none: changeDue === 0
    });
  }, [changeDue]);

  useEffect(() => {
    if (wallet) {
      setWallet(wallet);
    }
  }, [wallet, setWallet]);

  /**
   * Handles the selection of coin type for change.
   * @param {string} coinType - The type of coin selected.
   */
  const handleCoinSelection = (coinType) => {
    let remaining = changeDue;
    let coinsReturned = { nickel: 0, dime: 0, quarter: 0 };

    if (coinType === "none") {
      coinsReturned = { nickel: 0, dime: 0, quarter: 0 }; 
    }
    if (coinType === "quarter" && remaining >= 25) {
      coinsReturned.quarter = Math.floor(remaining / 25);
      remaining %= 25;
    }
    if (coinType === "dime" && remaining >= 10) {
      coinsReturned.dime = Math.floor(remaining / 10);
      remaining %= 10;
    }
    if (remaining >= 5) {
      coinsReturned.nickel = Math.floor(remaining / 5);
      remaining %= 5;
    }

    setSelectedCoin(coinsReturned);
  };

  if (!selectedItem) {
    return <div>No item selected.</div>;
  }

  /**
   * Handles returning to the coins step and updating the wallet.
   */
  const handleReturnToCoins = () => {
    const updatedWallet = { ...wallet };

    Object.entries(selectedCoin).forEach(([coin, count]) => {
      updatedWallet[coin] = (updatedWallet[coin] || 0) + count;
    });

    setWallet(updatedWallet);
    onNext("coins");
  };

  return (
    <div className="flex flex-col items-center justify-center text-center space-y-6 p-6">
      <CheckCircle className="w-24 h-24 text-green-500 animate-pulse" />
      <h2 className="text-3xl font-bold ">Order Successful!</h2>
      <p className="text-lg ">Your {selectedItem.drink} is being prepared.</p>

      <Card shadow="sm" className="p-6 w-full max-w-md rounded-xl bg-gradient-to-r from-teal-400 to-blue-500">
        <CardBody className="text-center flex flex-col items-center">
          <Image
            alt={selectedItem.drink}
            className="rounded-xl mb-6"
            src={selectedItem.img}
            width={180}
            height={180}
          />
          <p className="text-2xl font-semibold">{selectedItem.drink}</p>
          <p className="text-lg">Price: {itemPrice}¢</p>
          <p className="text-lg">Total Paid: {totalAmount}¢</p>
          <p className="text-lg font-semibold">Change Due: {changeDue}¢</p>
        </CardBody>
      </Card>

      <p className="text-lg ">Select coin type for your change:</p>
      <div className="flex gap-4">
        <Button onClick={() => handleCoinSelection("quarter")} isDisabled={!coinOptions.quarter} className="bg-blue-600 text-white px-6 py-2 rounded-lg shadow-md hover:bg-blue-700 transition">
          25¢
        </Button>
        <Button onClick={() => handleCoinSelection("dime")} isDisabled={!coinOptions.dime} className="bg-blue-600 text-white px-6 py-2 rounded-lg shadow-md hover:bg-blue-700 transition">
          10¢
        </Button>
        <Button onClick={() => handleCoinSelection("nickel")} isDisabled={!coinOptions.nickel} className="bg-blue-600 text-white px-6 py-2 rounded-lg shadow-md hover:bg-blue-700 transition">
          5¢
        </Button>
        <Button onClick={() => handleCoinSelection("none")} isDisabled={!coinOptions.none} className="bg-blue-600 text-white px-6 py-2 rounded-lg shadow-md hover:bg-blue-700 transition">
          0¢
        </Button>
      </div>

      {selectedCoin && (
        <div className="mt-4">
          <p className="text-lg font-semibold">Your change:</p>
          {Object.entries(selectedCoin).map(([coin, count]) =>
            count > 0 ? <p key={coin}>{count} × {coin === "nickel" ? "5¢" : coin === "dime" ? "10¢" : "25¢"}</p> : null
          )}
          <Button onClick={handleReturnToCoins} className="bg-purple-600 text-white px-6 py-2 rounded-lg shadow-md hover:bg-purple-700 transition mt-4">
            Back
          </Button>
        </div>
      )}
    </div>
  );
}
