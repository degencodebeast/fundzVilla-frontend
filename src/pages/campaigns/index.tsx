import { Inter } from "next/font/google";
import { Features, Footer, Hero, Navbar, Sponsors } from "@/components";
import {
  Image,
  Badge,
  Box,
  Button,
  Center,
  Text,
  Checkbox,
  Container,
  FormControl,
  FormLabel,
  Heading,
  Input,
  InputGroup,
  InputRightElement,
  SimpleGrid,
  Stack,
  VStack,
  useColorModeValue,
  chakra,
  Progress,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useContractRead, useNetwork } from "wagmi";
import { getAccount, getWalletClient, readContract } from "@wagmi/core";
import axios from "axios";
import {
  CAMPAIGN_ABI,
  CAMPAIGN_MANAGER,
  CAMPAIGN_MANAGER_ABI,
} from "@/constants/contract";
import { shortenAddress } from "@/helpers/shortenAddress";
import { getSoulNameByAddress } from "@/helpers";
import { Masa } from "@masa-finance/masa-sdk";
import { createWalletClient, custom } from "viem";
import { celoAlfajores } from "viem/chains";
import { Signer } from "ethers";
import { shortenString } from "@/helpers/shortenString";
declare global {
  interface Window {
    ethereum: any;
  }
}

type CampaignDetail = {
  campaignId: number;
  coverImage: string;
  soulName: string;
  isVerified: boolean;
  campaignTitle: string;
  campaignTarget: string;
  campaignDescription: string;
  campaignOwner: string;
  campaignScAddress: string;
};
type Campaign = {
  campaign_ID: number;
  coverImage: any;
  soulName: string;
  campaignName: string;
  campaign_description: string;
  poster_address: any;
  projectDetails: any;
};
function Campaigns() {
  const [allCampaigns, setallCampaigns] = useState<any[]>([]);
  // const [masa, setMasa] = useState<any>()

  const [noOfcampaigns, setNoOfcampaigns] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(true);
  const { chain } = useNetwork();
  const currentAcc = "0x7231D8CCF0bcF5678dB30730EfE18F21d520C379";
  const chainName: any = chain?.name.toLowerCase();

  const getallCampaigns = async () => {
    const [account] = await window.ethereum.request({
      method: "eth_requestAccounts",
    });

    try {
      const masa = new Masa({
        signer: account,
        environment: "dev",
        networkName: chainName,
      });

      const allCampaignsAddresses: any = await readContract({
        address: CAMPAIGN_MANAGER,
        abi: CAMPAIGN_MANAGER_ABI,
        functionName: "getAllCampaigns",
      });

      let new_campaigns = [];

      for (let i = 0; i < allCampaignsAddresses.length; i++) {
        const campaignCID: any = await readContract({
          address: allCampaignsAddresses[i],
          abi: CAMPAIGN_ABI,
          functionName: "campaignCID",
        });
        const campaignId: any = await readContract({
          address: allCampaignsAddresses[i],
          abi: CAMPAIGN_ABI,
          functionName: "id",
        });
        const campaignOwner: any = await readContract({
          address: allCampaignsAddresses[i],
          abi: CAMPAIGN_ABI,
          functionName: "owner",
        });
        const campaignTarget: any = await readContract({
          address: allCampaignsAddresses[i],
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

          const CampaignObj = {
            campaignId: Number(campaignId),
            campaignOwner: campaignOwner,
            soulname: SOULNAME,
            campaignTarget: Number(campaignTarget),
            campaignTitle: campaignDataObject.campaignName,
            campaignDescription: campaignDataObject.projectDetails,
            coverImage: campaignDataObject.coverImage,
            campaignScAddress: allCampaignsAddresses[i],
            isVerified: false,
          };
          console.log("here", CampaignObj);

          new_campaigns.push(CampaignObj);
        }
      }

      setallCampaigns(new_campaigns);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getallCampaigns();
    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 6500);

    // Cleanup function to clear the timeout when the component unmounts
    return () => clearTimeout(timeout);
  });

  return (
    <>
      <Navbar />
      <main
        className={`main-color flex min-h-screen flex-col items-center justify-between p-24 `}
      >
        <Text color={"white"} fontWeight={20} fontSize={27}>
          {" "}
          CAMPAIGNS
        </Text>
        <div>
          <Link href={"/campaigns/create-campaign"}>
            <chakra.button
              w={{ base: "100%", sm: "auto" }}
              textAlign={"center"}
              h={12}
              px={6}
              mt={5}
              color="white"
              rounded="md"
              mb={{ base: 2, sm: 0 }}
              zIndex={5}
              lineHeight={1}
              bgGradient="linear(to-l, #0ea5e9,#2563eb)"
              _hover={{
                bgGradient: "linear(to-l, #0ea5e9,#2563eb)",
                opacity: 0.9,
              }}
            >
              <chakra.span> Create Campaign </chakra.span>
            </chakra.button>
          </Link>
        </div>
        <div>
        {isLoading ? (
        <>
          <Text color={'white'}>Loading campaigns...</Text>
          <Progress size="xs" isIndeterminate mb={5} />
        </>
      ) : (
          <Container
            maxWidth="1200px"
            mx="auto"
            my="auto"
            p={{ base: 5, md: 10 }}
          >
            <SimpleGrid columns={[1, 2, 3]} spacing="20px">
              {allCampaigns.map((campaign) => {
                return (
                  <Box  position="relative" key={campaign.campaignId}>
                    <Box
                      fontSize="sm"
                      position="absolute"
                      right="5px"
                      margin="5px"
                      zIndex="1"
                      maxHeight={'400px'}
                    >
                      {campaign.isVerified ? (
                        <Badge
                          rounded="full"
                          p="2px 8px"
                          colorScheme="green"
                          backgroundColor={"green.600"}
                        >
                          Verified
                        </Badge>
                      ) : (
                        <Badge
                          rounded="full"
                          p="2px 8px"
                          colorScheme="red"
                          backgroundColor={"yellow.600"}
                        >
                          Not Verified
                        </Badge>
                      )}
                    </Box>
                    <Link
                      href={{
                        query: {
                          addr: campaign.campaignScAddress,
                          // campaignId: campaign.campaignID,
                        },
                        pathname: `/campaign/${campaign.campaignScAddress}`,
                      }}
                    >
                      <Box
                        borderWidth="1px"
                        shadow="md"
                        rounded="lg"
                        overflow="hidden"
                        position="relative"
                      >
                        <Image
                          boxSize="338px"
                          src={`https://ipfs.io/ipfs/${campaign.coverImage}`}
                          objectFit={'cover'}
                          alt="campaign image"
                          width={'full'}
                        />
                        <Box p={{ base: 4, lg: 6 }}>
                          <Box display="flex" alignItems="baseline">
                            <Box
                              fontWeight="semibold"
                              as="h2"
                              letterSpacing="wide"
                              ml="2"
                              color={"white"}
                            >
                              {campaign.campaignTitle}
                            </Box>
                          </Box>
                          <Box>
                            <Box color="gray.600" fontSize="sm">
                              <Badge
                                textTransform={"lowercase"}
                                rounded="full"
                                px="2"
                                colorScheme="teal"
                              >
                                {campaign.soulname ||
                                  shortenAddress(campaign.campaignOwner)}
                              </Badge>
                            </Box>
                            <Text mt={1} color="white" ml={1}>
                              <strong>{campaign.campaignTarget} celo</strong>{" "}
                            </Text>
                          </Box>
                          <Text
                            mt="1"
                            fontWeight="semibold"
                            noOfLines={3}
                            lineHeight="tight"
                            color="gray.600"
                            fontSize="sm"
                          >
                            {shortenString(campaign.campaignDescription)}
                          </Text>
                        </Box>
                      </Box>
                    </Link>
                  </Box>
                );
              })}
            </SimpleGrid>
          </Container>
      )}
        </div>

        <Footer />
      </main>
    </>
  );
}

export default Campaigns;
