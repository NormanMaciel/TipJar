import { ethers } from "hardhat";
import * as dotenv from "dotenv";
dotenv.config();

const CONTRACT_ADDRESS = "0xTU_CONTRATO_EN_SEPOLIA"; // reemplazalo

async function main() {
  const [signer] = await ethers.getSigners();
  const TipJar = await ethers.getContractAt("TipJar", CONTRACT_ADDRESS, signer);

  // Enviar propina
  const tipAmount = "0.01";
  const message = "¡Gracias por tu trabajo!";
  const tx = await TipJar.tip(message, {
    value: ethers.parseEther(tipAmount),
  });
  await tx.wait();
  console.log(`✅ Propina de ${tipAmount} ETH enviada.`);

  // Mostrar balance
  const balance = await ethers.provider.getBalance(CONTRACT_ADDRESS);
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
