import Web3 from "web3";

const CELO_RPC = "https://alfajores-forno.celo-testnet.org"; // CELO Testnet RPC
const RECEIVER_ADDRESS = "0xfb4580155df1869e4145a5313b23606b9a9b101d"; // 👈 Replace this
const MIN_AMOUNT_CELO = 0.01; // Minimum CELO amount to count as valid

const web3 = new Web3(CELO_RPC);
let lastTxHash = "";
let paymentHistory = [];

export default async function handler(req, res) {
  try {
    // Get the latest 10 blocks for recent transactions
    const latestBlock = await web3.eth.getBlockNumber();
    const blocksToCheck = 10;

    let validTx = null;

    for (let i = 0; i < blocksToCheck; i++) {
      const block = await web3.eth.getBlock(latestBlock - i, true);
      if (!block || !block.transactions) continue;

      const tx = block.transactions.find(
        (t) =>
          t.to &&
          t.to.toLowerCase() === RECEIVER_ADDRESS.toLowerCase() &&
          parseFloat(web3.utils.fromWei(t.value, "ether")) >= MIN_AMOUNT_CELO
      );

      if (tx) {
        validTx = tx;
        break;
      }
    }

    if (!validTx)
      return res.status(200).json({ payment: false, message: "No valid payment found" });

    // Ignore if we already processed this transaction
    if (validTx.hash === lastTxHash)
      return res.status(200).json({ payment: false, message: "No new payment" });

    lastTxHash = validTx.hash;

    // Record transaction
    const amount = parseFloat(web3.utils.fromWei(validTx.value, "ether")).toFixed(4);
    const record = {
      from: validTx.from,
      amount,
      hash: validTx.hash,
      time: new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }),
    };

    paymentHistory.unshift(record);
    if (paymentHistory.length > 10) paymentHistory.pop();

    console.log("✅ New payment detected:", amount, "CELO from", validTx.from);

    // Respond to ESP8266
    return res.status(200).json({ payment: true, amount, hash: validTx.hash });
  } catch (err) {
    console.error("Error checking payment:", err);
    res.status(500).json({ error: "Error checking payment" });
  }
}

// Export shared memory for UI page
export { paymentHistory };
