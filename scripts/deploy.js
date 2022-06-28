// scripts/deploy.js
async function main () {
  // We get the contract to deploy
  const DogNFT = await ethers.getContractFactory('DogNFT');
  console.log('Deploying DogNFT...');
  const dogNFT = await DogNFT.deploy();
  await dogNFT.deployed();
  console.log('DogNFT deployed to:', dogNFT.address);
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });