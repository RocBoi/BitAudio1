let userAccount;
const contractAddress = "0xYOUR_CONTRACT_ADDRESS";
const mintPrice = "0.01";

document.getElementById("connectWallet").onclick = async () => {
  if (typeof window.ethereum !== 'undefined') {
    try {
      const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
      userAccount = accounts[0];
      document.getElementById("statusMsg").textContent = "✅ Wallet connected: " + userAccount;
      document.getElementById("mintNFT").disabled = false;
    } catch (err) {
      document.getElementById("statusMsg").textContent = "❌ Wallet connection rejected.";
    }
  } else {
    alert("Please install MetaMask!");
  }
};

document.getElementById("mintNFT").onclick = async () => {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  const contractABI = [ // Replace with your real ABI
    "function mint() public payable"
  ];
  const contract = new ethers.Contract(contractAddress, contractABI, signer);

  try {
    const tx = await contract.mint({ value: ethers.utils.parseEther(mintPrice) });
    document.getElementById("statusMsg").textContent = "⏳ Minting... TX: " + tx.hash;
    await tx.wait();
    document.getElementById("statusMsg").textContent = "✅ NFT Minted! View on Etherscan.";
  } catch (err) {
    document.getElementById("statusMsg").textContent = "❌ Error: " + err.message;
  }
};
