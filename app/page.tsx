'use client';

import { Breadcrumbs, BreadcrumbItem } from "@heroui/breadcrumbs";
import { useState } from 'react';
import Step1Page from "./step1/page";
import Step2Page from "./step2/page";
import Step3Page from "./step3/page";
import Step4Page from "./step4/page";
import { Button, Popover, PopoverTrigger, PopoverContent } from "@heroui/react";
import { HelpCircle } from "lucide-react";

function Home() {
  const [currentPage, setCurrentPage] = useState<keyof typeof components>("coins"); 
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [amounts, setAmounts] = useState({ nickel: 0, dime: 0, quarter: 0 });
  const [totalAmount, setTotalAmount] = useState(0);
  const [wallet, setWallet] = useState({ nickel: 5, dime: 5, quarter: 5 });
  const [showHelp, setShowHelp] = useState(false);

  const toggleHelpMessage = () => {
    setShowHelp((prevShowHelp) => !prevShowHelp);
  };

  const resetData = () => {
    setSelectedItem(null);
    setAmounts({ nickel: 0, dime: 0, quarter: 0 });
    setTotalAmount(0);
  };

  const handleNext = (page: keyof typeof components, newAmounts?: any, updatedWallet?: any) => {
    if (newAmounts) {
      setAmounts(newAmounts);
      const total = newAmounts.nickel * 5 + newAmounts.dime * 10 + newAmounts.quarter * 25;
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
        onNext={handleNext}
        setSelectedItem={setSelectedItem}
        amounts={amounts}
        setAmounts={setAmounts}
        wallet={wallet} // Pass wallet here
        setWallet={setWallet} // Pass setWallet here
      />
    ),
    select: () => (
      <Step2Page 
        onNext={handleNext} 
        selectedItem={selectedItem} 
        setSelectedItem={setSelectedItem} 
        amounts={amounts} 
        wallet={wallet} // Pass wallet here
        setWallet={setWallet} // Pass setWallet here
      />
    ),
    confirm: () => (
      <Step3Page 
        onNext={handleNext} 
        selectedItem={selectedItem} 
        amounts={amounts} 
        setAmounts={setAmounts}
        wallet={wallet} // Pass wallet here  
        setWallet={setWallet} // Pass setWallet here
      />
    ),
    enjoy: () => (
      <Step4Page 
        onNext={handleNext} 
        selectedItem={selectedItem} 
        amounts={amounts} 
        wallet={wallet} // Pass wallet here  
        setWallet={setWallet} // Pass setWallet here
      />
    ),
  };

  const CurrentComponent = components[currentPage];

  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <div className="flex items-center gap-4">
        <h1 className="text-3xl font-semibold text-center">Sophie's Vending Machine</h1>
        
        {/* Help Button with Popover */}
        <Popover key={"primary"} color={"primary"} placement="top">
          <PopoverTrigger>
            <Button className="rounded-full shadow-md" color="primary" variant="solid">
              <HelpCircle className="w-6 h-6" />
            </Button>
          </PopoverTrigger>
          <PopoverContent>
            <div className="px-1 py-2">
              <h1 className="font-bold">Help</h1>
              <div className="">
                To use the vending machine, insert coins, select a product, confirm your purchase, and enjoy!
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </div>
      <div className="inline-block max-w-xl text-center justify-center">
        <Breadcrumbs size="lg">
          <BreadcrumbItem key="coins" isCurrent={currentPage === "coins"}>Deposit Coins</BreadcrumbItem>
          <BreadcrumbItem key="select" isCurrent={currentPage === "select"}>Select a Product</BreadcrumbItem>
          <BreadcrumbItem key="confirm" isCurrent={currentPage === "confirm"}>Confirm Purchase</BreadcrumbItem>
          <BreadcrumbItem key="enjoy" isCurrent={currentPage === "enjoy"}>Enjoy!</BreadcrumbItem>
        </Breadcrumbs>
      </div>

      <div className="flex gap-3">
        <CurrentComponent onNext={handleNext} />
      </div>
    </section>
  );
}

export default Home;