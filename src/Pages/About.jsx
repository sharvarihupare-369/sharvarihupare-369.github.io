import { Box, Flex, Heading, Text, Image, Container, Button } from "@chakra-ui/react";
import React, { useEffect } from "react";
import AOS from "aos";
import { Link } from "react-router-dom";
import resume from '../Assets/Resume/Sharvari-Hupare-Resume.pdf'


const About = () => {
  useEffect(() => {
    AOS.init({ delay: 300 });
  }, []);
  return (
    <>

    <Box
    b="none"
    textAlign={"center"}
      id="about"
      className="about section"
      // bg={"black"}
      bg={"#18112C"}
      color={"white"}
    >
     


      <Heading
        mt="50px"
        className="aboutmehead"
        display={"inline-block"}
        padding="10px"
        data-aos="fade-right"
        // ml="80px"
        mb="45px"
        textAlign={"center"}
        size="2xl"
        as="h1"
      >
        About<span style={{color:"#0ef",textAlign:"center"}}>ME</span>
      </Heading>
      <Flex justifyContent={"space-around"} direction={{base : 'column', sm : 'column', md : 'column', lg : 'row', xl : 'row', '2xl' : 'row'}} gap="30px" alignItems={"center"}>
        <Box w={{base:"90%",sm:"90%",md:"70%",lg:"50%",xl:"40%","2xl":"40%"}}  data-aos="zoom-out">
          <Image
            w="100%"
            border={"1px inset"}
            boxShadow="dark-md"
            p="6"
            rounded="md"
            src="https://img.freepik.com/free-photo/web-design-concept-with-drawings_1134-77.jpg?w=1060&t=st=1685370746~exp=1685371346~hmac=798fa5f314f08de3ed48799ae92da10f0aa89da9bb03b9e3ddf6236ae63fe4c"
           
            borderRadius={"10px"}
          />
        </Box>
        <Box  w={{base:"90%",sm:"90%",md:"70%",lg:"50%",xl:"50%","2xl":"50%"}}>
          <Text
            id="user-detail-intro"
            data-aos="fade-right"
            fontSize={"22px"}
            color={"white"}
            textAlign={"left"}
            mb="20px"
          >
            An Adaptive full-stack web developer with a great passion for
            programming.Passionate about delivering solutions that add to
            people's lives.A rigorous, adaptive task-driven web developer with
            substantial knowledge in JavaScript, HTML, CSS, React.js, Node.js,
            Express.js and MongoDB. Eager to tackle web development challenges
            to achieve impacts on user experience. I develop websites and
            applications using HTML, CSS,JavaScript and React.
          </Text>

        
        </Box>
      </Flex>

      
    </Box>
            </>
  );
};

export default About;
