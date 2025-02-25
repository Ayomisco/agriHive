document.addEventListener("DOMContentLoaded", async function () {
        const connectButton = document.getElementById("cryptoConnect");
        const walletAddressElement = document.getElementById("walletAddress");
        const walletPopup = document.getElementById("walletPopup");

        function updateUI(walletAddress) {
            if (walletAddressElement) {
                walletAddressElement.textContent = `${walletAddress}`;
                walletAddressElement.style.display = "block";
            }
            if (connectButton) {
                connectButton.style.display = "none";
            }
        }

        // Check if a wallet is already stored in localStorage
        const storedWallet = localStorage.getItem("walletAddress");
        if (storedWallet) {
            updateUI(storedWallet);
        }

        async function connectWallet() {
            if (window.ethereum) {
                try {
                    const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
                    const walletAddress = accounts[0];

                    // Store wallet address in localStorage
                    localStorage.setItem("walletAddress", walletAddress);

                    updateUI(walletAddress);

                    if (walletPopup) {
                        walletPopup.style.display = "block";
                        setTimeout(() => {
                            walletPopup.style.display = "none";
                        }, 3000);
                    }
                } catch (error) {
                    console.error("Error connecting to wallet:", error);
                    alert("Wallet connection failed. Please try again.");
                }
            } else {
                alert("No Ethereum wallet detected! Please install MetaMask.");
            }
        }

        if (connectButton) {
            connectButton.addEventListener("click", connectWallet);
        }
    });