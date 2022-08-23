import { useEffect, useState } from "react";
import { Table } from 'antd';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { Container, Row, Col, Nav, Tab, Pagination, Form, Button   } from "react-bootstrap";
import setting from "../../assets/setting.svg";
import apusdt from "../../assets/apusdt.webp";
import {  ConfirmOptions, PublicKey, SystemProgram} from '@solana/web3.js';
import {BN,AnchorProvider,Program, web3} from '@project-serum/anchor';
// import * as PoolAbi from "../../assets/abi/staking_contract.json";
import { StakingContract, IDL } from "../../assets/abi/staking_contract";
import Moment from 'moment';
import {
    WalletConnectButton,
    WalletModalProvider,
} from '@solana/wallet-adapter-react-ui';
import { Token as spl,AccountLayout, ASSOCIATED_TOKEN_PROGRAM_ID, TOKEN_PROGRAM_ID } from "@solana/spl-token";
// import {
//     AnchorProvider,
//     BorshAccountsCoder,
//     ,
//     utils,
//   } from "@project-serum/anchor";

interface PDAParameters {
    stake_pool: PublicKey;
    pool_action: PublicKey;
  }

interface EntriesPDA {
    entries_pda: [PublicKey];
}
  
interface EntriesData {
    staker:any;
    amount:any;
    action:any;
    time:any;
}

  
const opts: ConfirmOptions = {
    preflightCommitment: "processed"
}

const TransactionDetail = () => {

    const wallet = useWallet();
    const [loading, setLoading] = useState(false);
    const [balance, setBalance] = useState(0);
    const [history, setHistory] = useState([]);
    const [message, setMessage] = useState({
        error:true,
        msg:''
    });
    const [stackAmount, setStackAmount] = useState<number>(0);
    const { connection } = useConnection();
    let pda: PDAParameters;
    // const USDCPublicKey = new PublicKey("4zMMC9srt5Ri5X14GAgXhaHii3GnPAEERYPJgZJDncDU");
    const USDCPublicKey = new PublicKey("EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v");
    // const stakePoolId = new PublicKey("8o5JLJerP32i49uV2zzrytC7GcPkfrqmguB46BEWYM6V");
    /* @ts-ignore */
    const provider = new AnchorProvider(connection, wallet, opts.preflightCommitment);
    const program = new Program<StakingContract>(
        IDL,
        new PublicKey("A4t9qvefVmN7eJTM7vbtqKKrJrtSGxabXajMFQQieKH9"),
        provider
    );
    
    useEffect(() => {
        if(provider.wallet.publicKey){
            readAccount();
            getHistory();
        }
    },[provider.wallet.publicKey])

    // TABLE LIST
    const columns:any = [
        { title: 'ID', width: 50, dataIndex: 'index', key: 'index' },
        { title: 'Amount', dataIndex: 'amount', key: 'amount', },
        { title: 'Fund', dataIndex: 'fund', key: 'fund', },
        { title: 'Action', dataIndex: 'action', key: 'action', },
        { title: 'Date', dataIndex: 'date', key: 'date', }
    ];

    const getHistory = async() =>{
        console.log(provider.wallet.publicKey)
        let tempHistory:any = [];
        let entires = await getPdaStakingEntries(provider.wallet.publicKey);
        for (let i = 0; i < entires.entries_pda.length; i++) {
         
            let string_pub_key = entires.entries_pda[i].toString();
            let pub_key = new web3.PublicKey(string_pub_key);
            let data_from_pda = await getEntryData(pub_key);
            tempHistory.push({
                index: (i+1),
                amount: (Number(data_from_pda.amount)/1000000).toString(),
                fund:"USDC",
                // user: data_from_pda.staker.toString(),
                action: (data_from_pda.action)?"Deposit":"Withdraw",
                date: (Number(data_from_pda.time) != 0)?(Moment(new Date(Number(data_from_pda.time)*1000).toUTCString())).format('LLL'):"OLD ENTRY"
            })  
            // console.log("Entry Count", i);
            // console.log("Data Action", data_from_pda.action);
            // console.log("Data Amount", data_from_pda.amount.toString());
            // console.log("Data User", data_from_pda.staker.toString());

            if(i == (entires.entries_pda.length-1)){
                tempHistory.sort(function (a:any, b:any) {
                    return a.index - b.index;
                });
                console.log("tempHistory")
                console.log(tempHistory)
                setHistory(tempHistory)
            }

          };
    }

     //get PDAs of Staking Entry
    const getPdaStakingEntries = async (
        signer: PublicKey
    ) => {
        let s_last_count = await getLastEntryCount(signer);
        let last_count = parseInt(s_last_count);

        let keys = [];

        while (last_count != 0) {
            let [pool_entry_account, pool_entry_account_bump] =
                await PublicKey.findProgramAddress(
                [
                    Buffer.from("pool_entry"),
                    signer.toBuffer(),
                    new BN(last_count).toArrayLike(Buffer),
                ],
                program.programId
                );

            keys.push(pool_entry_account);
            last_count -= 1;
        }

        return { entries_pda: keys };
    };

    //get last entry of the user
    const getLastEntryCount = async (
        signer: PublicKey
    ): Promise<string> => {
        let [pool_count, pool_count_bump] =
        await PublicKey.findProgramAddress(
            [Buffer.from("pool_count"), signer.toBuffer()],
            program.programId
        );

        try {
        let count = await program.account.count.fetch(pool_count);
        let last_count = count.count;

        return last_count.toString();
        } catch (ex) {
        return "0".toString();
        }
    };

    const getEntryCountPDA = async (
        signer: PublicKey
    ): Promise<PublicKey> => {
        let [pool_count, pool_count_bump] =
        await PublicKey.findProgramAddress(
            [Buffer.from("pool_count"), signer.toBuffer()],
            program.programId
        );

        return pool_count;
    };

    //Get PDA For storing the Entry
    const getLatestEntryPDA = async (
        signer: PublicKey
    ): Promise<PublicKey> => {
        let last_count = await getLastEntryCount(signer);
        let next_count = (parseInt(last_count) + 1).toString();
        let [last_entry_pda, pda_bump] =
        await PublicKey.findProgramAddress(
            [
            Buffer.from("pool_entry"),
            signer.toBuffer(),
            new BN(next_count).toArrayLike(Buffer),
            ],
            program.programId
        );

        return last_entry_pda;
    };

    //Get Entry Data
    const getEntryData = async (
        pdaKey: PublicKey
    ): Promise<EntriesData> => {
        let entry = await program.account.poolActionEntry.fetch(pdaKey);
        return {
            staker: entry.staker,
            amount: entry.tokenAmount,
            action: entry.stakeAction,
            time: entry.timeStamp,
        };
    };

      //get PDA of Stake Pool
    const getPdaParams = async (
        token_program: PublicKey,
        signer: PublicKey
    ): Promise<PDAParameters> => {
        let [stake_pool, stake_bump] =
        await PublicKey.findProgramAddress(
            [Buffer.from("stake_pool"), token_program.toBuffer()],
            program.programId
        );

        let [pool_action, pool_action_bump] =
        await PublicKey.findProgramAddress(
            [Buffer.from("pool_action"), signer.toBuffer()],
            program.programId
        );
        return {
        stake_pool: stake_pool,
        pool_action: pool_action,
        };
    };

    const readAccount = async() => {
        // if(!pda){
        pda = await getPdaParams(USDCPublicKey, provider.wallet.publicKey);
        // }
        let deposited_amount = await program.account.poolAction.fetch(pda.pool_action);
        const balance = Number(deposited_amount.tokenAmount)/1000000;
        setBalance(balance)
        return balance.toString();
    }; 

    const depositAmount = async(e:any) => {
        e.preventDefault();
        setLoading(true);

        try { 

            let stake_action = true; 
            const staking_amount = e.target.amount.value;

            pda = await getPdaParams(USDCPublicKey, provider.wallet.publicKey);
           
            console.log("pda")
            console.log(program.programId.toString())

            let userAssociatedTokenAccount = await spl.getAssociatedTokenAddress(
                ASSOCIATED_TOKEN_PROGRAM_ID,
                TOKEN_PROGRAM_ID,
                USDCPublicKey,
                provider.wallet.publicKey,
                false
            );
            
            let stakingVaultAssociatedAddress = await spl.getAssociatedTokenAddress(
                ASSOCIATED_TOKEN_PROGRAM_ID,
                TOKEN_PROGRAM_ID,
                USDCPublicKey,
                pda.stake_pool,
                true,
            );

            let pool_entry_pda = await getLatestEntryPDA(provider.wallet.publicKey);
            let pool_count_pda = await getEntryCountPDA(provider.wallet.publicKey);
            let latest_count = await getLastEntryCount(provider.wallet.publicKey);

            let next_count = parseInt(latest_count) + 1;
            
            await program.rpc.performAction(
                new BN(Number(staking_amount*1000000)),
                USDCPublicKey,
                stake_action,
                new BN(Number(next_count)),
                {
                  accounts: {
                    staker: provider.wallet.publicKey,
                    tokenMint: USDCPublicKey,
                    currentStakingPool: pda.stake_pool,
                    poolAction: pda.pool_action,
                    poolEntry: pool_entry_pda,
                    poolCount: pool_count_pda,
                    stakerAssociatedAddress: userAssociatedTokenAccount,
                    stakingVaultAssociatedAddress: stakingVaultAssociatedAddress,
                    associatedTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ID,
                    tokenProgram: TOKEN_PROGRAM_ID,
                    systemProgram: SystemProgram.programId,
                    rent: web3.SYSVAR_RENT_PUBKEY,
                  },
                  signers: [],
                }
            );
            
            readAccount();
            setMessage({
                error:false,
                msg: staking_amount+" USDC Deposit successfully"
            })
            getHistory();
            setLoading(false);

        } catch (error: any) { 
            setMessage({
                error:true,
                msg: error.message
            })
            setLoading(false)
        } 
    }

    const withdrawAmount = async(e:any) => {
        e.preventDefault();

        let stake_action = false;
        setLoading(true);

        try { 
            const staking_amount = e.target.amount.value;
            pda = await getPdaParams(USDCPublicKey, provider.wallet.publicKey);
            let pool_entry_pda = await getLatestEntryPDA(provider.wallet.publicKey);
            let pool_count_pda = await getEntryCountPDA(provider.wallet.publicKey);
            let latest_count = await getLastEntryCount(provider.wallet.publicKey);

            let userAssociatedTokenAccount = await spl.getAssociatedTokenAddress(
                ASSOCIATED_TOKEN_PROGRAM_ID,
                TOKEN_PROGRAM_ID,
                USDCPublicKey,
                provider.wallet.publicKey,
                false
            );
            
            let stakingVaultAssociatedAddress = await spl.getAssociatedTokenAddress(
                ASSOCIATED_TOKEN_PROGRAM_ID,
                TOKEN_PROGRAM_ID,
                USDCPublicKey,
                pda.stake_pool,
                true,
            );

            let next_count = parseInt(latest_count) + 1;
            let txn = await program.rpc.performAction(
                new BN(Number(Number(staking_amount)*1000000)),
                USDCPublicKey,
                stake_action,
                new BN(Number(next_count)),
                {
                    accounts: {
                        staker: provider.wallet.publicKey,
                        tokenMint: USDCPublicKey,
                        currentStakingPool: pda.stake_pool,
                        poolAction: pda.pool_action,
                        poolEntry: pool_entry_pda,
                        poolCount: pool_count_pda,
                        stakerAssociatedAddress: userAssociatedTokenAccount,
                        stakingVaultAssociatedAddress: stakingVaultAssociatedAddress,
                        associatedTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ID,
                        tokenProgram: TOKEN_PROGRAM_ID,
                        systemProgram: SystemProgram.programId,
                        rent: web3.SYSVAR_RENT_PUBKEY,
                    },
                    signers: [],
                }
            );

            readAccount();
            setMessage({
                error:false,
                msg: staking_amount+" USDC Withdraw successfully"
            })
            getHistory();
            setLoading(false);
        } catch (error: any) { 
            setMessage({
                error:true,
                msg: error.message
            })
            setLoading(false)
        } 
    }

    return(
        <>
            {console.log(history)}
            <section className="transaction-section" >
                <Container>
                    <Row className="justify-content-center" >
                        <Col xl={8} >
                            <Row>
                                <Col xl={12} >
                                    { message.error && message.msg != '' && (
                                        <div className="alert alert-danger text-center">
                                            <span>{message.msg}</span>
                                        </div>
                                    )}

                                    { !message.error && message.msg != '' && (
                                        <div className="alert alert-success text-center">
                                            <span>{message.msg}</span>
                                        </div>
                                    )}

                                    <div className="exchange-section">
                                        <Tab.Container id="left-tabs-example" defaultActiveKey="deposit">
                                            <Nav variant="pills">
                                                <Nav.Item>
                                                    <Nav.Link eventKey="deposit" href="#">Deposit</Nav.Link>
                                                </Nav.Item>
                                                <Nav.Item>
                                                    <Nav.Link eventKey="withdraw" href="#">Withdraw</Nav.Link>
                                                </Nav.Item>
                                            </Nav>
                                            <Tab.Content>
                                                <Tab.Pane eventKey="deposit">
                                                    <form name="deposit_form" method="POST" onSubmit={depositAmount}>
                                                        <div className="deposit-section">
                                                            <div className="transaction-header">
                                                                <p>Balance amount : {balance} </p>
                                                                {/* <img src={setting} alt="setting" /> */}
                                                            </div>

                                                            <div className="deposit-list">
                                                                <div className="item-content" >
                                                                    <img src={apusdt} alt="" />
                                                                    <div className="" >
                                                                        <span>USDC</span>
                                                                        <span></span>
                                                                    </div>
                                                                </div>
                                                                <input type="number" name='amount' step={0.001} className="no-borders" defaultValue={0.01}/>
                                                            </div>
                                                            
                                                            <div className="connect-wallet" >
                                                                {!provider.wallet.publicKey ?(
                                                                    <WalletModalProvider>
                                                                        <WalletConnectButton className="common-btn"/>
                                                                    </WalletModalProvider>
                                                                ):(
                                                                    <>
                                                                        {loading ?(
                                                                            <button className="common-btn" disabled={true}>Wait..</button>
                                                                        ):(
                                                                            <button type="submit" className="common-btn">Deposit USDC</button>
                                                                        )}
                                                                    </>
                                                                )}
                                                            </div>
                                                        </div>
                                                    </form>
                                                </Tab.Pane>
                                                <Tab.Pane eventKey="withdraw">
                                                    <div className="deposit-section withdraw-section">
                                                        <form name="deposit_form" method="POST" onSubmit={withdrawAmount}>
                                                            <div className="transaction-header">
                                                                <p>Balance amount : {balance} </p>
                                                                {/* <img src={setting} alt="setting" /> */}
                                                            </div>
                                                            {/* <div className="rangebar">
                                                                <h6>0%</h6>
                                                                <Form.Range />
                                                            </div> */}
                                                            <div className="deposit-list">
                                                                <div className="item-content" >
                                                                    <img src={apusdt} alt="" />
                                                                    <div className="" >
                                                                        <span>USDC</span>
                                                                        <span></span>
                                                                    </div>
                                                                </div>
                                                                <input type="number" name='amount' step={0.001} max={balance} className="no-borders" defaultValue={0.01}/>
                                                            </div>
                                                            {/* <div className="balanced" >
                                                                <Tab.Container id="left-tabs-example" defaultActiveKey="first">
                                                                    <Nav variant="pills">
                                                                        <Nav.Item>
                                                                            <Nav.Link eventKey="first">Balanced</Nav.Link>
                                                                        </Nav.Item>
                                                                        <Nav.Item>
                                                                            <Nav.Link eventKey="second">Single Token</Nav.Link>
                                                                        </Nav.Item>
                                                                    </Nav>
                                                                    <Tab.Content>
                                                                        <Tab.Pane eventKey="first"></Tab.Pane>
                                                                        <Tab.Pane eventKey="second"></Tab.Pane>
                                                                    </Tab.Content>
                                                                </Tab.Container>
                                                            </div> */}
                                                            <div className="connect-wallet" >
                                                                {!provider.wallet.publicKey ?(
                                                                    <WalletModalProvider>
                                                                        <WalletConnectButton className="common-btn"/>
                                                                    </WalletModalProvider>
                                                                ):(
                                                                    <>
                                                                        {loading ?(
                                                                            <button className="common-btn" disabled={true}>Wait..</button>
                                                                        ):(
                                                                            <button type="submit" className="common-btn">Withdraw USDC</button>
                                                                        )}
                                                                    </>
                                                                )}
                                                            </div>
                                                        </form>
                                                    </div>
                                                </Tab.Pane>
                                            </Tab.Content>
                                        </Tab.Container>
                                    </div>
                                </Col>
                                {/* <Col xl={6} >
                                    
                                </Col> */}
                                <Col xl={12} >
                                    <div className="transaction" >
                                        <div className="title" >
                                            <h4>Transaction History</h4>
                                            <span></span>
                                        </div>
                                        <div className="table-main"> 
                                            <Table columns={columns} dataSource={history} />
                                        </div>   
                                    </div>                            
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Container>
            </section>
        </>
    );
}

export default TransactionDetail;