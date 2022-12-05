// Next JS offering features like server side rendering and the ability to create backends directly inside the same app or create pages much more easily

;/======== Project Objectives/
//We are going to create a NFT gallery
// i. We are going to fetch the amount of NFTs a wallet address holds
// ii. We also need a way to collect all the NFTs in a given collection
;/++++ Setting up the project in VS code/
// RUN COMM: npx create-next-app -e with-tailwindcss nameoftheproject
// Navigate to your project and launch VSCode:

// RUN COMM: cd nameoftheproject && code .
// then RUN COMM: yarn run dev

// we are going to create a variable called Wallet through the reactJS hook "useState"
;/1. Setting up the variables to fetch the data/
// const [wallet, setWalletAddress] = useState("");  //This will populate the first element with the variable value and then the second with the function
//to set and update it  ; we are initializing it with a string
//so the way we will set up the code in the input field below where we are getting the wallet address from the user; is that the wallet address will
//be saved in our "wallet" variable everytime we connect a wallet here
// we will use "event handler" that is on-change //    <input onChange={(e)=>{setWalletAddress(e.target.value)}} value={wallet} type={"text"} placeholder="Add your wallet address"></input>

// in the above syntax we are setting up an event handler so that whenever the input change and a different wallet gets connected, we are going to trigger an event that will
// change the value in the "wallet" variable by calling the "setWalletAddress" function  and update it with the new wallet address
;/--/ // at this point we also want that when the variable is updated, we would want to update the input field with the saved wallet address as well so we want it to be more
// like a loop
;/--install react extension called "react developer tools"/ // this will install an extra tab in the "inspect" section of your browser menu

// this way we can update the wallet address in the variable and be able to see it saving in "useState" components through "inspect " menu
;/=== NOTE/ // so we are creating an anonymous function inside onChange event handler because we want to wait for the change to occur first before we want to run the function;
//in this way only we will have access to this event handler to run "e.target.value" and the other reason is the without anonymous function, the thing wont work at all
;/2. Setting up the fetch Functions/
//using endpoint to modify the baseURL,
//endpoint is provided by Alchemy, named as "getNFTsForCollection" which takes 3 params;  1. contract address, 2. withMetadata, 3. startToken
//
// 2. withMetadata is boolean type if set true will return the metadata associated with the NFT while if false it will return the tokenIds, its set to false by default, so in the false
//declaration you are gonna have to fetch the metadata by using a different endpoint which is not ideal so we are gonna want this param to be true
// 3. we didnt use startToken param as we were not going to use pagination  and this should be the part of the challenge
;/Tell the button when we click what do we want with it to either fetch for the collection or NFTs owned by a single wallet/
;/building Nft Cards/
// react has props which is nothing more than a variable we can pass through the parting component
// type can be considered as a prop and we are telling the component that we want checkbox type input, in this case we want text type input and the componnet will take care of the right
// input of assigning input to the prop that we passed
//  as a prop here, we want an NFT because we want to get the data of that nft and display those in the component */}
{
    /* How do we do that;  we have two ways; we write props and give a random name of the variable and we access all of our variables like
            variable.<etc>  or we can use a thing called object deconstruction pass nft object here directly and later on access the elements inside
this nft object right away without going to the props.something etc*/
} // at the point where we just used nft.title we are printing an NFT card for every NFT but just in the form of title

;/===================== NFT CARD elements =============  /
//
//
//
;/image rendering/ // <img src{nft.media[0].gateway}   this syntax we wrote to fetch the image, and we are supposed to be passing the URL in this syntax when we used "src"
//but we are passing nft.media which we are getting from the nft element in the NFT array, we can see in the components tab(inpect) that every nft has this "media"
// where it contains 2 elements 1. raw 2. gateway,   so we are passing the gateway in the src to fetch the image of the nft
// raw is usually the IPFS link which we shouldnt use because we cant always get the image out of that link
;/tokenId/ // <p>{nft.id.tokenId.substr(nft.id.tokenId.length - 4)}</p>         // here we are displaying the nft tokeniD but with using a function so that the tokenId not be that
// huge string but only the last 4 digits of that string
;/contractAddress/ //{`${nft.contract.address.substr(0, 4)}...${nft.contract.address.substr(nft.contract.address.length - 4)}`}
//copied that syntax from their github code directly
;/description/ //{nft.description?.substr(0, 150)}  so what we did here is that we are saying to the code if there is a description, print 0-150 characters of it otherwise dont
;/view on etherscan Button/ // here we used an "<a>" tag inside of it we used target=blank becasue we wanted to open the veiw on etherscan on a new tab otherwise it will open the
//etherscan in the same tab and if we want to back to the original place we cant we would have to redo the whole pasting contract address of the collection thingy again //
//
//
//
//
;/= = = = = =  Tailwind CSS  or Styling/
//
//className represents classes the classes that your Html element has associated with it
// mostly I copied and pasted the code here
// margin is added by className="mr-2"
// for the image width we have styled in the NFTCard.jsx and used className= "w-1/4" using 1/4th of the width plus the gap and the margin
// flex column means placing them 1 under the other not one next to each other
// object cover is used sometimes images are not perfect square so we force them to be square without stretching it and the aspect ratio shouldnt be disturbed, more details on
//tailwind object covers documentation
// using cursor pointer on buttons can be helpful, href also by default creates that curson pointer
// flex wrap takes care of displaying three nfts per line for some reason I didnt understand
