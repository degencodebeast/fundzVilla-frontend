import Image from 'next/image'
import { Inter } from 'next/font/google'
import { Features, Footer, Hero, Navbar, Sponsors } from '@/components'
import { Button, Center, Checkbox, Container, FormControl, FormLabel, Heading, Input, InputGroup, InputRightElement, Link, Stack, VStack, useColorModeValue } from '@chakra-ui/react'
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { Web3Storage } from "web3.storage";
import { useContractWrite } from "wagmi";
import { prepareWriteContract, writeContract } from "@wagmi/core";
import { ethers } from "ethers";


const client = new Web3Storage({
  token:
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweEQyQkNCYTBDQzMyMDJjMmZkQkUzMjFhZjdmODBiOEQ2NzZCRTkyOTciLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2Nzk4OTI0NzE5OTYsIm5hbWUiOiJUb2tlbiJ9.QQbjt0glkuKqkJ-C4-5q8LOGUFIIhjaIX7FZHohSQhw'
});

function CreateCampaign() {
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);
  const [campaignName, setCampaignName] = useState("");
  const [target, setTarget] = useState('');
  const [link, setLink] = useState("");
  const [projectDetails, setProjectDetails] = useState("");
  const [coverImage, setCoverImage] = useState<File | null>(null);
  const [coverImageUrl, setCoverImageUrl] = useState("");
  const [inTxn, setInTxn] = useState(false);
  
  const handleCoverImageChange = (e: any) => {
    setCoverImage(e.target.files[0]);
    toast.success("Successfully added!");
    setCoverImageUrl(URL.createObjectURL(e.target.files[0]));
  };

  const CreateCampaign = async (e: any) => {
    e.preventDefault();
    if ( !campaignName || !link || !projectDetails || !coverImage) {
      toast.error("Please fill out all the fields");
      return;
    }
    try {
      
      setInTxn(true)
      const imgHash = await client.put([coverImage], {
        wrapWithDirectory: false,
      });
      console.log("Image hash: ", imgHash);
      //creating object containing all the data
      const obj = {
        campaignName,
        link,
        projectDetails,
        coverImage: imgHash,
      };
      console.log("Obj: ", obj);
      //converting object to a blob
      const blob = new Blob([JSON.stringify(obj)], {
        type: "application/json",
      });
      //and then to a file
      const file = [new File([blob], "obj.json")];
      //uploading file to ipfs
      const objHash = await client.put(file);
      console.log("Obj hash: ", objHash);


      

      const _target = Number(target);
      console.log(objHash, _target, )

      // const configure = await prepareWriteContract({
      //   address: "0xe8d3a73f6351f9f5dd6A577aD4ddF7d5C84DF5C8",
      //   abi: ABI.campaignFactory,
      //   functionName: 'createCampaign',
      //   args: [objHash, _target],
      // })
      // const data = await writeContract(configure)

     
      
      // const contractInst = new ethers.Contract(
      //   '0xe8d3a73f6351f9f5dd6A577aD4ddF7d5C84DF5C8',
      //   ABI.campaignFactory,
      //  signer.data || provider,
      // );
      // const data = await contractInst.createCampaign(objHash, _target, satelliteAddr)
      // data.wait()
     
      toast.success('Campaign Successfully created!')
      setInTxn(false)
    } catch (error) {
      setInTxn(false)
      toast.error('Something Went wrong')
      console.log(error);
    }
  };

  
  return (
    <>
    
    <Navbar/>
    <Toaster />
    <main
      className={`main-color flex min-h-screen flex-col items-center justify-between p-24 `}
    >
      <Container maxW="7xl" p={{ base: 5, md: 10 }}>
      <Center>
        <Stack spacing={4}>
          <Stack align="center">
            <Heading  color={'white'} fontSize="2xl">Create Campaign</Heading>
          </Stack>
          <VStack
            as="form"
            boxSize={{ base: 'xs', sm: 'sm', md: 'md' }}
            h="max-content !important"
            bg={useColorModeValue('gray.700', 'gray.700')}
            rounded="lg"
            boxShadow="lg"
            p={{ base: 5, sm: 10 }}
            spacing={8}
          >
            <VStack color={'white'} spacing={4} w="100%">

              <FormControl id="email">
                <FormLabel>Campaign Title</FormLabel>
                <Input onChange={(e) => {
                    setCampaignName(e.target.value); 
                   
                  }} rounded="md" type="text" placeholder='Enter campaign title' />
              </FormControl>

              <FormControl id="desc">
                <FormLabel>Description</FormLabel>
                <Input onChange={(e) => {
                    setProjectDetails(e.target.value)} }  rounded="md" type="text" placeholder='Describe your project'/>
              </FormControl>
              <FormControl id="desc">
                <FormLabel>Relevant Links</FormLabel>
                <Input onChange={(e) => {
                    setLink(e.target.value)} }  rounded="md" type="text" placeholder='Describe your project'/>
              </FormControl>

              <FormControl id="targ">
                <FormLabel>Target (BIT)</FormLabel>
                <Input onChange={(e) => {
                    setTarget(e.target.value); 
                   
                  }}  rounded="md" type="text" placeholder='Enter the amount you need for suppport' />
              </FormControl>

              <FormControl id="image">
                <FormLabel>Campaign Banner</FormLabel>
                <Input onChange={handleCoverImageChange} rounded="md" type="file"  />
              </FormControl>
            

            </VStack>
            <VStack w="100%">
          
              <Button
                bgGradient="linear(to-l, #0ea5e9,#2563eb)"  
                color="white"
                _hover={{
                  bg: 'green.500'
                }}
                rounded="md"
                w="100%"
                onClick={CreateCampaign}
              >
                Create Campaign
              </Button>
            </VStack>
          </VStack>
        </Stack>
      </Center>
    </Container>

<Footer/>
    
    </main>
   
    </>
  )
}


export default CreateCampaign
