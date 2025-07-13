

import { ethers } from "hardhat";
import * as dotenv from "dotenv";

dotenv.config();

/**
 * Connects to the deployed RewardClaim contract using the address from the environment.
 * Calls the `claimReward()` function to claim the caller's weekly reward.
 * Waits for the transaction to be mined and logs confirmation.
 */
async function main() {
  const rewardClaimAddress = process.env.REWARD_CLAIM_ADDRESS;

  if (!rewardClaimAddress) {
    throw new Error("REWARD_CLAIM_ADDRESS is not set in the environment variables");
  }

  const rewardClaim = await ethers.getContractAt("RewardClaim", rewardClaimAddress);

  const tx = await rewardClaim.claimReward();
  console.log("Transaction submitted:", tx.hash);

  // Waits for the transaction to confirm.
  const receipt = await tx.wait();

  // Logs confirmation to the terminal.
  console.log("Reward claimed successfully in block", receipt.blockNumber);
}

main().catch((error) => {
  console.error("❌ Claim failed:", error);
  process.exitCode = 1;
});