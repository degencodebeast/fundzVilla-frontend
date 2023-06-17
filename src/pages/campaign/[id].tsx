import React, { useEffect, useState } from "react";
import {
  Box,
  Heading,
  Link,
  Image,
  Text,
  Divider,
  HStack,
  Tag,
  Wrap,
  WrapItem,
  SpaceProps,
  useColorModeValue,
  Container,
  VStack,
  FormControl,
  FormLabel,
  Textarea,
  Button,
  Modal,
  Center,
  ModalBody,
  ModalContent,
  ModalOverlay,
  Spinner,
  useToast,
  Input,
  Avatar,
  FormErrorMessage,
  FormHelperText,
  ModalCloseButton,
  ModalFooter,
  ModalHeader,
  Stack,
  useDisclosure,
} from "@chakra-ui/react";
import { Navbar } from "@/components";
import { useRouter } from "next/router";
import { Web3Storage } from "web3.storage";
import { getAccount, readContract } from "@wagmi/core";
import { Address } from "wagmi";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import { prepareWriteContract, writeContract } from "@wagmi/core";
import { createPublicClient, createWalletClient, custom, http, parseEther } from "viem";
import {
  CAMPAIGN_ABI,
  CAMPAIGN_MANAGER,
  CAMPAIGN_MANAGER_ABI,
} from "@/constants/contract";
import { useContractWrite, useNetwork } from "wagmi";
import { Masa } from "@masa-finance/masa-sdk";
import { shortenAddress } from "@/helpers/shortenAddress";
import { celoAlfajores } from "viem/chains";
import { ethers, providers } from "ethers";

const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweEQyQkNCYTBDQzMyMDJjMmZkQkUzMjFhZjdmODBiOEQ2NzZCRTkyOTciLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2Nzk4OTI0NzE5OTYsIm5hbWUiOiJUb2tlbiJ9.QQbjt0glkuKqkJ-C4-5q8LOGUFIIhjaIX7FZHohSQhw";

type Campaign = {
  campaign_ID: number;
  coverImage: any;
  campaignName: string;
  campaign_description: string;
  poster_address: any;
  projectDetails: any;
};

export const Campaign = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const router = useRouter();

  const campaignAddr = router.query.addr as Address;

  const account = getAccount();

  const [postCID, setPostCID] = useState("");
  const [campaign, setCampaign] = useState<any>({});
  const [donors, setDonors] = useState<any[]>([]);
  const [amount, setAmount] = useState("");
  const [inTxn, setInTxn] = useState(false);
  const [raisedFunds, setRaisedFunds] = useState(0);
  const [realtimeFunds, setRealTimeFunds] = useState(0);


  const getCampaignData = async () => {
    const [account] = await window.ethereum.request({
      method: "eth_requestAccounts",
    });

    try {
      const masa = new Masa({
        signer: account,
        environment: "dev",
        networkName: "alfajores",
      });

      const campaignCID: any = await readContract({
        address: campaignAddr,
        abi: CAMPAIGN_ABI,
        functionName: "campaignCID",
      });
      const campaignId: any = await readContract({
        address: campaignAddr,
        abi: CAMPAIGN_ABI,
        functionName: "id",
      });
      const campaignOwner: any = await readContract({
        address: campaignAddr,
        abi: CAMPAIGN_ABI,
        functionName: "owner",
      });
      const campaignTarget: any = await readContract({
        address: campaignAddr,
        abi: CAMPAIGN_ABI,
        functionName: "target",
      });
      if (campaignCID) {
        let config: any = {
          method: "get",
          url: `https://${campaignCID}.ipfs.w3s.link/obj.json`,
          headers: {},
        };
        const axiosResponse = await axios(config);

        const campaignDataObject: Campaign = axiosResponse.data;
        const soul = await masa.soulName.list(campaignOwner);
        let SOULNAME = "";
        if (soul[0]) {
          SOULNAME = soul[0].tokenDetails.sbtName;
        }

        const new_campaigns = [];

        const CampaignObj = {
          campaignId: Number(campaignId),
          campaignOwner: campaignOwner,
          soulname: SOULNAME,
          campaignTarget: Number(campaignTarget),
          campaignTitle: campaignDataObject.campaignName,
          campaignDescription: campaignDataObject.projectDetails,
          coverImage: campaignDataObject.coverImage,
          campaignScAddress: campaignAddr,
          isVerified: false,
        };

        setCampaign(CampaignObj);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const getRaisedFunds = async () => {
    try {
      const balance: any = await readContract({
        address: CAMPAIGN_MANAGER,
        abi: CAMPAIGN_MANAGER_ABI,
        args: [campaignAddr],
        functionName: "getAddressBalance",
      });
      let sum = 0;
      for(let i = 0; i<donors.length; i++) {
        const amt = Number(donors[i].amountDonated)
        sum += amt;
      }
      const updatedFunds = sum;
      setRealTimeFunds(updatedFunds)
      const funds = Number(balance);
      setRaisedFunds(funds);
    } catch (error) {
      console.log(error);
    }
  };

  const makeDonation = async () => {
    try {
       const amt = amount as `${number}`;
      const _amount = parseEther(amt);
      setInTxn(true);

      const publicClient = createPublicClient({
        chain: celoAlfajores,
        transport: http()
      })
      
      const walletClient = createWalletClient({
        chain: celoAlfajores,
        transport: custom(window.ethereum)
      })
      
      // JSON-RPC Account
      const [account] = await walletClient.getAddresses()
      const provider = new providers.Web3Provider(window.ethereum);
       const signer = provider.getSigner();

      const contract = new ethers.Contract(CAMPAIGN_MANAGER, CAMPAIGN_MANAGER_ABI, signer);
      const value = ethers.utils.parseEther(amt);
      const transaction = await contract.donate(campaign.campaignId, Number(amount), { value });
      transaction.wait();

// const data = await walletClient.writeContract({
//         address: CAMPAIGN_MANAGER,
//         abi: CAMPAIGN_MANAGER_ABI,
//         functionName: "donate",
//         args: [campaign.campaignId, Number(amount)],
//         value: parseEther(amt),
//         account
// })


     

      // const { hash } = await writeContract({
      //   address: CAMPAIGN_MANAGER,
      //   abi: CAMPAIGN_MANAGER_ABI,
      //   functionName: "donate",
      //   args: [campaign.campaignId, Number(amount)],
      //   // value: amt !== undefined ? parseEther(amt) : undefined,
      // });

      toast.success("Donation Successfull");
      setAmount("");
      setInTxn(false);

      onClose();
    } catch (error) {
      console.log(error);
      toast.error("Oops,,,,something went wrong");
      setInTxn(false);
    }
  };

  const withdrawCampaignFunds = async () => {
    try {
      if(raisedFunds != 0) {
        setInTxn(true)
        
        const amt = raisedFunds.toString();
        const amount = amt as `${number}`;
        const campaignId: any = await readContract({
          address: campaignAddr,
          abi: CAMPAIGN_ABI,
          functionName: "id",
        });
        const { hash } = await writeContract({
          address: CAMPAIGN_MANAGER,
          abi: CAMPAIGN_MANAGER_ABI,
          args: [campaignId, raisedFunds],
          functionName: "claim",
        });
        setInTxn(false)
      } else {
        toast.error('Insufficient funds to withdraw')
      }
      
    } catch (error) {
      console.log(error)
      setInTxn(false)
      
    }

   
  
  };

  const getDonors = async () => {
    try {
      const campaignId: any = await readContract({
        address: campaignAddr,
        abi: CAMPAIGN_ABI,
        functionName: "id",
      });

      const donors: any = await readContract({
        address: CAMPAIGN_MANAGER,
        abi: CAMPAIGN_MANAGER_ABI,
        args: [campaignId],
        functionName: "getParticularCampaignDonors",
      });
      setDonors(donors);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const updateData = async () => {
      await getCampaignData();
      await getDonors();
      await getRaisedFunds();
    };
    updateData();
  });

  return (
    <>
      <Navbar />
      <Toaster />

      <Modal
        isOpen={inTxn}
        onClose={() => {
          !inTxn;
        }}
        isCentered
      >
        <ModalOverlay />
        <ModalContent>
          <ModalBody>
            <Center>
              <Spinner
                thickness="4px"
                speed="0.65s"
                emptyColor="gray.200"
                color="blue.500"
                size="xl"
              />
            </Center>
          </ModalBody>
        </ModalContent>
      </Modal>

      <main
        className={`main-color flex min-h-screen flex-col items-center justify-between p-24 `}
      >
        <Container maxW={"7xl"} p="12" color={"white"}>
          <Heading as="h6">Campaign</Heading>
          <Box
            marginTop={{ base: "1", sm: "5" }}
            display="flex"
            flexDirection={{ base: "column", sm: "row" }}
            justifyContent="space-between"
          >
            <Box
              display="flex"
              flex="1"
              marginRight="3"
              position="relative"
              alignItems="center"
            >
              <Box
                width={{ base: "90%", sm: "55%" }}
                zIndex="2"
                marginLeft={{ base: "0", sm: "5%" }}
                marginTop="5%"
              >
                <Link textDecoration="none" _hover={{ textDecoration: "none" }}>
                  <Image
                    borderRadius="lg"
                    src={`https://ipfs.io/ipfs/${campaign.coverImage}`}
                    alt="campaignBanner"
                    objectFit="contain"
                  />
                </Link>
              </Box>
              <Box
                zIndex="1"
                width="100%"
                position="absolute"
                height="100%"
              ></Box>
            </Box>
            <Box
              display="flex"
              flex="1"
              flexDirection="column"
              justifyContent="center"
              marginTop={{ base: "3", sm: "0" }}
            >
              <Heading marginTop="1">
                <Link textDecoration="none" _hover={{ textDecoration: "none" }}>
                  {campaign.campaignTitle}
                </Link>
              </Heading>
              <Text
                as="p"
                marginTop="2"
                color={useColorModeValue("white.700", "white.200")}
                fontSize="lg"
              >
                {campaign.campaignDescription}
              </Text>
              <Divider marginTop="5" mb={5} />
              <Text>By: {campaign.soulname || campaign.campaignOwner}</Text>
              {/* <Text>Posted: 2023-04-06T19:01:27Z</Text> */}
              {campaign.campaignOwner == account.address && (
                <>
                  <Button
                    bgGradient="linear(to-l, #0ea5e9,#2563eb)"
                    _hover={{
                      bgGradient: "linear(to-l, #0ea5e9,#2563eb)",
                      opacity: 0.9,
                    }}
                    onClick={withdrawCampaignFunds}
                    size={"md"}
                    width={"auto"}
                  >
                    Withdraw Funds
                  </Button>
                </>
              )}
            </Box>
          </Box>

          <Divider marginTop="5" />

          <VStack paddingTop="40px" spacing="2" alignItems="flex-start">
            <Heading as="h2">
              Amount Raised: {realtimeFunds} / {campaign.campaignTarget} celo
            </Heading>
            <Text as="p" fontSize="lg" width={"89%"}>
              Want to support this campaign? <br />
              <Button
                bgGradient="linear(to-l, #0ea5e9,#2563eb)"
                _hover={{
                  bgGradient: "linear(to-l, #0ea5e9,#2563eb)",
                  opacity: 0.9,
                }}
                onClick={onOpen}
              >
                Donate
              </Button>
            </Text>
          </VStack>
          <Divider marginTop="5" mb={5} />
          <Heading>Donor(s)</Heading>
          {donors.map((data: any) => {
            const amountDonated = Number(data.amountDonated)
            return (
              <>
                <Text>Donation by: {data.donorAddress}</Text>
                <Text>Amount: {amountDonated} Celo </Text>
                <Divider marginTop="5" mb={5} />
              </>
            );
          })}
          <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Donate</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <FormControl id="userName" isRequired>
                  <FormLabel>Amount</FormLabel>
                  <Input
                    placeholder="Enter Amount in celo"
                    _placeholder={{ color: "gray.500" }}
                    type="text"
                    required
                    onChange={(e) => {
                      setAmount(e.target.value);
                    }}
                  />
                </FormControl>
              </ModalBody>

              <ModalFooter>
                <Button colorScheme="blue" mr={3} onClick={onClose}>
                  Close
                </Button>
                <Button variant="ghost" onClick={makeDonation}>
                  Donate
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
          
        </Container>
      </main>
    </>
  );
};

export default Campaign;
