import { ethers } from "ethers";
import TipJarAbi from "../abi/TipJar.json";

const CONTRACT_ADDRESS = " "; // Reemplazalo por la dirección de tu contrato desplegado

export function getTipJarContract(providerOrSigner: ethers.Provider | ethers.Signer) {
  return new ethers.Contract(CONTRACT_ADDRESS, TipJarAbi, providerOrSigner);
}
