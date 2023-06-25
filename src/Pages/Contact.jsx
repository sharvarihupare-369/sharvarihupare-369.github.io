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
          bgGradient="linear(to-r, #1a9a7c, #5c0c5c)"
          borderRadius={"8px"}
          // data-aos="flip-right"
          // ml="80px"
          mb="45px"
          as={"h2"}
          size={"xl"}
        >
          Contact
        </Heading>
        <Box>
          {/* <Flex justifyContent={"center"} >
        <Link href='https://github.com/sharvarihupare-369' id="contact-github" >
          <BsGithub fontSize={"40px"} />
          </Link> 


        <Link href='https://www.linkedin.com/in/sharvari-hupare15/' id="contact-linkedin" > 
          <BsLinkedin fontSize={"40px"} style={{marginLeft:"10px"}}  />
         </Link>
       </Flex>
        </Box>

        <Flex alignItems={"center"} justifyContent={"space-around"}> */}

          {/* <Box w="50%" m="20px" border="1px solid red"> */}
          {/* <Flex p="20px" m="20px auto"  alignItems={"center"}> */}
          {/* <span  >  */}
          {/* <Flex id="contact-phone">

          <BiPhone fontSize={"30px"}/>
          <Text ml="10px">(+91) 8007015254</Text>
        </Flex> */}
          {/* </span> */}
          {/* </Flex> */}
          {/* </Box> */}

          {/* <span id="contact-email" >  */}
          {/* <Flex id="contact-email"  p="20px" m="20px auto"  alignItems={"center"}> */}
          {/* <SiGooglemessages fontSize={"60px"} /> */}
          {/* <GrMail fontSize={"30px"} />
          <Text ml="10px">sharvarihupare15@gmail.com</Text>
          </Flex>  */}
          {/* </span> */}
          {/* </Flex> */}

          {/* 
        <Box>
          <form>
            <Box>
              <Flex alignItems={"center"} justifyContent={"center"}>

              <FormLabel>Email</FormLabel>
              <Input w="40%" type='email'/>
              </Flex>
            </Box>
            <Box mt="20px">
              <Flex alignItems={"center"} justifyContent={"center"}>

              <FormLabel>Message</FormLabel> */}
          {/* <Input w="40%" type='email'/> */}
          {/* <Textarea w="40%" />
              </Flex>
            </Box>
            <Button type="submit">Contact</Button>
          </form>
        </Box>
        </Box> */}

          <Flex
            gap={"15px"}
            lineHeight={"30px"}
            textAlign={"center"}
            w={"85%"}
            m={"auto"}
            justifyContent={"space-between"}
          >
            <Box
              display={"grid"}
              placeItems={"center"}
              w={"24%"}
              borderRadius={"5px"}
              p={"10px 40px"}
              border={"1px outset"}
            >
              <Link
                id="contact-github"
                href="https://github.com/sharvarihupare-369"
              >
                <BsGithub style={{ margin: "auto", fontSize: "35px" }} />
              </Link>
              <Text>Github</Text>
            </Box>
            <Box
              display={"grid"}
              placeItems={"center"}
              w={"24%"}
              borderRadius={"5px"}
              p={"10px 40px"}
              border={"1px outset"}
            >
              <Link
                id="contact-linkedin"
                href="https://www.linkedin.com/in/sharvari-hupare15/"
              >
                <BsLinkedin style={{ margin: "auto", fontSize: "35px" ,color:"#0e76a8"}} />
              </Link>
              <Text>LinkedIn</Text>
            </Box>
            <Box
              display={"grid"}
              placeItems={"center"}
              w={"26%"}
              borderRadius={"5px"}
              p={"10px 40px"}
              border={"1px outset"}
            >
              <Text>
                <FaMobileAlt style={{ margin: "auto", fontSize: "35px" }} />
              </Text>
              <Text id="contact-phone">+918007015254</Text>
            </Box>
            <Box
              w={"30%"}
              borderRadius={"5px"}
              p={"10px 40px"}
              border={"1px outset"}
            >
              <Text>
                <HiOutlineMail style={{ margin: "auto", fontSize: "45px" ,color:"#c71610" }} />
              </Text>
              <Text id="contact-email">sharvarihupare15@gmail.com</Text>
            </Box>
          </Flex>
        </Box>

        <Box p="20px" m="20px">
          <Container>
            <Box>
              <FormLabel>Email</FormLabel>
              <Input />
            </Box>
            <Box>
              <FormLabel>Message</FormLabel>
              <Textarea></Textarea>
            </Box>
            <Box mt="40px">
              <Link>
                <Button
              
                  mr="20px"
                  _hover={{
                    bgGradient: "linear(to-r,#3fada8, purple.500)",
                  }}
                  color="white"
                  p="10px 40px"
                  borderRadius={"5px"}
                  bgGradient="linear(to-l,#304352, #3fada8)"
                >
                  Contact Me
                </Button>
              </Link>
            </Box>
          </Container>
        </Box>

        {/* <Box bg={"#162a33"}
    color={"white"}
    minH={"100vh"}
    justifyContent={"space-around"}
    alignItems={"center"}>
       <section>
        <nav>
            <a href="">
                <svg viewBox="0 0 126.22 246"><path d="M173.6,27h35.92V70.19h-29.7c-15,2.39-14,19.79-14,19.79v29.33h47.27l-7.05,47.52H166.33V273H119.19V166.09H86.89V119.31h32.3V87.74A68.5,68.5,0,0,1,127,55.49c5.27-9.87,14-20.18,28.41-25.47A53,53,0,0,1,173.6,27Z" transform="translate(-86.89 -27)"/></svg> 
            </a>
            <a href="" class="active">
                <svg viewBox="0 0 245.97 198.8"><path d="M44.28,59.23S89.07,113,147.62,111C140.12,86,172.14,21.7,234,65.49c0,0,24.77-5.26,32.28-12.51,0,0-3.5,14.76-20.77,27.52,0,0-1.25,2.5,27.53-6.76,0,0-12.27,16.77-25.28,26,0,0,7.18,101-91.91,141,0,0-60.72,26.69-128.79-14,0,0,40.71,6.67,74.4-20.69,0,0-38.36-3.67-46.37-35.36,0,0,13.35,3.67,22-1,0,0-36-4-39.7-49.71,0,0,17,7.33,22.35,6.33C59.71,126.37,23.85,104.52,44.28,59.23Z" transform="translate(-27.01 -50.6)"/></svg>
            </a>
            <a href="https://www.linkedin.com/in/sharvari-hupare15/">
                <svg viewBox="0 0 244.65 226.28"><path d="M35.73,81.63a24.22,24.22,0,0,1-8-18.5,24.59,24.59,0,0,1,8-18.79q8.06-7.47,20.76-7.48,12.43,0,20.48,7.48a24.59,24.59,0,0,1,8,18.79,24.22,24.22,0,0,1-8,18.5q-8,7.5-20.48,7.49Q43.79,89.12,35.73,81.63ZM80.5,105.51V263.14H32.2V105.51Z" transform="translate(-27.68 -36.86)"/><path d="M255.8,121.75q16.51,17.94,16.52,49.3v92.09h-48v-85.6q0-15.81-8.19-24.57t-22-8.76q-13.84,0-22,8.76t-8.2,24.57v85.6H115.53V105.51h48.31v20.9a51.15,51.15,0,0,1,19.78-16.53,63,63,0,0,1,28-6.07Q239.27,103.81,255.8,121.75Z" transform="translate(-27.68 -36.86)"/></svg>
            </a>
            <a href="">
                <svg viewBox="0 0 246.15 246.15"><path d="M201,51.5A47.49,47.49,0,0,1,248.41,99V200.88A47.49,47.49,0,0,1,201,248.32H99a47.49,47.49,0,0,1-47.44-47.44V99A47.49,47.49,0,0,1,99,51.5H201m0-24.66H99A72.11,72.11,0,0,0,26.92,99V200.88A72.12,72.12,0,0,0,99,273H201a72.12,72.12,0,0,0,72.11-72.11V99A72.11,72.11,0,0,0,201,26.84Z" transform="translate(-26.92 -26.84)"/><path class="cls-1" d="M150,124.34a25.57,25.57,0,1,1-25.57,25.57A25.6,25.6,0,0,1,150,124.34m0-24.66a50.24,50.24,0,1,0,50.23,50.23A50.23,50.23,0,0,0,150,99.68Z" transform="translate(-26.92 -26.84)"/><circle class="cls-1" cx="189.98" cy="55.33" r="13.81"/></svg>
            </a>
        </nav>
    </section>
    </Box> */}
      </Box>
    </>
  );
};

export default Contact;
