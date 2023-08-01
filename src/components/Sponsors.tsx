import { SVGProps } from "react";
import {
  Container,
  Box,
  chakra,
  Text,
  SimpleGrid,
  Flex,
  Link,
  useColorModeValue,
  Avatar,
  AvatarBadge,
} from "@chakra-ui/react";

interface ISponsor {
  heading: string;
  content: string;
  link: string;
  logo: string;
}

const sponsors: ISponsor[] = [
  {
    heading: "Celo Developers",
    content: "Devs",
    link: 'https://discord.com/invite/atBpDfqQqX',
    logo: '/celo.png',

  },
  {
    heading: "SuperFluid",
    content: "Money Streaming.",
    link: 'https://app.superfluid.finance/',
    logo: '/super.png',

   
  },
  {
    heading: "Masa Finance",
    content: "Soul names.",
    link: 'https://developers.masa.finance/',
    logo: '/masa.png',
   
  },
];

const Sponsors = () => {
  return (
    <Container color={"white"} maxW="6xl" p={{ base: 5, md: 10 }}>
      <chakra.h3 fontSize="4xl" fontWeight="bold" mb={20} textAlign="center">
        Meet Our Sponsors
      </chakra.h3>
      <SimpleGrid
        columns={{ base: 1, sm: 2, md: 3 }}
        placeItems="center"
        spacing={10}
        mb={4}
      >
        {sponsors.map((sponsor, index) => (
          <Box
            key={index}
            // bg={useColorModeValue('gray.100', 'gray.700')}
            p={6}
            rounded="lg"
            textAlign="center"
            pos="relative"
          >
            <Flex
              p={2}
              w="max-content"
              color="white"
              bgGradient="linear(to-br, #228be6, #15aabf)"
              rounded="md"
              marginInline="auto"
              pos="absolute"
              left={0}
              right={0}
              top="-1.5rem"
              boxShadow="lg"
            >
              <Avatar size="sm" name="Icon" src={sponsor.logo}>    </Avatar>
            </Flex>
            <chakra.h3 fontWeight="semibold" fontSize="2xl" mt={6}>
              {sponsor.heading}
            </chakra.h3>
            <Text fontSize="md" mt={4}>
              {sponsor.content}
            </Text>
            <Link target="_blank" href={sponsor.link} mt={4} fontSize="sm" color="blue.400">
              Learn more →
            </Link>
          </Box>
        ))}
      </SimpleGrid>
    </Container>
  );
};

export default Sponsors;
