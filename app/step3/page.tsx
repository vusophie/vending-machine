import { Button, Card, CardBody, Image } from "@heroui/react";
import { useEffect } from "react";

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
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <Card shadow="sm" className="p-4">
        <CardBody>
          <Image alt={selectedItem.drink} className="rounded-xl mb-2" src={selectedItem.img} width={150} height={150} />
          <p><strong>{selectedItem.drink}</strong></p>
          <p>Price: {selectedItem.price}¢</p>
          <p>Total Paid: {totalAmount}¢</p>
          {Object.entries(amounts).filter(([_, count]) => count > 0).map(([coin, count]) => (
            <p key={coin}>{count} × {coin}</p>
          ))}
          <p><strong>Change Due: </strong>{isChangeDue ? changeDue : 0}¢</p>
          {!isChangeDue && <p className="text-red-500">Not enough funds for this item.</p>}
        </CardBody>
      </Card>

      <Card shadow="sm" className="p-4 mt-4">
        <CardBody>
          <Button onClick={handleConfirm}>Confirm Payment</Button>
        </CardBody>
      </Card>

      <Card shadow="sm" className="p-4 mt-4">
        <CardBody>
          <Button onClick={handleModifyPayment}>Modify Payment Method</Button>
        </CardBody>
      </Card>
    </div>
  );
}
