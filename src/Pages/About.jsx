import { Box, Flex, Heading, Text, Image, Container } from "@chakra-ui/react";
import React, { useEffect } from "react";
import AOS from "aos";

const About = () => {
  useEffect(() => {
    AOS.init({ delay: 300 });
  }, []);
  return (
    <Box
      textAlign={"center"}
      id="about"
      className="about section"
      bg={"black"}
      color={"white"}
    >
      <Heading
       mt="150px"
        className="aboutmehead"
        display={"inline-block"}
        padding="10px"
        bgGradient="linear(to-r, #1a9a7c, #5c0c5c)"
        borderRadius={"8px"}
        data-aos="fade-right"
        ml="80px"
        mb="45px"
        as={"h2"}
        size={"xl"}
      >
        About ME
      </Heading>
      <Flex justifyContent={"space-around"} alignItems={"center"}>
        <Box data-aos="zoom-out">
          <Image
            border={"1px inset"}
            boxShadow="dark-md"
            p="6"
            rounded="md"
            src="https://img.freepik.com/free-photo/web-design-concept-with-drawings_1134-77.jpg?w=1060&t=st=1685370746~exp=1685371346~hmac=798fa5f314f08de3ed48799ae92da10f0aa89da9bb03b9e3ddf6236ae63fe4c"
            w="500px"
            borderRadius={"10px"}
          />
        </Box>
        <Box w={"50%"}>
          <Text
            id="user-detail-intro"
            data-aos="fade-right"
            fontSize={"22px"}
            color={"#00B0FF"}
            textAlign={"left"}
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
  );
};

export default About;
