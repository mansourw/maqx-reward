/**
 * Script to export the setWeeklyWinners function for CRON automation.
 *
 * Steps:
 * 1. Loads environment variables using dotenv.
 * 2. Retrieves the deployer's signer (caller).
 * 3. Reads the deployed RewardClaim contract address from the .env file.
 * 4. Connects to the deployed contract using the signer.
 * 5. Calls the setWeeklyWinners() method on the contract.
 * 6. Waits for the transaction to confirm.
 * 7. Logs the success to the terminal.
 */

import hre from "hardhat";
const { ethers } = hre;
import * as dotenv from "dotenv";
dotenv.config();

export async function setWeeklyWinners() {
  const [signer] = await ethers.getSigners();

  const rewardClaimAddress = process.env.REWARD_CLAIM_ADDRESS!;
  if (!rewardClaimAddress) {
    throw new Error("Please set REWARD_CLAIM_ADDRESS in your .env file");
  }

  const RewardClaim = await ethers.getContractFactory("RewardClaim");
  const reward = RewardClaim.attach(rewardClaimAddress).connect(signer);

  console.log("Calling setWeeklyWinners...");
  const tx = await reward.setWeeklyWinners();
  await tx.wait();
  console.log("✅ setWeeklyWinners() executed successfully.");
}