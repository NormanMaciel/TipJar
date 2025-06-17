import { ethers } from "hardhat";

async function main() {
  const TipJar = await ethers.getContractFactory("TipJar");
  const tipJar = await TipJar.deploy();

  await tipJar.waitForDeployment();

  const address = await tipJar.getAddress();
  console.log("Contrato TipJar desplegado en:", address);

  // Esto es útil para luego verificar
  console.log(`Para verificar: npx hardhat verify --network sepolia ${address}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
