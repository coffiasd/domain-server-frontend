import Head from 'next/head'
import styles from '../styles/Home.module.css'
import 'bootstrap/dist/css/bootstrap.css';
import React from 'react';
import Web3 from 'web3';
import { LSPFactory } from '@lukso/lsp-factory.js';
import { ERC725 } from '@erc725/erc725.js';
import 'isomorphic-fetch';
import Metadata from '@erc725/erc725.js/schemas/LSP3UniversalProfileMetadata.json';
import KeyManager from '@erc725/erc725.js/schemas/LSP6KeyManager.json';
import 'mdb-react-ui-kit/dist/css/mdb.min.css'
import dynamic from 'next/dynamic'
import TopHeader from '../components/Header'
import recoverJSON from '../utils/Recover.json'

const DynamicVote = dynamic(() => import('../components/Vote'), {
  ssr: false,
})

const AddVote = dynamic(() => import('../components/Add'), {
  ssr: false,
})


export default function Home() {
  const [buttonValue, setbuttonValue] = React.useState("Connect Lukso Wallet")
  const [buttonClass, setbuttonClass] = React.useState("spinner-border spinner-border-sm visually-hidden")
  const [login, SetLogin] = React.useState(false);
  const [user, setUser] = React.useState({ name: "" });
  // const RPC_ENDPOINT = 'https://rpc.l16.lukso.network';
  const RPC_ENDPOINT = 'http://localhost:8545';
  const IPFS_GATEWAY = 'https://2eff.lukso.dev/ipfs/';

  //login address.
  const loginAddress = "0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266";

  //get provider.
  const web3provider = new Web3(
    new Web3.providers.HttpProvider(RPC_ENDPOINT),
  );
  var web3 = new Web3(web3provider);
  console.log(recoverJSON.abi, process.env.ReAddress);
  const connectedContract = new web3.eth.Contract(recoverJSON.abi, process.env.ReAddress);

  const getGuardians = async (event) => {
    return await connectedContract.methods.getGuardians().call();
  }

  const connectWallet = async (event) => {
    if (window.ethereum) {
      const web3 = new Web3(window.ethereum);
      const accounts = await web3.eth.requestAccounts();
      const UPAddress = accounts[0];

      const provider = new Web3.providers.HttpProvider(RPC_ENDPOINT);
      const config = { ipfsGateway: IPFS_GATEWAY };

      async function fetchProfile(address) {
        setbuttonValue("Loading...");
        setbuttonClass("spinner-border spinner-border-sm");
        try {
          const profile = new ERC725(Metadata, address, provider, config);
          return await profile.fetchData();
        } catch (error) {
          return console.log('This is not an ERC725 Contract');
        }
      }

      async function fetchKeyManager(address) {
        try {
          const profile = new ERC725(KeyManager, address, provider, config);
          return await profile.fetchData();
        } catch (error) {
          return console.log('This is not an ERC725 Contract');
        }
      }

      fetchProfile(UPAddress).then(
        function (profileData) {
          user.name = profileData[1].value.LSP3Profile.name;
          setUser(user);
          SetLogin(true);
        }
      );

      fetchKeyManager(UPAddress).then(
        function (managereData) {
          console.log(managereData);
          var list = [];
          managereData.forEach(element => {
            list.push(element.key);
          });
          // setguardians(list);
        }
      );

    } else {
      alert("Please install MetaMask");
    }
  };

  //add a new guardian.
  const newGuardian = async (event, address) => {
    //verify if the address is valid
    if (!web3.utils.isAddress(address)) {
      alert("Invalid address");
      return
    }

    connectedContract.methods.addGuardian(address).send({ from: loginAddress }).then(function (r) {
      alert("Guardian added");
    }).catch(function (error) {
      alert(error.toString());
    });
  }

  //remove a guardian.
  const removeGuardian = async (event, address) => {
    connectedContract.methods.removeGuardian(address).send({ from: loginAddress }).then(function (r) {
      alert("Guardian removed");
    }).catch(function (error) {
      alert(error.toString());
    });
  }

  //vote ro recover.
  const voteToRecover = async (event, RecoverProcessId, NewAddress) => {
    if (RecoverProcessId == "") {
      alert("Please select a recover process");
      return
    }

    //verify if the address is valid
    if (!web3.utils.isAddress(NewAddress)) {
      alert("Invalid address");
      return
    }

    //we need to convert string value to byte32 value.
    connectedContract.methods.voteToRecover(web3.utils.asciiToHex(RecoverProcessId), NewAddress).send({ from: loginAddress }).then(function (r) {
      alert("Vote added");
    }).catch(function (error) {
      alert(error.toString());
    });
  }

  //get the list of recover processes.
  const getRecoverProcessesIds = async (event) => {
    return await connectedContract.methods.getRecoverProcessesIds().call({ from: loginAddress })
  }

  // recoverOwnership.
  // @param recoverProcessId byte32
  // @param plainSecret string
  // @param newHash byte32
  const recoverOwnership = async (event, recoverProcessId, plainSecret, newHash) => {
    connectedContract.methods.recoverOwnership(recoverProcessId, "", web3.utils.asciiToHex(newHash)).send({ from: loginAddress }).then(function (r) {
      alert("Recovered Ownership");
    }).catch(function (error) {
      alert(error.toString());
    });
  }


  return (
    <div className={styles.container}>

      <TopHeader />

      <Head>
        <title>Lukso Demo Page</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>

        <section className="vh-40 container d-flex justify-content-center">
          <DynamicVote VoteToRecover={voteToRecover} voteList={getRecoverProcessesIds} />
        </section>

        <section className="vh-50">
          <AddVote newGuardian={newGuardian} guardianList={getGuardians} removeGuardian={removeGuardian} />
        </section>

      </main >

      <footer className={styles.footer}>
        Powered By Ayden lee
      </footer>
    </div >
  )
}