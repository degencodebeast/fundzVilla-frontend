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
  Flex,
} from "@chakra-ui/react";
import { Masa } from "@masa-finance/masa-sdk";
import { providers } from "ethers";
import { useCallback, useEffect, useMemo, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

const Social = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [soulname, setSoulname] = useState("");
  const [duration, setDuration] = useState(1);
  const [isAvailable, setIsAvailable] = useState(true);
  const [loadingIsAvailable, setLoadingIsAvailable] = useState(false);

  useEffect(() => {
    const provider = new providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();

    const masa = new Masa({
      signer: signer,
      environment: "dev",
      networkName: "alfajores",
      apiUrl: " https://beta.middleware.masa.finance/",
    });
    const checkIsAvailable = async () => {
      if (soulname) {
        setLoadingIsAvailable(true);
        setIsAvailable(await masa.contracts.soulName.isAvailable(soulname));
        setLoadingIsAvailable(false);
      }
    };
    void checkIsAvailable();
  }, [soulname, setLoadingIsAvailable, setIsAvailable]);

  const createSoulname = async () => {
    const provider = new providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();

    const masa = new Masa({
      signer: signer,
      environment: "dev",
      networkName: "alfajores",
      apiUrl: " https://beta.middleware.masa.finance/",
    });
    const result = await masa.session.login();
    const isLoggedIn = await masa.session.checkLogin();

    if (isLoggedIn && isAvailable) {
      const checkId = await masa.identity.load(signer._address);

      if (checkId.identityId) {
        console.log("creating soulname");
        const createSoulNames = await masa.soulName.create(
          "CELO",
          soulname,
          duration,
          undefined,
          "style"
        );
        if (createSoulNames.success) {
          toast.success("Succesfully created your soulname");
        }
      } else {
        console.log("No ID:: creating with ID");
        const createWithId = await masa.identity.createWithSoulName(
          "CELO",
          soulname,
          duration,
          "style"
        );
        if (createWithId.success) {
          toast.success("Succesfully created your soulname");
        }
      }
    } else {
    }

    //  const createSoulNames = await masa.soulName.create('CELO', 'nomy', 1)
    //  if(createSoulNames.success == false) {
    //   const createWithId = await masa.identity.create()
    //   console.log(createWithId)
    //   const createSoulNames = await masa.soulName.create('CELO', 'Bobby', 1)

    //  }
    //  console.log('Created SOUL', createSoulNames)

    //  console.log(await masa.session.checkLogin())
  };
  return (
    <>
      <Toaster />
      <Flex
        bg="##0F0F0F"
        _dark={{
          bg: "#0F0F0F",
        }}
        p={50}
        w="full"
        alignItems="center"
        justifyContent="center"
      >
        <Flex
          justify="center"
          bg="white"
          _dark={{
            bg: "gray.900",
          }}
          w="full"
        >
          <Box
            w={{
              base: "full",
              md: "75%",
              lg: "50%",
            }}
            px={4}
            py={20}
            textAlign={{
              base: "left",
              md: "center",
            }}
          >
            <chakra.span
              fontSize={{
                base: "xl",
                sm: "2xl",
              }}
              fontWeight="extrabold"
              letterSpacing="tight"
              lineHeight="shorter"
              color="gray.900"
              _dark={{
                color: "gray.100",
              }}
              mb={6}
            >
              <chakra.span display="block">
                Wanna embrace the power of soulnames and web3 identity?
              </chakra.span>
              <chakra.span
                display="block"
                color="brand.600"
                _dark={{
                  color: "gray.500",
                }}
              >
                Create your soulnames domain on the Celo Network.
              </chakra.span>
            </chakra.span>
            <Stack
              justifyContent={{
                base: "left",
                md: "center",
              }}
              direction={{
                base: "column",
                sm: "row",
              }}
              spacing={2}
              mt={2}
            >
              <Box
                display="inline-flex"
                rounded="md"
                shadow="md"
                onClick={onOpen}
              >
                <Link
                  w="full"
                  display="inline-flex"
                  alignItems="center"
                  justifyContent="center"
                  px={5}
                  py={3}
                  fontWeight="bold"
                  rounded="md"
                  bgGradient="linear(to-l, #0ea5e9,#2563eb)"
                  _hover={{
                    bgGradient: "linear(to-l, #0ea5e9,#2563eb)",
                    opacity: 0.9,
                  }}
                >
                  Create Soulname
                </Link>
              </Box>
              <Box ml={3} display="inline-flex" rounded="md" shadow="md">
                <Link
                  w="full"
                  display="inline-flex"
                  alignItems="center"
                  justifyContent="center"
                  px={5}
                  py={3}
                  border="solid transparent"
                  fontWeight="bold"
                  rounded="md"
                  color="brand.600"
                  bg="gray.600"
                  _hover={{
                    bg: "brand.50",
                  }}
                >
                  Use Social Connect
                </Link>
              </Box>
            </Stack>
            <Text mt={2}>Powered by Masa Finance and Celos Social connect</Text>
          </Box>
        </Flex>
      </Flex>
      <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create SoulName (.CELO)</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl id="userName" isRequired>
              <FormLabel>SoulName</FormLabel>
              <Input
                placeholder="John"
                _placeholder={{ color: "gray.500" }}
                type="text"
                required
                onChange={(e) => {
                  setSoulname(e.target.value);
                }}
              />
            </FormControl>
            {loadingIsAvailable && (
              <>
                <Text mt={2}>Checking..</Text>
              </>
            )}
            {isAvailable ? (
              <Text mt={2} color={"green.500"}>
                Available
              </Text>
            ) : (
              <Text mt={2} color={"red.400"}>
                Not Available
              </Text>
            )}
            <FormControl mt={3} isRequired>
              <FormLabel>Duration</FormLabel>
              <Input
                placeholder="Enter registration period"
                _placeholder={{ color: "gray.500" }}
                type="text"
                required
                onChange={(e) => {
                  const num = Number(e.target.value);
                  setDuration(num);
                }}
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button variant="ghost" onClick={createSoulname}>
              Create Soulname
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
export default Social;
