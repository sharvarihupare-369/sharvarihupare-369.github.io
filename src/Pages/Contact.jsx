import {
  Box,
  Heading,
  Button,
  Image,
  Flex,
  Text,
  Input,
  FormLabel,
  Textarea,
  Container,
  Grid,
} from "@chakra-ui/react";
import React, { useEffect } from "react";
import "./Contact.css";
import AOS from "aos";
import { Link } from "@chakra-ui/react";
import { SiGooglemessages } from "react-icons/si";
import { GrMail } from "react-icons/gr";
import { FaMobileAlt } from "react-icons/fa";
import { BiPhone } from "react-icons/bi";
import { HiOutlineMail } from "react-icons/hi";
import { BsGithub, BsLinkedin } from "react-icons/bs";

const Contact = () => {
  useEffect(() => {
    AOS.init({ delay: 300 });
  }, []);
  return (
    <>
      <Box
        
        id="contact"
        bg={"black"}
        color={"white"}
        className="about section"
        textAlign={"center"}
      >
        <Heading
          className="contact-heading"
          mt="40px"
          display={"inline-block"}
          padding="10px"
          color={"#0ef"}
          fontFamily={"cursive"}
          mb="45px"
          as={"h1"}
          size={"2xl"}
         
        >
          Contact
        </Heading>
        <Box>
         
        <Box p="20px" m="20px">
          <Container>
            <Box mb="20px">
            
              <Input type="email" placeholder="Enter your email" />
            </Box>
            <Box>
           
              <Textarea placeholder="Write your message here..."></Textarea>
            </Box>
            <Box mt="30px">
              <Link>
                <Button
                  w="100%"
                  mr="20px"
                  _hover={{
                    bgGradient: "linear(to-r, #0ef, cyan.500)",
                  }}
                  color="white"
                  p="10px 40px"
                  borderRadius={"5px"}
                  bgGradient="linear(to-l,#0ef, cyan.500)"
                >
                  Contact Me
                </Button>
              </Link>
            </Box>
          </Container>
        </Box>
        
         
        </Box>

 {/* Add grid here */}
 <Grid w={'96%'} gridTemplateColumns={{base : 'repeat(1, 1fr)', sm : 'repeat(1, 1fr)', md : 'repeat(2, 1fr)', lg : 'repeat(3, 1fr)', xl : 'repeat(4, 1fr)', '2xl' : 'repeat(4, 1fr)'}} gap={'15px'} lineHeight={'30px'} textAlign={'center'} m={'auto'} justifyContent={'space-between'}>
        <Box cursor={"pointer"} display={'grid'} placeItems={'center'} borderRadius={'5px'} p={'10px 40px'} border={'1px outset'}>
          <Link id='contact-github' href='https://github.com/sharvarihupare-369' target='_blank'><BsGithub style={{ margin: 'auto', fontSize: '35px' }} /></Link>
          <Text>Github</Text>
        </Box>
        <Box display={'grid'} cursor={"pointer"} placeItems={'center'} borderRadius={'5px'} p={'10px 40px'} border={'1px outset'}>
          <Link id='contact-linkedin' cursor={"pointer"} href='https://www.linkedin.com/in/sharvari-hupare15/' target='_blank'><BsLinkedin style={{ margin: 'auto', fontSize: '35px' }} /></Link>
          <Text>LinkedIn</Text>
        </Box>
        <Box cursor={"pointer"} display={'grid'} placeItems={'center'} borderRadius={'5px'} p={'10px 40px'} border={'1px outset'}>
          <Text><FaMobileAlt style={{ margin: 'auto', fontSize: '35px' }} /></Text>
          <Text id='contact-phone'>+918007015254</Text>
        </Box>
        <Box cursor={"pointer"} borderRadius={'5px'} p={'10px 40px'} border={'1px outset'}>
          <Text><HiOutlineMail style={{ margin: 'auto', fontSize: '45px' }} /></Text>
          <Text id='contact-email'>sharvarihupare15@gmail.com</Text>
        </Box>
      </Grid>

      </Box>
    </>
  );
};

export default Contact;
