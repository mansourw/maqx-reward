// SPDX-License-Identifier: MIT
pragma solidity ^0.8.22;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract RewardClaim is Ownable(msg.sender) {
    IERC20 public rewardToken;

    uint256 public rewardPerWinner;

    uint256 public currentWeek;
    mapping(uint256 => address[3]) public weeklyWinners;
    mapping(address => mapping(uint256 => bool)) public hasClaimed;

    constructor(address _rewardToken, uint256 _rewardPerWinner) {
        rewardToken = IERC20(_rewardToken);
        rewardPerWinner = _rewardPerWinner; // e.g. 36 MAQX weekly
        currentWeek = 1;
    }

    function setWeeklyWinners(address[3] calldata winners) external onlyOwner {
        weeklyWinners[currentWeek] = winners;
    }

    function advanceWeek() external onlyOwner {
        currentWeek += 1;
    }

    function claim(uint256 week) external {
        require(!hasClaimed[msg.sender][week], "Already claimed");

        address[3] memory winners = weeklyWinners[week];
        bool eligible = false;

        for (uint8 i = 0; i < 3; i++) {
            if (msg.sender == winners[i]) {
                eligible = true;
                break;
            }
        }

        require(eligible, "Not eligible");
        hasClaimed[msg.sender][week] = true;

        uint256 share = rewardPerWinner / 3;
        require(rewardToken.transfer(msg.sender, share), "Transfer failed");
    }

    function updateRewardAmount(uint256 newAmount) external onlyOwner {
        rewardPerWinner = newAmount;
    }

    function withdrawUnclaimed(address to, uint256 amount) external onlyOwner {
        require(rewardToken.transfer(to, amount), "Withdraw failed");
    }
}