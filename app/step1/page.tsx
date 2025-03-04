import { Button, Card, CardBody, CardFooter, Image, NumberInput } from "@heroui/react";
import { useState, useEffect, useRef } from "react";

export default function Step1Page({ onNext, wallet }) {
  const data = [
    { name: "nickel", value: 5, price: "5¢", img: "/1coin.png" },
    { name: "dime", value: 10, price: "10¢", img: "/2coins.png" },
    { name: "quarter", value: 25, price: "25¢", img: "/3coins.png" },
  ];

  const [tempAmounts, setTempAmounts] = useState({ nickel: 0, dime: 0, quarter: 0 });
  const handleNextRef = useRef(null);

  /**
   * Calculates the total amount of inserted coins.
   * @returns {number} Total amount of inserted coins in cents.
   */
  const totalAmount = Object.entries(tempAmounts).reduce((acc, [key, value]) => {
    const coin = data.find((c) => c.name === key);
    return acc + (coin ? coin.value * value : 0);
  }, 0);

  /**
   * Updates the amount of a specific coin type.
   * @param {string} coin - The name of the coin type.
   * @param {number} value - The new amount of the coin type.
   */
  const handleAmountChange = (coin, value) => {
    setTempAmounts((prev) => {
      const maxValue = Math.min(value, wallet[coin]);
      return { ...prev, [coin]: maxValue };
    });
  };

  /**
   * Resets the coin amounts and proceeds to the next step.
   */
  const handleNext = () => {
    setTempAmounts({ nickel: 0, dime: 0, quarter: 0 });
    onNext("select", tempAmounts);
  };

  handleNextRef.current = handleNext;

  /**
   * Handles key press events to update coin amounts or proceed to the next step.
   * @param {KeyboardEvent} event - The keyboard event.
   */
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
      } else if (event.key === "Enter" && totalAmount >= 25) {
        handleNextRef.current();
      }

      return updatedAmounts;
    });
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [wallet, totalAmount]);

  const isNextEnabled = totalAmount >= 25;

  return (
    <div className="flex flex-row items-start gap-6">
      <Card shadow="md" className="p-5 w-1/3 rounded-xl">
        <CardBody>
          <h3 className="text-xl font-semibold">Wallet Status</h3>
          <div className="mt-3 space-y-3">
            {data.map((coin) => (
              <div key={coin.name} className="flex justify-between text-sm font-medium">
                <span className="capitalize">{coin.name}: </span>
                <span>{tempAmounts[coin.name]} / {wallet[coin.name]}</span>
              </div>
            ))}
          </div>
        </CardBody>
      </Card>

      <div className="w-2/3 space-y-4">
        <Card shadow="lg" className="p-6 rounded-xl">
          <CardBody>
            <h3 className="text-2xl font-boldmb-4"><strong>💰 How to Use Your Wallet</strong></h3>
            <p className="text-sm  mb-4">
              <strong>Your Wallet Status:</strong> On the left side, you'll see your wallet’s status, showing your total coins and how many are left.
            </p>
            <div className="p-4 rounded-lg shadow-md border border-blue-300">
              <p className="text-sm mb-2">
                <span className="font-semibold">Insert Coins:</span><br />
                - Press <strong className="text-blue-600">n</strong> to insert 5 cents (nickels).<br />
                - Press <strong className="text-blue-600">d</strong> to insert 10 cents (dimes).<br />
                - Press <strong className="text-blue-600">q</strong> to insert 25 cents (quarters).
              </p>
              <p className="text-sm ">
                <span className="font-semibold">Other Actions:</span><br />
                - Press <strong className="text-red-600">c</strong> to clear all inserted coins.<br />
                - Once you've inserted at least 25 cents, press <strong className="text-green-600">Enter</strong> to proceed. <br/>
                - Press <strong className="text-blue-600">CTRL + R</strong> any time to refresh the page and restart the app.
              </p>
            </div>
          </CardBody>
        </Card>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {data.map((item) => (
            <Card key={item.name} shadow="sm" className="p-4 flex flex-col items-center rounded-lg">
              <CardBody className="flex flex-col items-center">
                <Image alt={item.name} className="mb-3 w-16 h-16 object-contain" src={item.img} />
                <NumberInput
                  hideStepper
                  className="w-full text-sm"
                  value={tempAmounts[item.name] || ""}
                  onChange={(e) => handleAmountChange(item.name, parseInt(e.target.value) || 0)}
                  endContent={<span className="text-sm">{item.price}</span>}
                  label="Insert Coins"
                  placeholder="Enter Amount"
                />
              </CardBody>
            </Card>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-4">
          <Button 
            onPress={() => setTempAmounts({ nickel: 0, dime: 0, quarter: 0 })} 
            variant="light" color="danger" size="md" className="w-full sm:w-auto">
            Clear Coins
          </Button>
          <Button color="primary" variant="solid" onPress={handleNext} isDisabled={!isNextEnabled} size="md" className="w-full sm:w-auto">
            Next: Select a Product
          </Button>
        </div>
      </div>
    </div>
  );
}
