import * as React from "react";
import {
  chakra,
  Container,
  Stack,
  HStack,
  Text,
  useColorModeValue,
  Button,
  Image,
  Skeleton,
  Box,
  Link,
  Icon,
  Modal,
  FormControl,
  FormLabel,
  Input,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
// Here we have used react-icons package for the icons
import { GoChevronRight } from "react-icons/go";
import { MdBolt } from "react-icons/md";
import { useCallback, useEffect, useMemo, useState } from "react";
import { NetworkName, PaymentMethod } from "@masa-finance/masa-sdk";
import { Masa } from "@masa-finance/masa-sdk";
import { providers } from "ethers";
import { createWalletClient, custom } from "viem";
import { mainnet, celoAlfajores, celo } from "viem/chains";
import { useNetwork } from "wagmi";
import { getAccount } from "@wagmi/core";

const Hero = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { chain } = useNetwork();
  const addresss = getAccount();

  //   const fertchNameorAddress = async() => {

  // const provider = new providers.Web3Provider(window.ethereum);
  // const signer = provider.getSigner()
  // console.log(signer._address)

  //     const [account] = await window.ethereum.request({ method: 'eth_requestAccounts' })

  //  const masa = new Masa({
  //     signer: signer,
  //     environment: "dev",
  //     networkName: 'alfajores',
  //     apiUrl: ' https://beta.middleware.masa.finance/'
  //   });
  //   const result = await masa.session.login()
  //   const isLoggedIn = await masa.session.checkLogin()

  //   if  (isLoggedIn) {
  //     const checkId = await masa.identity.load(signer._address)

  //     if(checkId.identityId) {
  //       console.log('creating soulname')
  //       const createSoulNames = await masa.soulName.create('CELO', 'nigeriaa', 1, undefined, 'style')
  //       console.log(createSoulNames)

  //      }else {
  //       console.log('No ID:: creating with ID')
  //       const createWithId = await masa.identity.createWithSoulName('CELO', 'nigeriaa', 1, 'style')
  //       console.log(createWithId)

  //      }

  //   }

  //   //  const createSoulNames = await masa.soulName.create('CELO', 'nomy', 1)
  //   //  if(createSoulNames.success == false) {
  //   //   const createWithId = await masa.identity.create()
  //   //   console.log(createWithId)
  //   //   const createSoulNames = await masa.soulName.create('CELO', 'Bobby', 1)

  //   //  }
  //   //  console.log('Created SOUL', createSoulNames)

  //   //  console.log(await masa.session.checkLogin())

  //   }

  const [soulname, setSoulname] = useState<string>("");
  const [extension, setExtension] = useState<string>();
  const [loadingIsAvailable, setLoadingIsAvailable] = useState(false);
  const [isAvailable, setIsAvailable] = useState<boolean>(true);
  const [registrationPeriod, setRegistrationPeriod] = useState<number>(1);
  const [registrationPrice, setRegistrationPrice] = useState<string>();

  const [isLoadingMint, setLoadingMint] = useState(false);
  const [showError, setShowError] = useState(false);

  return (
    <Container maxW="6xl" px={{ base: 6, md: 3 }} py={24}>
      <Stack direction={{ base: "column", md: "row" }} justifyContent="center">
        <Stack
          direction="column"
          spacing={6}
          justifyContent="center"
          maxW="480px"
        >
          <HStack
            as={Link}
            p={1}
            rounded="full"
            fontSize="sm"
            w="max-content"
            bg={useColorModeValue("gray.300", "gray.700")}
          >
            <Box
              py={1}
              px={2}
              lineHeight={1}
              rounded="full"
              color="white"
              bgGradient="linear(to-l, #0ea5e9,#2563eb)"
              _hover={{ textDecoration: "none" }}
            >
              {"Fund your dream"}
            </Box>
            <HStack spacing={1} alignItems="center" justifyContent="center">
              <Text lineHeight={1}>Projects!</Text>
              <Icon as={GoChevronRight} w={4} h={4} />
            </HStack>
          </HStack>
          <chakra.h1
            fontSize="5xl"
            lineHeight={1}
            color={"white"}
            fontWeight="bold"
            textAlign="left"
          >
            We Rise By Lifting Others <br />
            <chakra.span color="teal">at FundzVilla</chakra.span>
          </chakra.h1>
          <Text
            fontSize="1.2rem"
            textAlign="left"
            lineHeight="1.375"
            fontWeight="400"
            color="gray.500"
          >
            Create campaigns to fund your dream projects or support the cause
            you wanna fund.
          </Text>
          <HStack
            spacing={{ base: 0, sm: 2 }}
            mb={{ base: "3rem !important", sm: 0 }}
            flexWrap="wrap"
          >
            <Link href="/campaigns/create-campaign">
              <chakra.button
                w={{ base: "100%", sm: "auto" }}
                h={12}
                px={6}
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
                <chakra.span> Create Campaigns </chakra.span>
                <Icon as={MdBolt} h={4} w={4} ml={1} />
              </chakra.button>
            </Link>
            <Link href="/campaigns">
              <Box
                display="flex"
                justifyContent="center"
                bg={useColorModeValue("white", "gray.800")}
                w={{ base: "100%", sm: "auto" }}
                border="1px solid"
                borderColor="gray.300"
                p={3}
                lineHeight={1.18}
                rounded="md"
                boxShadow="md"
                _hover={{ textDecoration: "none" }}
                as={Link}
                zIndex={55555555}
              >
                Fund Projects
              </Box>
            </Link>

            {/* <Button onClick={onOpen}>Create Soulname</Button> */}
          </HStack>
        </Stack>
        <Box ml={{ base: 0, md: 5 }} pos="relative">
          <DottedBox />
          <Image
            w="100%"
            alt="Hero"
            h="100%"
            minW={{ base: "auto", md: "30rem" }}
            objectFit="cover"
            src={`hero.png`}
            rounded="md"
            fallback={<Skeleton />}
          />
        </Box>
      </Stack>
      {/* <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create SoulName</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
           
            <FormControl id="userName" isRequired>
              <FormLabel>SoulName</FormLabel>
              <Input
                placeholder="Enter Domain"
                _placeholder={{ color: 'gray.500' }}
                type="text"
                required
                onChange={(e) => {
                  setSoulname(e.target.value)
                }}
              />
            </FormControl>
            <FormControl id="userName" isRequired>
              <FormLabel>Duration</FormLabel>
              <Input
                placeholder="Enter Amount in cUSD"
                _placeholder={{ color: 'gray.500' }}
                type="text"
                required
                onChange={(e) => {
                  const num = Number(e.target.value)
                  setRegistrationPeriod(num)
                }}
              />
            </FormControl>

           
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button variant="ghost" onClick={fertchNameorAddress}>
             Donate
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal> */}
    </Container>
  );
};

function DottedBox() {
  return (
    <Box
      position="absolute"
      left="-45px"
      top="-30px"
      height="full"
      maxW="700px"
      zIndex={-1}
    >
      <svg
        color={useColorModeValue("rgba(55,65,81, 0.1)", "rgba(55,65,81, 0.7)")}
        width="350"
        height="420"
        fill="none"
      >
        <defs>
          <pattern
            id="5d0dd344-b041-4d26-bec4-8d33ea57ec9b"
            x="0"
            y="0"
            width="20"
            height="20"
            patternUnits="userSpaceOnUse"
          >
            <rect x="0" y="0" width="4" height="4" fill="currentColor"></rect>
          </pattern>
        </defs>
        <rect
          width="404"
          height="404"
          fill="url(#5d0dd344-b041-4d26-bec4-8d33ea57ec9b)"
        ></rect>
      </svg>
    </Box>
  );
}

export default Hero;
