"use client";

import { Breadcrumbs, BreadcrumbItem } from "@heroui/breadcrumbs";
import { useState } from "react";
import { Button, Popover, PopoverTrigger, PopoverContent } from "@heroui/react";
import { HelpCircle } from "lucide-react";

import Step1Page from "./step1/page";
import Step2Page from "./step2/page";
import Step3Page from "./step3/page";
import Step4Page from "./step4/page";

function Home() {
  const [currentPage, setCurrentPage] =
    useState<keyof typeof components>("coins");
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [amounts, setAmounts] = useState({ nickel: 0, dime: 0, quarter: 0 });
  const [totalAmount, setTotalAmount] = useState(0);
  const [wallet, setWallet] = useState({ nickel: 5, dime: 5, quarter: 5 });
  const [showHelp, setShowHelp] = useState(false);

  /**
   * Toggles the visibility of the help message.
   * @returns {void}
   */
  const toggleHelpMessage = () => {
    setShowHelp((prevShowHelp) => !prevShowHelp);
  };

  /**
   * Resets the selected item, amounts, and total amount.
   * @returns {void}
   */
  const resetData = () => {
    setSelectedItem(null);
    setAmounts({ nickel: 0, dime: 0, quarter: 0 });
    setTotalAmount(0);
  };

  /**
   * Handles navigation to the next step and updates amounts and wallet.
   * @param {keyof typeof components} page - The next page to navigate to.
   * @param {object} [newAmounts] - The new amounts of coins.
   * @param {object} [updatedWallet] - The updated wallet.
   * @returns {void}
   */
  const handleNext = (
    page: keyof typeof components,
    newAmounts?: any,
    updatedWallet?: any,
  ) => {
    if (newAmounts) {
      setAmounts(newAmounts);
      const total =
        newAmounts.nickel * 5 + newAmounts.dime * 10 + newAmounts.quarter * 25;

      setTotalAmount(total);

      // Decrease wallet balance
      setWallet((prevWallet) => ({
        nickel: prevWallet.nickel - newAmounts.nickel,
        dime: prevWallet.dime - newAmounts.dime,
        quarter: prevWallet.quarter - newAmounts.quarter,
      }));
    }

    if (updatedWallet) {
      setWallet(updatedWallet);
    }
    if (page === "coins") {
      resetData();
    }
    setCurrentPage(page);
  };

  const components = {
    coins: () => (
      <Step1Page
        amounts={amounts}
        setAmounts={setAmounts}
        setSelectedItem={setSelectedItem}
        setWallet={setWallet} // Pass setWallet here
        wallet={wallet} // Pass wallet here
        onNext={handleNext}
      />
    ),
    select: () => (
      <Step2Page
        amounts={amounts}
        selectedItem={selectedItem}
        setSelectedItem={setSelectedItem}
        setWallet={setWallet} // Pass setWallet here
        wallet={wallet} // Pass wallet here
        onNext={handleNext}
      />
    ),
    confirm: () => (
      <Step3Page
        amounts={amounts}
        selectedItem={selectedItem}
        setAmounts={setAmounts}
        setWallet={setWallet} // Pass setWallet here
        wallet={wallet} // Pass wallet here
        onNext={handleNext}
      />
    ),
    enjoy: () => (
      <Step4Page
        amounts={amounts}
        selectedItem={selectedItem}
        setWallet={setWallet} // Pass setWallet here
        wallet={wallet} // Pass wallet here
        onNext={handleNext}
      />
    ),
  };

  const CurrentComponent = components[currentPage];

  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <div className="flex items-center gap-4">
        <h1 className="text-3xl font-semibold text-center">
          Sophie&apos;s Vending Machine
        </h1>

        <Popover key={"primary"} color={"primary"} placement="top">
          <PopoverTrigger>
            <Button
              className="rounded-full shadow-md"
              color="primary"
              variant="solid"
            >
              <HelpCircle className="w-6 h-6" />
            </Button>
          </PopoverTrigger>
          <PopoverContent>
            <div className="px-1 py-2">
              <h1 className="font-bold">Help</h1>
              <div className="">
                To use the vending machine, insert coins, select a product,
                confirm your purchase, and enjoy!
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </div>
      <div className="inline-block max-w-xl text-center justify-center">
        <Breadcrumbs size="lg">
          <BreadcrumbItem key="coins" isCurrent={currentPage === "coins"}>
            Deposit Coins
          </BreadcrumbItem>
          <BreadcrumbItem key="select" isCurrent={currentPage === "select"}>
            Select a Product
          </BreadcrumbItem>
          <BreadcrumbItem key="confirm" isCurrent={currentPage === "confirm"}>
            Confirm Purchase
          </BreadcrumbItem>
          <BreadcrumbItem key="enjoy" isCurrent={currentPage === "enjoy"}>
            Enjoy!
          </BreadcrumbItem>
        </Breadcrumbs>
      </div>

      <div className="flex gap-3">
        <CurrentComponent onNext={handleNext} />
      </div>
    </section>
  );
}

export default Home;
