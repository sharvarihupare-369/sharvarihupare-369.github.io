import { Box, Button, Link, Flex, Divider } from '@chakra-ui/react'
import React, { useEffect } from 'react';
import { useColorMode, useColorModeValue, IconButton, useDisclosure, VStack, HStack } from '@chakra-ui/react';
import { FaMoon, FaSun } from 'react-icons/fa';
// import { Link } from 'react-router-dom';
import { BiMenu, BiMenuAltLeft } from 'react-icons/bi';
import {
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
} from '@chakra-ui/react'
import { HashLink } from 'react-router-hash-link';
import resume from '../Assets/Resume/Sharvari-Hupare-Resume.pdf'
// import './Button.css';
import 'animate.css';
import AOS from 'aos';
import './navbar.css'

const Navbar = () => {
    const { onClose, onOpen, isOpen } = useDisclosure();

    useEffect(() => {
        AOS.init({ delay: 300 });
    }, [])

    const openResume = (url) => {
       window.open(url)
    }

    return (
        <Box  bg="#171518" boxShadow='rgba(0, 0, 0, 0.24) 0px 3px 8px' position="sticky" zIndex={"overlay"} top='0' className={'bg'} color={'white'} p={'12px 0'} fontSize={'19px'}>
            <nav id='nav-menu' className='nav-menu'>
                <Flex m='0 30px' p={'10px'} alignItems={'center'} justifyContent={'space-between'}>
                    <Box color={'#0ef'} fontWeight={'extrabold'} className='nav-logo' fontSize='30px' textAlign='start' w={'20%'}>
                        {'< S/>'}
                    </Box>
                    <Flex p={'10px'} justifyContent={'space-between'} mt={'10px'} alignItems={'center'}>
                        <Box
                            display={{ base: 'flex', sm: 'flex', md: 'flex', lg: 'none', xl: 'none', '2xl': 'none' }}
                            w={'10'}
                            h={'10'}
                            fontSize={'30px'}
                            size={'20px'}
                            onClick={onOpen}
                        >
                            <BiMenu />
                        </Box>
                        <Drawer isOpen={isOpen} onClose={onClose} placement='right'>
                            <DrawerOverlay />
                            <DrawerContent>
                                <DrawerCloseButton color={'white'} border={'1px solid #171518'} />
                                <DrawerHeader fontFamily={'cursive'} color={'#0ef'}  fontWeight={'extrabold'} bg='#171518'>{'< S/>'}</DrawerHeader >
                                <DrawerBody fontFamily={'cursive'} color={'white'} bg='#171518'>
                                    <VStack alignItems={'start'}>
                                        <Button onClick={onClose} variant={'ghost'} colorScheme='gray'>
                                            <HashLink data-aos="zoom-in" className='nav-link home' style={{ textDecoration: "none" }} to='/#'>Home</HashLink>
                                        </Button>
                                        <Button onClick={onClose} variant={'ghost'} colorScheme='gray'>
                                            <HashLink className='nav-link about' style={{ textDecoration: "none" }} to='/#about'>About</HashLink>
                                        </Button>
                                        <Button onClick={onClose} variant={'ghost'} colorScheme='gray'>
                                            <HashLink className='nav-link skills' style={{ textDecoration: "none" }} to='/#skills'>Skills</HashLink>
                                        </Button>
                                        <Button onClick={onClose} variant={'ghost'} colorScheme='gray'>
                                            <HashLink className='nav-link projects' style={{ textDecoration: "none" }} to='/#projects'>Projects</HashLink>
                                        </Button>
                                        <Button onClick={onClose} variant={'ghost'} colorScheme='gray'>
                                            <HashLink className='nav-link contact' style={{ textDecoration: "none" }} to='/#contact'>Contact</HashLink>
                                        </Button>
                                    </VStack>
                                    <HStack w={'full'} justifyContent={'space-evenly'} pos={'absolute'} bottom={'5'} left={'0'}>
                                        <Link fontWeight={'bold'} borderRadius={'5px'} backgroundImage={'linear-gradient(to right, #0ef, cyan.500)'} fontFamily={'cursive'} className='nav-link resume' id='resume-button-1' href={resume} onClick={openResume} download={true} target='_blank'>
                                        <Button onClick={()=>openResume("https://drive.google.com/file/d/1GbXolYZQXqui6TrjEGGCRUR-jEUkqVSg/view?usp=sharing")} backgroundImage={'linear-gradient(to right, #0ef, cyan.500)'} _hover={'none'}>
                                               Resume
                                      </Button>
                                        </Link>
                                    </HStack>
                                </DrawerBody>
                            </DrawerContent>
                        </Drawer>
                    </Flex>
                    <Flex w={'55%'} id="navflex" alignItems={'center'} justifyContent={'space-between'} display={{ base: 'none', sm: 'none', md: 'none', lg: 'flex', xl: 'flex', '2xl': 'flex' }}>
                        <HashLink  className='nav-link home' id="navbar-home" smooth to='/#'>Home</HashLink>
                        <HashLink className='nav-link about' id="navbar-home" smooth  to='/#about'>About</HashLink>
                        <HashLink className='nav-link skills' id="navbar-home" smooth to='/#skills'>Skills</HashLink>
                        <HashLink className='nav-link projects' id="navbar-home" smooth  to='/#projects'>Projects</HashLink>
                       
                        <HashLink className='nav-link contact' id="navbar-home" smooth  to='/#contact'>Contact</HashLink>
                        <Link fontWeight={'bold'} borderRadius={'5px'} backgroundImage={'linear-gradient(to right, #0ef, cyan.50)'} fontFamily={'cursive'} className='nav-link resume' id='resume-button-1' href={resume} download={true} target='_blank'>
                            <Button onClick={()=>openResume("https://drive.google.com/file/d/1GbXolYZQXqui6TrjEGGCRUR-jEUkqVSg/view?usp=sharing")} backgroundImage={'linear-gradient(to right, #0ef, cyan.500)'} _hover={'none'}>
                                Resume
                            </Button>
                        </Link>
                    </Flex>
                </Flex>
            </nav>
        </Box>
    )
}

export default Navbar