import { ethers } from "ethers";
import * as dotenv from "dotenv";
import TipJarAbi from "../artifacts/contracts/TipJar.sol/TipJar.json";

dotenv.config();
//Interaccion con Argumentos
// Asegurate de tener tu .env configurado con SEPOLIA_RPC_URL y PRIVATE_KEY
// Puedes ejecutar este script con:
// npx ts-node scripts/interactConArg.ts nombre_funcion [argumentos]

const CONTRACT_ADDRESS = ""; // reemplazá con la tuya

async function listTips(contract: ethers.Contract) {
  const count = await contract.getTipsCount();
  console.log(`Total propinas: ${count}`);

  for (let i = 0; i < count; i++) {
    const tip = await contract.getTip(i);
    console.log(`\nTip #${i + 1}:`);
    console.log(`  De: ${tip.from}`);
    console.log(`  Monto: ${ethers.formatEther(tip.amount)} ETH`);
    console.log(`  Mensaje: ${tip.message}`);
    console.log(`  Fecha: ${new Date(Number(tip.timestamp) * 1000).toLocaleString()}`);

  }
}

async function main() {
  const provider = new ethers.JsonRpcProvider(process.env.SEPOLIA_RPC_URL);
  const wallet = new ethers.Wallet(`0x${process.env.PRIVATE_KEY}`, provider);
  const contract = new ethers.Contract(CONTRACT_ADDRESS, TipJarAbi.abi, wallet);

  const action = process.argv[2];

  if (action === "tip") {
    const message = process.argv[3] || "Gracias!";
    const amount = process.argv[4] || "0.01";
    const tx = await contract.tip(message, {
      value: ethers.parseEther(amount),
    });
    await tx.wait();
    console.log(`✅ Tip enviada: ${amount} ETH con mensaje: "${message}"`);
  } else if (action === "balance") {
    const balance = await provider.getBalance(CONTRACT_ADDRESS);
    console.log(`💰 Balance del contrato: ${ethers.formatEther(balance)} ETH`);
  } else if (action === "withdraw") {
    try {
      const tx = await contract.withdraw();
      await tx.wait();
      console.log("✅ Fondos retirados por el owner");
    } catch (error: any) {
      console.log("⚠️ No sos el owner o falló el retiro:", error.message);
    }
  } else if (action === "listTips") {
    await listTips(contract);
  } else {
    console.log("Usa uno de estos comandos:");
    console.log("  tip <mensaje> <monto>  -> Enviar propina");
    console.log("  balance                -> Mostrar balance del contrato");
    console.log("  withdraw               -> Retirar fondos (owner)");
    console.log("  listTips               -> Mostrar todas las propinas recibidas");
  }
}

main().catch((error) => {
  console.error("❌ Error:", error);
  process.exit(1);
});
