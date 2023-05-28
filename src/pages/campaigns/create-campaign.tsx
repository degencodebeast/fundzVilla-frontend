import Image from 'next/image'
import { Inter } from 'next/font/google'
import { Features, Footer, Hero, Navbar, Sponsors } from '@/components'
import { Button, Center, Checkbox, Container, FormControl, FormLabel, Heading, Input, InputGroup, InputRightElement, Link, Stack, VStack, useColorModeValue } from '@chakra-ui/react'
import { useState } from 'react'


function CreateCampaign() {
  return (
    <>
    
    <Navbar/>
    <main
      className={`main-color flex min-h-screen flex-col items-center justify-between p-24 `}
    >
     <CampaignForm />

      {/* <SimpleSignIn /> */}

<Footer/>
    
    </main>
   
    </>
  )
}
const CampaignForm = () => {
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);

  return (
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
            <VStack spacing={4} w="100%">

              <FormControl id="email">
                <FormLabel>Campaign Title</FormLabel>
                <Input rounded="md" type="text" placeholder='Enter campaign title' />
              </FormControl>

              <FormControl id="desc">
                <FormLabel>Description</FormLabel>
                <Input rounded="md" type="text" placeholder='Describe your project'/>
              </FormControl>

              <FormControl id="targ">
                <FormLabel>Target (USDT)</FormLabel>
                <Input rounded="md" type="text" placeholder='Enter the amount you need for suppport' />
              </FormControl>

              <FormControl id="image">
                <FormLabel>Campaign Banner</FormLabel>
                <Input rounded="md" type="file"  />
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
              >
                Create Campaign
              </Button>
            </VStack>
          </VStack>
        </Stack>
      </Center>
    </Container>
  );
};


export default CreateCampaign
