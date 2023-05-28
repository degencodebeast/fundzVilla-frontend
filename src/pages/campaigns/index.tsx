import { Inter } from 'next/font/google'
import { Features, Footer, Hero, Navbar, Sponsors } from '@/components'
import { Image, Badge, Box, Button, Center, Text, Checkbox, Container, FormControl, FormLabel, Heading, Input, InputGroup, InputRightElement, Link, SimpleGrid, Stack, VStack, useColorModeValue } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { useContractRead } from 'wagmi';
import { readContract } from '@wagmi/core';
import axios from 'axios';
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
    campaignImage: string
    campaignTitle: string
    campaignDescription: string
    campaignerWalletAddress: string
    campaignScAddress: string
  }
  type Campaign = {
    campaign_ID: number
    campaign_image: any
    campaign_title: string
    campaign_description: string
    poster_address: any
  }
function Campaigns() {

  const [latestCid, setLatestCid] = useState<string>('')
  const [allCampaigns, setallCampaigns] = useState<CampaignDetail[]>([])
  const [noOfcampaigns, setNoOfcampaigns] = useState<number>(0)
  const [isLoading, setIsLoading] = useState(true);



  const getallCampaigns = async () => {
    try {
      const allCampaignsAddresses: any = await readContract({
        address: BLOG_MANAGER_CONTRACT_ADDRESS,
        abi: BLOG_MANAGER_ABI,
        functionName: 'getcampaigns',
      })

      const allCampaigns: any = await readContract({
        address: BLOG_MANAGER_CONTRACT_ADDRESS,
        abi: BLOG_MANAGER_ABI,
        functionName: 'getcampaignsData',
        args: [allCampaignsAddresses],
      })
      setLatestCid(allCampaigns.campaignCID)
      setNoOfcampaigns(allCampaigns.campaignerAddress.length)

      let new_campaigns = []
      //iterate and loop through the data retrieve from the blockchain
      for (let i = 0; i < allCampaigns.campaignerAddress.length; i++) {
        let campaignerWalletAddress: string = allCampaigns.campaignerAddress[i]
        let noOfComments: number = allCampaigns.numberOfComments[i].toNumber()
        let campaignSCAddress = allCampaignsAddresses[i]

        //get campaignId
        const campaignId: any = await readContract({
          address: BLOG_MANAGER_CONTRACT_ADDRESS,
          abi: BLOG_MANAGER_ABI,
          functionName: 'campaignIds',
          args: [campaignSCAddress],
        })

        if (allCampaigns.campaignCID !== 0) {
          //get file data using axios from url
          // const seeData = await getJSONFromCID(allCampaigns.campaignCID)
          let config: any = {
            method: 'get',
            url: `https://${allCampaigns.campaignCID}.ipfs.w3s.link/campaign.json`,
            headers: {},
          }
          const axiosResponse = await axios(config)

          const campaignDataObject: Campaign[] = axiosResponse.data


          const getCurrentcampaignTitle = campaignDataObject.filter(
            (data) => data.campaign_ID === campaignId.toNumber(),
          )[0].campaign_title
          const getCurrentcampaignDescription = campaignDataObject.filter(
            (data) => data.campaign_ID === campaignId.toNumber(),
          )[0].campaign_description
          const getCurrentcampaignImage = campaignDataObject.filter(
            (data) => data.campaign_ID === campaignId.toNumber(),
          )[0].campaign_image

          //Data of each campaign
          let newcampaign: CampaignDetail = {
            campaignTitle: getCurrentcampaignTitle,
            campaignImage: getCurrentcampaignImage,
            campaignDescription: getCurrentcampaignDescription,
            campaignId: campaignId.toNumber(),
            campaignerWalletAddress, //user wallet address
            campaignScAddress, //campaign smart contract address
          }
          new_campaigns.push(newcampaign)
        }
      }
      setallCampaigns(new_campaigns)
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
        {dataList.map((blog) => {
          return (
            <Box position="relative" key={blog.id} >
              <Box fontSize="sm" position="absolute" right="5px" margin="5px" zIndex="1">
                 {blog.isVerified ? <Badge rounded="full" p="2px 8px" colorScheme="green" backgroundColor={'green.600'}>
                  Verified
                </Badge> :  <Badge rounded="full" p="2px 8px" colorScheme="red" backgroundColor={'yellow.600'}>
                  Not Verified
                </Badge>}
               
               
                

              </Box>
              <Link href={`campaign/1`} >
                <Box
                  borderWidth="1px"
                  shadow="md"
                  rounded="lg"
                  overflow="hidden"
                  position="relative"
                  
                >
                  <Image  src="https://bit.ly/2Z4KKcF" alt="Blog image" />
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
                        {blog.title}
                      </Box>
                    </Box>
                    <Box>
                      <Box color="gray.600" fontSize="sm">
                        <Badge rounded="full" px="2" colorScheme="teal">
                          {blog.authorName}
                        </Badge>
                      </Box>
                      <Text mt={1} color="white" ml={1}><strong>{blog.target} USDT</strong> </Text>
                    </Box>
                    <Text
                      mt="1"
                      fontWeight="semibold"
                      noOfLines={3}
                      lineHeight="tight"
                      color="gray.600"
                      fontSize="sm"
                    >
                      {blog.content}
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
