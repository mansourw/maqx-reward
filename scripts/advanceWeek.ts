/****
 * This script connects to the deployed RewardClaim contract and calls `advanceWeek()`.
 *  * - Waits for the transaction to confirm.
 * - Logs confirmation to the terminal.
 *
 * Requirements:
 * - The address below must match the deployed RewardClaim contract.
 * - `advanceWeek()` must be a public function with no arguments.
 * - You must have a valid signer and network configuration (e.g. in `.env` and `hardhat.config.ts`).

 *
 * To run:
 * npx hardhat run scripts/advanceWeek.ts --network sepolia
 */
import { ethers } from "hardhat";

async function main() {
  const rewardClaimAddress = "0x8055Ff3D582Ed5f923aEF1e910Dd48fD0f3568D1"; // 🔁 Replace after deploy
  const rewardClaim = await ethers.getContractAt("RewardClaim", rewardClaimAddress);

  const tx = await rewardClaim.advanceWeek();
  await tx.wait();

  console.log("Week advanced to next cycle.");
}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});