import { Button, Card, CardBody, Image, NumberInput } from "@heroui/react";
import { useState, useEffect } from "react";
import { WalletService } from "../services/walletservice"; // Import walletService

export default function Step1Page({ onNext, wallet }) {
  const data = [
    { name: "nickel", value: 5, price: "5¢", img: "/1coin.png" },
    { name: "dime", value: 10, price: "10¢", img: "/2coins.png" },
    { name: "quarter", value: 25, price: "25¢", img: "/3coins.png" },
  ];

  // Track amounts temporarily so we don't modify the actual wallet
  const [tempAmounts, setTempAmounts] = useState({ nickel: 0, dime: 0, quarter: 0 });

  const totalAmount = Object.entries(tempAmounts).reduce((acc, [key, value]) => {
    const coin = data.find((c) => c.name === key);
    return acc + (coin ? coin.value * value : 0);
  }, 0);

  const handleAmountChange = (coin, value) => {
    setTempAmounts((prev) => {
      // Ensure we don’t add more coins than available in the wallet
      const maxValue = Math.min(value, wallet[coin]);
      const updatedTempAmounts = { ...prev, [coin]: maxValue };
      console.log("Updated Temp Amounts:", updatedTempAmounts); // Log updated temp amounts
      return updatedTempAmounts;
    });
  };

  const handleKeyPress = (event) => {
    setTempAmounts((prev) => {
      let updatedAmounts = { ...prev };

      if (event.key === "n" && wallet.nickel > updatedAmounts.nickel) {
        updatedAmounts.nickel += 1;
      } else if (event.key === "d" && wallet.dime > updatedAmounts.dime) {
        updatedAmounts.dime += 1;
      } else if (event.key === "q" && wallet.quarter > updatedAmounts.quarter) {
        updatedAmounts.quarter += 1;
      } else if (event.key === "c") {
        updatedAmounts = { nickel: 0, dime: 0, quarter: 0 };
      }

      console.log("Updated Temp Amounts after KeyPress:", updatedAmounts); // Log after key press
      return updatedAmounts;
    });
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyPress);
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [wallet]);

  const isNextEnabled = totalAmount >= 25;

  const handleNext = () => {
    // Update the wallet after the user proceeds to the next step
    setTempAmounts({ nickel: 0, dime: 0, quarter: 0 }); // Reset the temporary amounts
    onNext("select", tempAmounts);
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">

      {/* Wallet display section */}
      <div className="col-span-1 sm:col-span-2 lg:col-span-4 p-4 bg-gray-100 rounded-lg">
        <h3 className="text-xl font-bold">Wallet Status</h3>
        <div className="flex justify-between mt-2">
          <div>
            <p className="text-sm">Nickels Available: {wallet.nickel}</p>
            <p className="text-sm">Nickels Used: {tempAmounts.nickel}</p>
          </div>
          <div>
            <p className="text-sm">Dimes Available: {wallet.dime}</p>
            <p className="text-sm">Dimes Used: {tempAmounts.dime}</p>
          </div>
          <div>
            <p className="text-sm">Quarters Available: {wallet.quarter}</p>
            <p className="text-sm">Quarters Used: {tempAmounts.quarter}</p>
          </div>
        </div>
      </div>

      {data.map((item) => (
        <Card key={item.name} shadow="sm" className="p-4">
          <CardBody>
            <Image alt={item.name} className="rounded-xl mb-2" src={item.img} width={100} height={100} />
            <NumberInput
              hideStepper
              className="max-w-xs"
              value={tempAmounts[item.name] || ""}
              onChange={(e) => handleAmountChange(item.name, parseInt(e.target.value) || 0)}
              endContent={<span className="text-default-400 text-small">{item.price}</span>}
              label="Insert Coins"
              placeholder="Insert Coins"
            />
          </CardBody>
        </Card>
      ))}

      <Button onPress={() => setTempAmounts({ nickel: 0, dime: 0, quarter: 0 })} className="col-span-1 sm:col-span-2 lg:col-span-4" variant="outline">
        Clear Coins
      </Button>

      <Button onPress={handleNext} isDisabled={!isNextEnabled}>
        Next: Select a Product
      </Button>
    </div>
  );
};
