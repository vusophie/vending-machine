type Wallet = {
    nickel: number;
    dime: number;
    quarter: number;
  };
  
  export function WalletService({ wallet }: { wallet: Wallet }) {
    const getTotalAmount = () => {
      return Object.entries(wallet).reduce((total, [coin, amount]) => {
        const coinValue = coin === "nickel" ? 5 : coin === "dime" ? 10 : 25;
        return total + coinValue * amount;
      }, 0);
    };
  
    return (
      <div className="p-4">
        <h2 className="text-lg font-bold">Your Wallet</h2>
        {Object.entries(wallet).map(([coin, amount]) => (
          <p key={coin}>{`${coin.charAt(0).toUpperCase() + coin.slice(1)}s: ${amount}`}</p>
        ))}
        <p className="font-semibold">Total: {getTotalAmount()}¢</p>
      </div>
    );
  }