import { ethers } from "ethers";
import * as dotenv from "dotenv";
import TipJarAbi from "../artifacts/contracts/TipJar.sol/TipJar.json";

dotenv.config();

const CONTRACT_ADDRESS = ""; // Reemplazalo si hace falta

async function main() {
  const provider = new ethers.JsonRpcProvider(process.env.SEPOLIA_RPC_URL);
  const wallet = new ethers.Wallet(`0x${process.env.PRIVATE_KEY}`, provider);
  const TipJar = new ethers.Contract(CONTRACT_ADDRESS, TipJarAbi.abi, wallet);

  // Enviar propina
  const tipAmount = "0.01";
  const message = "¡Gracias por tu trabajo!";
  const tx = await TipJar.tip(message, {
    value: ethers.parseEther(tipAmount),
  });
  await tx.wait();
  console.log(`✅ Propina de ${tipAmount} ETH enviada.`);

  // Mostrar balance
  const balance = await provider.getBalance(CONTRACT_ADDRESS);
  console.log(`💰 Balance actual del contrato: ${ethers.formatEther(balance)} ETH`);

  // Ejecutar withdraw (si sos el owner)
  try {
    const withdrawTx = await TipJar.withdraw();
    await withdrawTx.wait();
    console.log("✅ Fondos retirados por el owner.");
  } catch (error: any) {
    console.log("⚠️ No sos el owner o falló el retiro:", error.message);
  }
}

main().catch((error) => {
  console.error("❌ Error en la ejecución:", error);
  process.exitCode = 1;
});
