import {
  Box,
  Container,
  Heading,
  Text,
  Flex,
  Image,
  Center,
  Link,
  Button
} from "@chakra-ui/react";
import React, {useEffect} from "react";
import myimage from "../Assets/Mypic.jpg";
// import 'animate.css';
// import "../components/Button.css";
import AOS from "aos";
import "aos/dist/aos.css";
import resume from '../Assets/Resume/Sharvari-Hupare-Resume.pdf'

const Home = () => {
  useEffect(()=>{
    AOS.init({delay:300});
  },[])
  return (
    <>
      {/* // <Box bg={"#360148"}  color={"white"} bgGradient='linear(to-br,rgb(54 0 72),rgb(65 2 87),rgb(87 1 117),rgb(115 0 146),rgb(123 0 152))'  height={"100vh"}> */}
      <Flex
        bg={"black"}
        color={"white"}
        // minH={"100vh"}
        justifyContent={"space-around"}
        alignItems={"center"}
        id="home"
        
       
  
      >
        {/* <Flex justifyContent={"space-between"}> */}
        <Box
        
       
        >
          <Heading as="h4" size={"md"} className="head" >
            Hello 👋 I'M
          </Heading>

          <Flex data-aos="zoom-out"  id="user-detail-name">
            <Heading
              mt="20px"
              // bgGradient="linear(to-l, #7928CA, #FF0080)"
              // bgGradient="linear(to-l, #636363, #a2ab58)"
              // bgGradient="linear(to-l, #3E5151, #DECBA4)"
              bgGradient="linear(to-r, #76446b, #A8CABA)"
              // bgGradient="linear(to-r, #e9d362, #333333)"
              // bgGradient="linear(to-br, #403B4A, #E7E9BB)"
              // bgGradient="linear(to-l, #556270, #FF6B6B)"
              bgClip="text"
              as={"h1"}
              size={"4xl"}
            >
              Sharvari
            </Heading>

            <Heading
              ml="20px"
              mt="20px"
              bgGradient="linear(to-r, #76446b, #A8CABA)"
              bgClip="text"
              as={"h1"}
              size={"4xl"}
            >
              Hupare
            </Heading>
          </Flex>
          <Heading as={"h2"} size={"xl"} mt="40px" className="head">
            Full Stack Web Developer
          </Heading>
        <Box mt="40px" >

          <Link  
            href={resume} download={true}>
              <Button  id="resume-button-2"  mr="20px"
            _hover={{
              bgGradient: "linear(to-r,#3fada8, purple.500)",
            }} color="white" p="10px 40px" borderRadius={"5px"} bgGradient="linear(to-l,#304352, #3fada8)" >
              Resume 
              </Button>

              </Link>
                </Box>

        </Box>
        <Box  mt="40px">
    <Image src={myimage} className="home-img"  boxShadow='outline' borderColor={"#76446b"}  alt="myPic" style={{width:"500px" , borderRadius:"50%"}} />
    </Box>
    
      </Flex>
    </>
  );
};

export default Home;
