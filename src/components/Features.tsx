import { Container, Box, chakra, Text, Icon, SimpleGrid } from '@chakra-ui/react';
// Here we have used react-icons package for the icons
import { MdOutlinePersonPin, MdPermDeviceInformation, MdOutlineFlashlightOn } from 'react-icons/md';
import { SiMinds } from 'react-icons/si';
import { IconType } from 'react-icons';

interface IFeature {
  heading: string;
  content: string;
  icon: IconType;
}

const features: IFeature[] = [
  {
    heading: 'Campaigns',
    content:
      'Create Campaigns so your projects/causes could get Funded by the community.',
    icon: MdOutlineFlashlightOn
  },
  {
    heading: 'DAO',
    content: `FundzVilla DAO members get to vote on the authenticity of posted campaigns.`,
    icon: SiMinds
  },
  {
    heading: 'Funding',
    content:
      'Campaigns get Funded by the community donors and investors.',
    icon: MdPermDeviceInformation
  },
  {
    heading: 'Community',
    content: `FundzVilla Community welcomes individuals arround the world anywhere, anytime to join the platform to get supported/vote on existing campaigns.`,
    icon: MdOutlinePersonPin
  }
];

const Features = () => {
  return (
    <Container maxW="6xl" p={{ base: 5, md: 10 }}>
      <chakra.h3 fontSize="4xl" fontWeight="bold" mb={3} textAlign="center">
        Features
      </chakra.h3>
      <SimpleGrid columns={{ base: 1, md: 2 }} placeItems="center" spacing={16} mt={12} mb={4}>
        {features.map((feature, index) => (
          <Box key={index} textAlign="center">
            <Icon as={feature.icon} w={10} h={10} color="blue.400" />
            <chakra.h3 fontWeight="semibold" fontSize="2xl">
              {feature.heading}
            </chakra.h3>
            <Text fontSize="md">{feature.content}</Text>
          </Box>
        ))}
      </SimpleGrid>
    </Container>
  );
};

export default Features;