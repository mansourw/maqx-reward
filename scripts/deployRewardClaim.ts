import hre from "hardhat";
import * as dotenv from "dotenv";
dotenv.config();

async function main() {
  const rewardToken = process.env.REWARD_TOKEN_ADDRESS!;
  const rewardAmount = hre.ethers.utils.parseEther("36");

  const RewardClaim = await hre.ethers.getContractFactory("RewardClaim");
  const contract = await RewardClaim.deploy(rewardToken, rewardAmount);
  await contract.deployed();

  console.log("✅ RewardClaim deployed at:", contract.address);
}

main().catch((err) => {
  console.error("❌ Deployment failed:", err);
  process.exit(1);
});