<script>
  document.getElementById('connectWallet').onclick = async () => {
    if (typeof window.ethereum !== 'undefined') {
      try {
        const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
        alert("Connected wallet: " + accounts[0]);
      } catch (error) {
        alert("Connection rejected.");
      }
    } else {
      alert("MetaMask is not installed.");
    }
  }
</script>
