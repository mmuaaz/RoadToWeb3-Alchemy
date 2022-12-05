import Head from "next/head"
import Image from "next/image"
//import dotenv from "dotenv"
import { useState } from "react"
import NFTCard from "./components/nftCard"
const Home = () => {
    const [wallet, setWalletAddress] = useState("") //This will populate the first element with the variable value and then the second with the function
    //to set and update it  ; we are initializing it with a string

    // Refer to guide section for details of the code
    const [collection, setCollectionAddress] = useState("")
    const [NFTs, setNFTs] = useState([]) // as this will not be a string so we are creating this as an array
    const [fetchForCollection, setFetchForCollection] = useState(false) // we want it to be a bool and by default it should be set to false

    const fetchNFTs = async () => {
        // here we want to fetch the NFTs yes but
        //check to see which address holds which NFTs
        //also make sure to filter the NFTs by collection
        let nfts
        const api_key = "G_r9QOparUXvhEmzJXJysD3rlqTiXFUb"
        const baseURL = `https://eth-mainnet.g.alchemy.com/v2/${api_key}/getNFTs/`
        const fetchURL = `${baseURL}?owner=${wallet}`
        console.log("Fetching NFTs ")
        // "!collection.length" we want to filter and fetch NFTs with owner address and not the collection address
        //i think it means that we want to filter the NFTs owned by that address in that specific collection
        if (!collection.length) {
            var requestOptions = {
                method: "GET",
            }

            nfts = await fetch(fetchURL, requestOptions).then((data) => data.json()) // here we are getting the string version of the data and we are
            //exporting it to data.json through the json function and transforming json stringify data into actual json
        } else {
            console.log("Fetching Nfts from the given Collection")
            const fetchURL = `${baseURL}?owner=${wallet}&contractAddresses%5B%5D=${collection}` //%5B%5D means these items are gonna be an array so we can pass an
            // address of array, in this case we are passing 1 address because we dont want to fetch NFTs from multiple addresses
            // so in this fetchURL we are fetching all the NFTs by passing a collectionAddress and owner Address so we are fetching NFTs of the owner
            //in a particular collection
            nfts = await fetch(fetchURL, requestOptions).then((data) => data.json())
        }
        if (nfts) {
            console.log("nfts", nfts)
            setNFTs(nfts.ownedNfts) //ownedNfts is the object that we saw on the "inspect" on our browser for the log thingy
        }
    }
    // Create a function to fetch NFTs
    const fetchNFTsForCollection = async () => {
        //checking if the collection is there
        if (collection.length) {
            var requestOptions = {
                method: "GET",
            }
            const api_key = "G_r9QOparUXvhEmzJXJysD3rlqTiXFUb"
            //modify baseURL for new endpoint
            //endpoint used here is "getNFTsForCollection" parametres are described in guide
            const baseURL = `https://eth-mainnet.g.alchemy.com/v2/${api_key}/getNFTsForCollection/`
            const fetchURL = `${baseURL}?contractAddress=${collection}&withMetadata=${"true"}` // copied the previous fetch URL line
            // replace "owner" with "contractAddress" which is the first param and replaced "%5B%5D" with "withMetadata" and the later was fixed for the syntax logic
            // also replaced "wallet" with "collection" as we are not using the wallet but the collection
            const nfts = await fetch(fetchURL, requestOptions).then((data) => data.json())

            if (nfts) {
                console.log("NFTs in collection:", nfts)
                setNFTs(nfts.nfts) // nfts.nfts is because we get two objects from fetching the data withMetadata being true, so we want to pass the nft object only
            }
        }
    }
    return (
        <div className="flex flex-col items-center justify-center py-8 gap-y-3">
            <div className="flex flex-col w-full justify-center items-center gap-y-2">
                <input
                    disabled={fetchForCollection}
                    className="w-2/5 bg-slate-100 py-2 px-2 rounded-lg text-gray-800 focus:outline-blue-300 disabled:bg-slate-50 disabled:text-gray-50"
                    onChange={(e) => {
                        setWalletAddress(e.target.value)
                    }}
                    value={wallet}
                    type={"text"}
                    placeholder="Add your wallet address"
                ></input>
                <input
                    className="w-2/5 bg-slate-100 py-2 px-2 rounded-lg text-gray-800 focus:outline-blue-300 disabled:bg-slate-50 disabled:text-gray-50"
                    onChange={(e) => {
                        setCollectionAddress(e.target.value)
                    }}
                    value={collection}
                    type={"text"}
                    placeholder="Add the collection address"
                ></input>
                <label className="text-gray-600 ">
                    <input
                        onChange={(e) => {
                            setFetchForCollection(e.target.checked)
                        }}
                        type={"checkbox"}
                        className="mr-2"
                    ></input>
                    Fetch for collection
                </label>
                <button
                    className={
                        "disabled:bg-slate-500 text-white bg-blue-400 px-4 py-2 mt-3 rounded-sm w-1/5"
                    }
                    onClick={() => {
                        if (fetchForCollection) {
                            fetchNFTsForCollection()
                        } else fetchNFTs()
                    }}
                >
                    Let's go!{" "}
                </button>
            </div>
            <div className="flex flex-wrap gap-y-12 mt-4 w-5/6 gap-x-2 justify-center">
                {
                    // inside this tag we want to render a bunch of NFT Cards
                    //if nfts.length is more than zero, then we want to render an NFT card on every nft we fetched
                    //arrays in JS have this function called map >>> map will run and perform an operation to for every element of that array

                    NFTs.length &&
                        NFTs.map((nft) => {
                            // so every element of that array will be called nft
                            // for every nft in the NFT array, run NFTCard with nft as a prop: which nft well the nft we are getting inside the map
                            return <NFTCard nft={nft}></NFTCard>
                        })
                }
            </div>
        </div>
    )
}

export default Home
