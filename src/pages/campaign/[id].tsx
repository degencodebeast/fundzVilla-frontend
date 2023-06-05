import React, { useEffect, useState } from 'react'
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
} from '@chakra-ui/react'
import { Navbar } from '@/components'
import { useRouter } from 'next/router'
import { Web3Storage } from 'web3.storage'
import { getAccount, readContract } from '@wagmi/core'
import { Address } from 'wagmi'
import toast, { Toaster } from "react-hot-toast";
import axios from 'axios'
import { prepareWriteContract, writeContract } from '@wagmi/core'
import { ethers, parseEther } from "ethers";
import { CAMPAIGN_ABI, CAMPAIGN_MANAGER_ABI } from '@/constants/contract';
import { useContractWrite, useNetwork,  } from "wagmi";

const token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweEQyQkNCYTBDQzMyMDJjMmZkQkUzMjFhZjdmODBiOEQ2NzZCRTkyOTciLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2Nzk4OTI0NzE5OTYsIm5hbWUiOiJUb2tlbiJ9.QQbjt0glkuKqkJ-C4-5q8LOGUFIIhjaIX7FZHohSQhw'

  type Campaign = {
    campaign_ID: number
    coverImage: any
    campaignName: string
    campaign_description: string
    poster_address: any
    projectDetails: any
  }

export const Campaign = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const router = useRouter()

  const campaignAddr = router.query.addr as Address

  const account = getAccount();

 
  


  const [postCID, setPostCID] = useState('')
  const [campaign, setCampaign] = useState<any>({})
  const [amount, setAmount] = useState('')
 

  const getCampaignData = async () => {

    try {

      const campaignCID: any = await readContract({
        address: campaignAddr,
        abi: CAMPAIGN_ABI,
        functionName: 'campaignCID',
      })
      const campaignId: any = await readContract({
        address: campaignAddr,
        abi: CAMPAIGN_ABI,
        functionName: 'id',
      })
      const campaignOwner: any = await readContract({
        address: campaignAddr,
        abi: CAMPAIGN_ABI,
        functionName: 'owner',
      })
      const campaignTarget: any = await readContract({
        address: campaignAddr,
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
  
  
        
        const new_campaigns = [];
        
        const CampaignObj = {
          campaignId: Number(campaignId),
          campaignOwner: campaignOwner,
          campaignTarget: Number(campaignTarget),
          campaignTitle: campaignDataObject.campaignName,
          campaignDescription: campaignDataObject.projectDetails,
          coverImage: campaignDataObject.coverImage,
          campaignScAddress: campaignAddr,
          isVerified: false,
        }
        
        setCampaign(CampaignObj);
      }
  
  
        
      
    } catch (error) {

      console.log(error)
      
    }
    
  }
  
   const makeDonation = async() => {
    try {
      const _amount = parseEther(amount)
      const { hash } = await writeContract({
        address: '0x52B3BA8ca46ae59FF43F0b9A04Dd32384e032Ecc',
        abi: CAMPAIGN_MANAGER_ABI,
        functionName: 'Donate',
        args: [ campaign.campaignId, Number(amount)],
        value: _amount,
      })

      toast.success('Donation Successfull');
      setAmount('');
      onClose()
    
      
    } catch (error) {
      console.log(error)
      toast.error('Oops,,,,something went wrong')
    }  
   }

   const withdrawCampaignFunds = async()=> {

    const { hash } = await writeContract({
      address: campaignAddr,
      abi: CAMPAIGN_ABI,
      functionName: 'claim',
      
    })

   }

 



  


 
  useEffect(() => {
    const updateData = async ()=>{
            await getCampaignData()
    }
    updateData();
    
  },  )

  return (
    <>
      <Navbar />
      <Toaster />

      {/* <Modal
        isOpen={loading}
        onClose={() => {
          !loading
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
      </Modal> */}

      <main
      className={`main-color flex min-h-screen flex-col items-center justify-between p-24 `}
    >

      <Container maxW={'7xl'} p="12">
        <Heading as="h6">Campaigns</Heading>
        <Box
          marginTop={{ base: '1', sm: '5' }}
          display="flex"
          flexDirection={{ base: 'column', sm: 'row' }}
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
              width={{ base: '90%', sm: '55%' }}
              zIndex="2"
              marginLeft={{ base: '0', sm: '5%' }}
              marginTop="5%"
            >
              <Link textDecoration="none" _hover={{ textDecoration: 'none' }}>
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
            marginTop={{ base: '3', sm: '0' }}
          >
            <Heading marginTop="1">
              <Link textDecoration="none" _hover={{ textDecoration: 'none' }}>
                {campaign.campaignTitle}
              </Link>
            </Heading>
            <Text
              as="p"
              marginTop="2"
              color={useColorModeValue('gray.700', 'gray.200')}
              fontSize="lg"
            >
              {campaign.campaignDescription}
            </Text>
            <Divider marginTop="5" mb={5} />
            <Text>By: {campaign.campaignOwner}</Text>
            {/* <Text>Posted: 2023-04-06T19:01:27Z</Text> */}
            {campaign.campaignOwner == account.address && (
            <>
           
            <Button onClick={withdrawCampaignFunds} size={'md'} width={'auto'}>Withdraw Funds</Button>
            </>
             )}
            
          </Box>
        </Box>

        <Divider marginTop="5" />

        <VStack paddingTop="40px" spacing="2" alignItems="flex-start">
          <Heading as="h2">Amount Raised: 50 / {campaign.campaignTarget} USDT</Heading>
          <Text as="p" fontSize="lg" width={'89%'}>
            Want to support this campaign? <br />
            <Button onClick={onOpen}>Donate</Button>
          </Text>
        </VStack>
        <Divider marginTop="5" mb={5} />
        <Heading>Donor(s)</Heading>
        <Text>Donation by: </Text>
              <Text>Amount: </Text>
              <Divider marginTop="5" mb={5} />
              <Text>Donation by: </Text>
              <Text>Amount: </Text>
              <Divider marginTop="5" mb={5} />

        
        <Divider marginTop="5" mb={5} />
        <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Donate</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
           
            <FormControl id="userName" isRequired>
              <FormLabel>Amount</FormLabel>
              <Input
                placeholder="Enter Amount in cUSD"
                _placeholder={{ color: 'gray.500' }}
                type="text"
                required
                onChange={(e) => {
                  setAmount(e.target.value)
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
  )
}

export default Campaign