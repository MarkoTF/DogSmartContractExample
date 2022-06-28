require('dotenv').config();

async function main () {
  // Metadata URIs
  const [owner] = await ethers.getSigners();
  const mtdCIDs = [
    "QmQEQkt5BC5dwkHdSHHCh4hKbEb7diQ4EokAUe4FNGVWqD",
    "QmSgzjupuYiBtLmnTLBbDJ4X2QDiyP7oZXdx3vogCyufms",
    "QmSCFCdGUqpdwNshR4rSRhpfzVKgY3V4WmYx76TugbbXy3",
    "QmSkopSfMRzYgNctjdE9XfNgbNEFuChx1k3PCZpraJPJVL",
    "QmXFj33hNyhwsAgLK8jMT68c6RAJivHWFmSNKorAuJHTAp",
    "QmeuSAftWQTsvbdHe3hJkZ9DWSHHB18CFsuJTjeZaQjyvo",
    "QmefmRUemFBwvTMTM8rPZLfdbDkCvs16noy7eMapvmWNwS",
    "QmTJKVF9JKkjmFiZicCW2DQk7KDSYf9t8S3YiiRXPFQox2",
    "QmVerT74iTDCtujK7GUkiTSECBMrRkzPY2kon8y1A7jt3y",
  ];

  const DogNFT = await ethers.getContractFactory('DogNFT');
  const dogNFT = await DogNFT.attach(process.env.DOG_NFT_ADDRESS);

  for (cid of mtdCIDs) {
    console.log(`Awarding token with CID: ${cid}`);
    await dogNFT.awardToken(owner.address, `ipfs://${cid}`);
  }
  console.log("Done");
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });