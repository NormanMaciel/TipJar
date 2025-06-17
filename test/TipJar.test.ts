import { expect } from "chai";
import { ethers } from "hardhat";

describe("TipJar", function () {
  it("debe emitir un evento y registrar una propina", async function () {
    const [owner, user] = await ethers.getSigners();
    const TipJar = await ethers.getContractFactory("TipJar");
    const tipJar = await TipJar.deploy();

    const message = "Gran trabajo";
    const amount = ethers.parseEther("0.01");

    const tx = await tipJar.connect(user).tip(message, { value: amount });
    await expect(tx).to.emit(tipJar, "NewTip").withArgs(user.address, amount, message);

    const count = await tipJar.getTipsCount();
    expect(count).to.equal(1);

    const tip = await tipJar.getTip(0);
    expect(tip.from).to.equal(user.address);
    expect(tip.amount).to.equal(amount);
    expect(tip.message).to.equal(message);
    expect(tip.timestamp).to.be.gt(0);
  });

  it("solo el owner puede retirar", async function () {
    const [owner, user] = await ethers.getSigners();
    const TipJar = await ethers.getContractFactory("TipJar");
    const tipJar = await TipJar.deploy();

    await expect(tipJar.connect(user).withdraw()).to.be.revertedWith("Solo el owner puede retirar");

    // Enviar propina y retirar como owner
    await tipJar.connect(user).tip("Gracias", { value: ethers.parseEther("0.02") });

    const initialBalance = await ethers.provider.getBalance(owner.address);
    const tx = await tipJar.connect(owner).withdraw();
    const receipt = await tx.wait();
    const gasUsed = receipt.gasUsed * receipt.gasPrice;

    const finalBalance = await ethers.provider.getBalance(owner.address);
    expect(finalBalance).to.be.gt(initialBalance - gasUsed);
  });

  it("debe rechazar propinas sin ETH", async function () {
    const [user] = await ethers.getSigners();
    const TipJar = await ethers.getContractFactory("TipJar");
    const tipJar = await TipJar.deploy();

    await expect(tipJar.connect(user).tip("Sin valor")).to.be.revertedWith("Debe enviar ETH");
  });

  it("debe fallar al pedir tip inexistente", async function () {
    const TipJar = await ethers.getContractFactory("TipJar");
    const tipJar = await TipJar.deploy();

    await expect(tipJar.getTip(0)).to.be.revertedWith("Indice invalido");
  });
});