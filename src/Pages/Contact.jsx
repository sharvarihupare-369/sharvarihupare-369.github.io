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
  useToast,
} from "@chakra-ui/react";
import React, { useEffect, useRef, useState } from "react";
import "./Contact.css";
import AOS from "aos";
import { Link } from "@chakra-ui/react";
import { SiGooglemessages } from "react-icons/si";
import { GrMail } from "react-icons/gr";
import { FaMobileAlt } from "react-icons/fa";
import { BiPhone } from "react-icons/bi";
import { HiOutlineMail } from "react-icons/hi";
import { BsGithub, BsLinkedin } from "react-icons/bs";
import { FiPhoneCall } from "react-icons/fi";
import emailjs from '@emailjs/browser';


const Contact = () => {
  const form = useRef();
  const toast = useToast()
  const [formData, setFormData] = useState({
    to_name: '',
    from_name: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const sendEmail = (e) => {
    e.preventDefault();

    

    if (!formData.to_name || !formData.from_name || !formData.message) {
      toast({
        title: 'All fields are required',
        isClosable: true,
        status: 'warning',
        duration: 4000,
        position : 'top'
      })

      return;
    }



    emailjs.sendForm('service_b04e6tr', 'template_2rg879c', form.current, 'cxIlL7dUq_o71AlE5')
      .then((result) => {
          console.log(result.text);
          if(result){
            toast({
              title: 'Message sent successfully',
              isClosable: true,
              status: 'success',
              duration: 4000,
              position : 'top'
            })
          }

      }, (error) => {
          console.log(error.text);
          if(error){
            toast({
              title: error.text,
              isClosable: true,
              status: 'error',
              duration: 4000,
              position : 'top'
            })
          }

      });

      setFormData({
        to_name: '',
        from_name: '',
        message: ''
      })
  };
  useEffect(() => {
    AOS.init({ delay: 300 });
  }, []);


  return (
    <>
      <Box
          bg={"#18112C"}
        id="contact"
        // bg={"black"}
        color={"white"}
        className="about section"
        textAlign={"center"}
        //  h="100vh"
        pb="20px"
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
          <form ref={form} onSubmit={sendEmail}>
          <Box   mb="20px">
            
            <Input type="text" name="to_name"  value={formData.to_name} onChange={(e)=>handleChange(e)} placeholder="Name" />
          </Box>
            <Box mb="20px">
            
              <Input type="email" name="from_name" value={formData.from_name} onChange={(e)=>handleChange(e)} placeholder="Email" />
            </Box>
            <Box>
           
              <Textarea name="message" value={formData.message} onChange={(e)=>handleChange(e)} placeholder="Message"></Textarea>
            </Box>
            <Box mt="30px">
              <Link>
                <Button
                  type="submit"
                  w="100%"
                  mr="20px"
                  _hover={{
                    bgGradient: "linear(to-r, #0ef, cyan.500)",
                  }}
                  fontFaminly="cursive"
                  color="white"
                  p="10px 40px"
                  borderRadius={"5px"}
                  bgGradient="linear(to-l,#0ef, cyan.500)"
                >
                  Send
                </Button>
              </Link>
            </Box>
            </form>
            
          </Container>
          <Container>

          <Box  mt="15px" cursor={"pointer"}  bgGradient="linear(to-l,#0ef, cyan.500)"   borderRadius={'5px'} p={'10px 40px'} border={'1px outset'}>
          <Text><FiPhoneCall color="black"   style={{ margin: 'auto', fontSize: '35px' }} /></Text>
          <Text color="black" id='contact-phone'>+918007015254</Text>
        </Box>
        <Box  mt="15px" cursor={"pointer"}  bgGradient="linear(to-l,#0ef, cyan.500)" borderRadius={'5px'} p={'10px 40px'} border={'1px outset'}>
          <Text><HiOutlineMail color="black" style={{ margin: 'auto', fontSize: '45px' }} /></Text>
          <Text color="black" id='contact-email'>sharvarihupare15@gmail.com</Text>
        </Box>
          </Container>
        </Box>
        
         
        </Box>

 {/* Add grid here */}
 {/* <Grid w={'96%'} gridTemplateColumns={{base : 'repeat(1, 1fr)', sm : 'repeat(1, 1fr)', md : 'repeat(2, 1fr)', lg : 'repeat(3, 1fr)', xl : 'repeat(4, 1fr)', '2xl' : 'repeat(4, 1fr)'}} gap={'15px'} lineHeight={'30px'} textAlign={'center'} m={'auto'} justifyContent={'space-between'}> */}
        {/* <Box cursor={"pointer"} display={'grid'} placeItems={'center'} borderRadius={'5px'} p={'10px 40px'} border={'1px outset'}>
          <Link id='contact-github' href='https://github.com/sharvarihupare-369' target='_blank'><BsGithub style={{ margin: 'auto', fontSize: '35px' }} /></Link>
          <Text>Github</Text>
        </Box>
        <Box display={'grid'} cursor={"pointer"} placeItems={'center'} borderRadius={'5px'} p={'10px 40px'} border={'1px outset'}>
          <Link id='contact-linkedin' cursor={"pointer"} href='https://www.linkedin.com/in/sharvari-hupare15/' target='_blank'><BsLinkedin style={{ margin: 'auto', fontSize: '35px' }} /></Link>
          <Text>LinkedIn</Text>
        </Box> */}
        {/* <Flex flexDirection={{base:"column",sm:"column",md:"column",lg:"row",xl:"row","2xl":"row"}} alignItems={"center"}> */}

        {/* <Box w={{base:"50%",sm:"50%",md:"40%",lg:"30%",xl:"30%","2xl":"30%"}} mt="15px" cursor={"pointer"}  bgGradient="linear(to-l,#0ef, cyan.500)"   borderRadius={'5px'} p={'10px 40px'} border={'1px outset'}>
          <Text><FiPhoneCall color="black"   style={{ margin: 'auto', fontSize: '35px' }} /></Text>
          <Text color="black" id='contact-phone'>+918007015254</Text>
        </Box>
        <Box w={{base:"50%",sm:"50%",md:"40%",lg:"30%",xl:"30%","2xl":"30%"}}  mt="15px" cursor={"pointer"}  bgGradient="linear(to-l,#0ef, cyan.500)" borderRadius={'5px'} p={'10px 40px'} border={'1px outset'}>
          <Text><HiOutlineMail color="black" style={{ margin: 'auto', fontSize: '45px' }} /></Text>
          <Text color="black" id='contact-email'>sharvarihupare15@gmail.com</Text>
        </Box> */}
        {/* </Flex> */}
      {/* </Grid> */}

      </Box>
    </>
  );
};

export default Contact;
