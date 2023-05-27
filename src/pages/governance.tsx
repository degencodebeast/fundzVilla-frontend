import { Inter } from 'next/font/google'
import { Features, Footer, Hero, Navbar, Sponsors } from '@/components'
import { Image, Badge, Box, Button, Center, Text, Checkbox, Container, FormControl, FormLabel, Heading, Input, InputGroup, InputRightElement, Link, SimpleGrid, Stack, VStack, useColorModeValue, Icon, chakra } from '@chakra-ui/react'
import { useState } from 'react'
import { MdBolt } from 'react-icons/md';
const dataList = [
    {
      id: 1,
      title: 'Buy Me This House',
      authorName: '0x1c5...e5957',
      content: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.`,
      isVerified: false,
      target: 500,
    },
    {
        id: 2,
        title: 'Buy Me This House',
        authorName: '0x1c5...e5957',
        content: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.`,
        isVerified: true,
        target: 553,
      },
      {
        id: 3,
        title: 'Buy Me This House',
        authorName: '0x1c5...e5957',
        content: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.`,
        isVerified: false,
        target: 400,
      },
    
    
  ];

function Campaigns() {
  return (
    <>
    
    <Navbar/>
    <main
      className={`main-color flex min-h-screen flex-col items-center justify-between p-24 `}
    >
        <Text fontWeight={20} fontSize={27} > VOTE ON CAMPAIGNS AUTHENTICITY</Text>
        <Text
                      mt="1"
                      fontWeight="semibold"
                      noOfLines={3}
                      lineHeight="tight"
                      color="gray.600"
                      fontSize="sm"
                    >
                     NB: You have to be a FundzVilla DAO member to Vote on Campaigns
                     <br />
                     <Center>
                     <chakra.button
              w={{ base: '100%', sm: 'auto' }}
              textAlign={'center'}
            
              h={12}
              px={6}
              mt={5}
              color="white"
              rounded="md"
              mb={{ base: 2, sm: 0 }}
              zIndex={5}
              lineHeight={1}
              bgGradient="linear(to-l, #0ea5e9,#2563eb)"
              _hover={{ bgGradient: 'linear(to-l, #0ea5e9,#2563eb)', opacity: 0.9 }}
            >
           <chakra.span> Join FundzVilla DAO </chakra.span>
            
            </chakra.button>
                     </Center>
                    
                    </Text>
        <div>
        <Container maxWidth="1200px" mx="auto" my="auto" p={{ base: 5, md: 10 }}>
      <SimpleGrid columns={[1, 2, 3]} spacing="20px">
        {dataList.map((blog) => {
          return (
            <>
            {!blog.isVerified ? (

                   <Box position="relative" key={blog.id} >
              <Box fontSize="sm" position="absolute" right="5px" margin="5px" zIndex="1">
                 {blog.isVerified ? <Badge rounded="full" p="2px 8px" colorScheme="green" backgroundColor={'green.600'}>
                  Verified
                </Badge> :  <Badge rounded="full" p="2px 8px" colorScheme="red" backgroundColor={'yellow.600'}>
                  Not Verified
                </Badge>}
               
               
                

              </Box>
            
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
                      <Text mt={1} color="white.200" ml={1}><strong>{blog.target} USDT</strong> </Text>
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
                    <Text
                      mt="1"
                      fontWeight="semibold"
                      noOfLines={3}
                      lineHeight="tight"
                      color="gray.600"
                      fontSize="sm"
                    >
                      Relevant Links
                    </Text>
                  </Box>
                  <chakra.button
              w={{ base: '50%', sm: 'auto' }}
              h={9}
              px={6}
              ml={5}

              color="white"
              rounded="md"
             mb={4}
              zIndex={5}
              lineHeight={1}
              bgGradient="linear(to-l, #0ea5e9,#2563eb)"
              _hover={{ bgGradient: 'linear(to-l, #0ea5e9,#2563eb)', opacity: 0.9 }}
            >
           <chakra.span> Vote For </chakra.span>
             
            </chakra.button> 
            <chakra.button
              w={{ base: '50%', sm: 'auto' }}
              h={9}
              px={6}
              ml={5}

              color="white"
              rounded="md"
             mb={4}
              zIndex={5}
              lineHeight={1}
              bgGradient="linear(to-l, #AA4A44,#FF0000)"
              _hover={{ bgGradient: 'linear(to-l, #0ea5e9,#FF0000)', opacity: 0.9 }}
            >
           <chakra.span> Vote Against </chakra.span>
             
            </chakra.button>
                </Box>
                
             
              
            </Box>
            ): ''}
         </>
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
