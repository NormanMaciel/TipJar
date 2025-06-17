import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import TipJarAbi from "./abi/TipJar.json";
import "./App.css";

const CONTRACT_ADDRESS = "0x0A2e7B057e8f46f1bA29BcAb902CcE3061c429dD";

interface Tip {
  from: string;
  amount: bigint;
  message: string;
  timestamp: bigint;
}

function App() {
  const [provider, setProvider] = useState<ethers.BrowserProvider | null>(null);
  const [contract, setContract] = useState<ethers.Contract | null>(null);
  const [message, setMessage] = useState("");
  const [tips, setTips] = useState<Tip[]>([]);
  const [balance, setBalance] = useState("0");

  useEffect(() => {
    if ((window as any).ethereum) {
      const ethProvider = new ethers.BrowserProvider((window as any).ethereum);
      setProvider(ethProvider);
      ethProvider.send("eth_requestAccounts", []).then(async () => {
        const signer = await ethProvider.getSigner();
        const tipJarContract = new ethers.Contract(CONTRACT_ADDRESS, TipJarAbi, signer);
        setContract(tipJarContract);
      });
    } else {
      alert("Por favor instala Metamask");
    }
  }, []);

  async function loadTips() {
    if (!contract) return;
    const count = await contract.getTipsCount();
    const tipsArray: Tip[] = [];
    for (let i = 0; i < count; i++) {
      const tip = await contract.getTip(i);
      tipsArray.push(tip);
    }
    setTips(tipsArray);
  }

  async function sendTip() {
    if (!contract || !message) return;
    const tx = await contract.tip(message, { value: ethers.parseEther("0.01") });
    await tx.wait();
    setMessage("");
    loadTips();
    loadBalance();
  }

  async function loadBalance() {
    if (!provider) return;
    const bal = await provider.getBalance(CONTRACT_ADDRESS);
    setBalance(ethers.formatEther(bal));
  }

  useEffect(() => {
    if (contract) {
      loadTips();
      loadBalance();
    }
  }, [contract]);

  return (
    <div>
      <h1>TipJar</h1>
      <p>Balance del contrato: {balance} ETH</p>
      <input
        type="text"
        placeholder="Mensaje para la propina"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button onClick={sendTip}>Enviar Propina (0.01 ETH)</button>

      <h2>Propinas recibidas:</h2>
      <ul>
        {tips.map((tip, idx) => (
          <li key={idx}>
            De: {tip.from} - Mensaje: {tip.message} - Monto: {ethers.formatEther(tip.amount)} ETH
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;