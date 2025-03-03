import { Button, Card, CardBody, Image } from "@heroui/react";
import { CheckCircle } from "lucide-react";
import { useEffect, useState, useRef } from "react";
import { stockService } from "../services/stockservice";
import { walletService } from "../services/walletservice"; // Import walletService

export default function Step4Page({ onNext, selectedItem, amounts, wallet, setWallet }) {
  const updateStockRef = useRef(null);
  const [change, setChange] = useState(0);
  const [selectedCoin, setSelectedCoin] = useState(null);
  const [coinOptions, setCoinOptions] = useState({ nickel: true, dime: true, quarter: true });

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
      nickel: true,
      dime: changeDue >= 10,
      quarter: changeDue >= 25,
    });
  }, [changeDue]);

  useEffect(() => {
    if (wallet) {
      // Update the wallet state on mount based on the wallet from Step3Page
      setWallet(wallet);
      console.log("Wallet updated in Step4Page on load:", wallet);
    }
  }, [wallet, setWallet]);

  const handleCoinSelection = (coinType) => {
    let remaining = changeDue;
    let coinsReturned = { nickel: 0, dime: 0, quarter: 0 };

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

  const handleReturnToCoins = () => {
    // Add the selected change to the wallet
    const updatedWallet = { ...wallet };

    Object.entries(selectedCoin).forEach(([coin, count]) => {
      updatedWallet[coin] = (updatedWallet[coin] || 0) + count;
    });

    // Update the wallet in the parent component
    setWallet(updatedWallet);

    // Proceed to the Coins section
    onNext("coins");
  };

  if (!selectedItem) {
    return <div>No item selected.</div>;
  }

  return (
    <div className="flex flex-col items-center justify-center text-center space-y-6 p-6">
      <CheckCircle className="w-24 h-24 text-green-500" />
      <h2 className="text-3xl font-bold text-gray-800">Order Successful!</h2>
      <p className="text-lg text-gray-600">Your {selectedItem.drink} is being prepared.</p>

      <Card shadow="sm" className="p-4 w-full max-w-md">
        <CardBody>
          <Image alt={selectedItem.drink} className="rounded-xl mb-4 mx-auto" src={selectedItem.img} width={150} height={150} />
          <p className="text-lg font-semibold">{selectedItem.drink}</p>
          <p className="text-gray-600">Price: {itemPrice}¢</p>
          <p className="text-gray-600">Total Paid: {totalAmount}¢</p>
          <p className="text-gray-600 font-semibold">Change Due: {changeDue}¢</p>
        </CardBody>
      </Card>

      <p className="text-lg text-gray-600">Select coin type for your change:</p>
      <div className="flex gap-4">
        <Button onClick={() => handleCoinSelection("quarter")} disabled={!coinOptions.quarter} className="bg-blue-600 text-white px-6 py-2 rounded-lg shadow-md hover:bg-blue-700 transition">
          Quarters
        </Button>
        <Button onClick={() => handleCoinSelection("dime")} disabled={!coinOptions.dime} className="bg-blue-600 text-white px-6 py-2 rounded-lg shadow-md hover:bg-blue-700 transition">
          Dimes
        </Button>
        <Button onClick={() => handleCoinSelection("nickel")} className="bg-blue-600 text-white px-6 py-2 rounded-lg shadow-md hover:bg-blue-700 transition">
          Nickels
        </Button>
      </div>

      {selectedCoin && (
        <div className="mt-4">
          <p className="text-lg font-semibold">Your change:</p>
          {Object.entries(selectedCoin).map(([coin, count]) =>
            count > 0 ? <p key={coin}>{count} × {coin}</p> : null
          )}
          <Button onClick={handleReturnToCoins} className="bg-purple-600 text-white px-6 py-2 rounded-lg shadow-md hover:bg-purple-700 transition mt-4">
            Return to Coins
          </Button>
        </div>
      )}
    </div>
  );
}
