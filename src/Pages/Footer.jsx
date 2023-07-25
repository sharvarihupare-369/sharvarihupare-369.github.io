import { Box, Flex } from '@chakra-ui/react'
import React from 'react'
import { FaGithub, FaHeart, FaLinkedin } from 'react-icons/fa'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <Flex color={'gray.300'} fontSize={'20px'} bg={'black'} p={'20px'} alignContent={'center'} justifyContent={'space-between'}>
    <Box fontWeight={'bold'}  color={'#0ef'}>{'< S/>'}</Box>
    <Box display={"flex"} alignItems={"center"}>This site is made with  <FaHeart color='red' style={{margin:"5px"}} /> by <span style={{color : '#0ef',marginLeft:"3px"}}> Sharvari Hupare !</span></Box>
     <Box>
        <Flex justifyContent={"space-between"} alignItems={"center"}>
        <Link to="https://github.com/sharvarihupare-369"  >
            <FaGithub  fontSize={"35px"}/>
        </Link>
        <Link to="https://www.linkedin.com/in/sharvari-hupare15/"  >
            <FaLinkedin style={{marginLeft:"20px"}} color='#0e76a8' fontSize={"35px"}/>
        </Link>

        </Flex>
     </Box>
 </Flex>
  )
}

export default Footer