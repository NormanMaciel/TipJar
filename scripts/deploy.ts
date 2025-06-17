import { ethers } from "hardhat";
import * as dotenv from "dotenv";
dotenv.config();

async function main() {
  const TipJar = await ethers.getContractFactory("TipJar");
  const tipJar = await TipJar.deploy();
  await tipJar.waitForDeployment();

  console.log(`✅ TipJar desplegado en: ${tipJar.target}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
