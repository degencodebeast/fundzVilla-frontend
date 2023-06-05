import { Inter } from 'next/font/google'
import { Features, Footer, Hero, Navbar, Sponsors } from '@/components'
import { Image, Badge, Box, Button, Center, Text, Checkbox, Container, FormControl, FormLabel, Heading, Input, InputGroup, InputRightElement, SimpleGrid, Stack, VStack, useColorModeValue } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useContractRead } from 'wagmi';
import { readContract } from '@wagmi/core';
import axios from 'axios';
import { CAMPAIGN_ABI, CAMPAIGN_MANAGER, CAMPAIGN_MANAGER_ABI } from '@/constants/contract';
const dataList = [
    {
      id: 1,
      title: 'Buy Me This House',
      authorName: '0x1c5...e5957',
      content: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.`,
      isVerified: true,
      target: 500,
    },
    {
        id: 1,
        title: 'Buy Me This House',
        authorName: '0x1c5...e5957',
        content: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.`,
        isVerified: true,
        target: 553,
      },
      {
        id: 1,
        title: 'Buy Me This House',
        authorName: '0x1c5...e5957',
        content: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.`,
        isVerified: false,
        target: 400,
      },
    
    
  ];

  type CampaignDetail = {
    campaignId: number
    coverImage: string
    isVerified: boolean
    campaignTitle: string
    campaignTarget: string
    campaignDescription: string
    campaignOwner: string
    campaignScAddress: string
  }
  type Campaign = {
    campaign_ID: number
    coverImage: any
    campaignName: string
    campaign_description: string
    poster_address: any
    projectDetails: any
  }
function Campaigns() {

  const [allCampaigns, setallCampaigns] = useState<any[]>([])
  const [noOfcampaigns, setNoOfcampaigns] = useState<number>(0)
  const [isLoading, setIsLoading] = useState(true);



  const getallCampaigns = async () => {
    try {
      const allCampaignsAddresses: any = await readContract({
        address: CAMPAIGN_MANAGER,
        abi: CAMPAIGN_MANAGER_ABI,
        functionName: 'getAllCampaigns',
      })

      console.log('HERE: ', allCampaignsAddresses);

      let new_campaigns = []

      for(let i = 0; i < allCampaignsAddresses.length; i++) {

        const campaignCID: any = await readContract({
          address: allCampaignsAddresses[i],
          abi: CAMPAIGN_ABI,
          functionName: 'campaignCID',
        })
        const campaignId: any = await readContract({
          address: allCampaignsAddresses[i],
          abi: CAMPAIGN_ABI,
          functionName: 'id',
        })
        const campaignOwner: any = await readContract({
          address: allCampaignsAddresses[i],
          abi: CAMPAIGN_ABI,
          functionName: 'owner',
        })
        const campaignTarget: any = await readContract({
          address: allCampaignsAddresses[i],
          abi: CAMPAIGN_ABI,
          functionName: 'target',
        })

        if(campaignCID) {
          let config: any = {
            method: 'get',
            url: `https://${campaignCID}.ipfs.w3s.link/obj.json`,
            headers: {},
          }
          const axiosResponse = await axios(config)

          const campaignDataObject: Campaign = axiosResponse.data

          console.log(campaignDataObject)
          
          const CampaignObj = {
            campaignId: Number(campaignId),
            campaignOwner: campaignOwner,
            campaignTarget: Number(campaignTarget),
            campaignTitle: campaignDataObject.campaignName,
            campaignDescription: campaignDataObject.projectDetails,
            coverImage: campaignDataObject.coverImage,
            campaignScAddress: allCampaignsAddresses[i],
            isVerified: false,
          }
          console.log(CampaignObj)

          new_campaigns.push(CampaignObj)


          
        }


      }

      setallCampaigns(new_campaigns);

     


    
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    getallCampaigns();
    const timeout = setTimeout(() => {
      
      setIsLoading(false);
    }, 4500);

    // Cleanup function to clear the timeout when the component unmounts
    return () => clearTimeout(timeout);
   

  }, [noOfcampaigns])

  return (
    <>
    
    <Navbar/>
    <main
      className={`main-color flex min-h-screen flex-col items-center justify-between p-24 `}
    >
        <Text color={'white'} fontWeight={20} fontSize={27} > CAMPAIGNS</Text>
        <div>
        <Container maxWidth="1200px" mx="auto" my="auto" p={{ base: 5, md: 10 }}>
      <SimpleGrid columns={[1, 2, 3]} spacing="20px">
        {allCampaigns.map((campaign) => {
          return (
            <Box position="relative" key={campaign.campaignId} >
              <Box fontSize="sm" position="absolute" right="5px" margin="5px" zIndex="1">
                 {campaign.isVerified ? <Badge rounded="full" p="2px 8px" colorScheme="green" backgroundColor={'green.600'}>
                  Verified
                </Badge> :  <Badge rounded="full" p="2px 8px" colorScheme="red" backgroundColor={'yellow.600'}>
                  Not Verified
                </Badge>}
               
               
                

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
                  <Image  src={`https://ipfs.io/ipfs/${campaign.coverImage}`} alt="Blog image" />
                  <Box p={{ base: 4, lg: 6 }}>
                    <Box display="flex" alignItems="baseline">
                      <Box
                        fontWeight="semibold"
                        as="h2"
                        letterSpacing="wide"
                        textTransform="uppercase"
                        ml="2"
                        color={'white'}
                        
                      >
                        {campaign.campaignTitle}
                      </Box>
                    </Box>
                    <Box>
                      <Box color="gray.600" fontSize="sm">
                        <Badge rounded="full" px="2" colorScheme="teal">
                          {campaign.campaignOwner}
                        </Badge>
                      </Box>
                      <Text mt={1} color="white" ml={1}><strong>{campaign.campaignTarget} BIT</strong> </Text>
                    </Box>
                    <Text
                      mt="1"
                      fontWeight="semibold"
                      noOfLines={3}
                      lineHeight="tight"
                      color="gray.600"
                      fontSize="sm"
                    >
                      {campaign.campaignDescription}
                    </Text>
                  </Box>
                </Box>
              </Link>
            </Box>
          );
        })}
      </SimpleGrid>
    </Container>
        </div>
    

<Footer/>
    
    </main>
   
    </>
  )
}








export default Campaigns
