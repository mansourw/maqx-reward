import { setWeeklyWinners } from "../scripts/setWeeklyWinners";

async function run() {
  await setWeeklyWinners();
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});