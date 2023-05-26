import {
    Box,
    Flex,
    HStack,
    Button,
    Text,
    Link,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    Stack,
    Image,
    Icon,
    IconButton,
    useDisclosure,
    useColorModeValue
  } from '@chakra-ui/react';
  // Here we have used react-icons package for the icons
  import { GiHamburgerMenu } from 'react-icons/gi';
  import { AiOutlineClose } from 'react-icons/ai';
  import { BiChevronDown } from 'react-icons/bi';
  import { RiFlashlightFill } from 'react-icons/ri';
  
  const navLinks = [
    { name: 'Governance', path: '#' },
    { name: 'Campaign', path: '#' },
    { name: 'Community', path: '#' },
  ];
  
  const dropdownLinks = [
    {
      name: 'Blog',
      path: '#'
    },
    {
      name: 'Documentation',
      path: '#'
    },
    {
      name: 'Github Repo',
      path: '#'
    }
  ];
  
  
  export default function Navbar() {
    const { isOpen, onOpen, onClose } = useDisclosure();
  
    return (
      <Box className='relative bg-black shadow-2xl pb-5 ' px={4} >
        <Flex h={16} alignItems="center" justifyContent="space-between" mx="auto">
        
        <Box mt={5}><Image boxSize='160px' src='main.svg' alt='Logo' /> </Box>
        
      
          <HStack spacing={8} alignItems="center">
            <HStack as="nav" spacing={9} display={{ base: 'none', md: 'flex' }} alignItems="center" mt={5}>
              {navLinks.map((link, index) => (
                <NavLink key={index} {...link} onClose={onClose} />
              ))}
  
            
            </HStack>
          </HStack>
  
          <Button   bgGradient="linear(to-l, #0ea5e9,#2563eb)"  size="md" rounded="md" mt={6} display={{ base: 'none', md: 'block' }}>
            connect Wallet
          </Button>
          <IconButton
            size="md"
            icon={isOpen ? <AiOutlineClose /> : <GiHamburgerMenu />}
            aria-label="Open Menu"
            display={{ base: 'inherit', md: 'none' }}
            onClick={isOpen ? onClose : onOpen}
          />
        </Flex>
  
        {/* Mobile Screen Links */}
        {isOpen ? (
            <>
             
          <Box pb={4} display={{ base: 'inherit', md: 'none' }}>

            <Stack as="nav" spacing={2}>
              {navLinks.map((link, index) => (
                <NavLink key={index} {...link} onClose={onClose} />
              ))}
              
             
            </Stack>
          
          </Box>
          <Button   bgGradient="linear(to-l, #0ea5e9,#2563eb)"  size="md" rounded="md" mt={6} display={{ base: 'none', md: 'block' }}>
            connect Wallet
          </Button>
            </>
           
        ) : null}
      </Box>
    );
  }
  
  // NavLink Component
  interface NavLinkProps {
    name: string;
    path: string;
    onClose: () => void;
  }
  
  const NavLink = ({ name, path, onClose }: NavLinkProps) => {
    return (
      <Link
        href={path}
        lineHeight="inherit"
        _hover={{
          textDecoration: 'none',
          color: useColorModeValue('blue.500', 'blue.200')
        }}
        onClick={() => onClose()}
      >
        {name}
      </Link>
    );
  };
  
  // Dropdown MenuLink Component
  interface MenuLinkProps {
    name: string;
    path: string;
    onClose: () => void;
  }
  
  const MenuLink = ({ name, path, onClose }: MenuLinkProps) => {
    return (
      <Link href={path} onClick={() => onClose()}>
        <MenuItem _hover={{ color: 'blue.400', bg: useColorModeValue('gray.200', 'gray.700') }}>
          <Text>{name}</Text>
        </MenuItem>
      </Link>
    );
  };