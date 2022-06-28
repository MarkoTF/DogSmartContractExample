const { expect } = require('chai');

describe("DogNFT", function() {
    before(async function() {
        this.testIpfsURI = 'ipfs://QmVerT74iTDCtujK7GUkiTSECBMrRkzPY2kon8y1A7jt3y';
        const [owner, addr1, addr2] = await ethers.getSigners();
        this.owner = owner;
        this.addr1 = addr1;
        this.addr2 = addr2;
        this.DogNFT = await ethers.getContractFactory('DogNFT');
    });

    beforeEach(async function() {
        this.dogNFT = await this.DogNFT.deploy();
        await this.dogNFT.deployed();
    });

    it("Should create a new NFT", async function() {
        expect(await this.dogNFT.awardToken(this.addr1.address, this.testIpfsURI))
            .to.emit(this.dogNFT, "Transfer")
            .withArgs(this.owner.address, this.addr1.address, 0);

        expect(await this.dogNFT.balanceOf(this.addr1.address)).to.equal(1);
    });

    it("Should NOT create a new NFT if the owner is not the contract owner", async function() {
        expect(this.dogNFT.connect(this.addr1.address).awardToken(this.addr2.address, this.testIpfsURI))
            .to.be.revertedWith("revert");

        expect(await this.dogNFT.balanceOf(this.addr2.address)).to.equal(0);
    });

    it("Should NOT transfer a NFT if the sender is not the owner", async function() {
        await this.dogNFT.awardToken(this.addr1.address, this.testIpfsURI);

        expect(this.dogNFT.connect(this.addr2.address).transferFrom(this.addr1.address, this.addr2.address, 0))
            .to.be.revertedWith("revert");

        expect(this.dogNFT.connect(this.owner.address).transferFrom(this.addr1.address, this.addr2.address, 0))
            .to.be.revertedWith("revert");

        expect(await this.dogNFT.balanceOf(this.addr1.address)).to.equal(1);
        expect(await this.dogNFT.balanceOf(this.addr2.address)).to.equal(0);
    });
});