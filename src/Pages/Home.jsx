import {
  Box,
  Heading,
  Text,
  Flex,
  Image,
  Link,
  Button,
} from "@chakra-ui/react";
import React, { useEffect } from "react";
import Typed from "typed.js";
import myimage from "../Assets/Mypic.jpg";
import AOS from "aos";
import "aos/dist/aos.css";
import resume from "../Assets/Resume/Sharvari-Hupare-Resume.pdf";
import { FaGithub, FaHeart, FaLinkedin } from 'react-icons/fa';
import "./home.css";

const Home = () => {
  useEffect(() => {
    AOS.init({ delay: 300 });
  }, []);

  useEffect(() => {
    const typed = new Typed(".text", {
      strings: ["MERN Stack Developer","Effective Problem Solver"],
      typeSpeed: 100,
      backSpeed: 100,
      backDelay: 1000,
      loop: true,
      showCursor: false,
    });

    return () => {
      typed.destroy();
    };
  }, []);

  const openLink = (url) => {
    window.open(url);
  };
  return (
    <>
      <Flex
        flexDirection={{
          base: "column",
          sm: "column",
          md: "column",
          lg: "row",
          xl: "row",
          "2xl": "row",
        }}
        bg={"#18112C"}
        justifyContent={"space-around"}
        alignItems={"center"}
        gap="60px"
        id="home"
        p="50px"
        color={"white"}
        border="none"
      >
        <Box >
          <Box id="home-content">
            <Heading mt="10px" size="lg" as="h3" className="head">
              Hello, I am
            </Heading>
            <Heading mt="10px" size="2xl" as="h1" id="user-detail-name">
              Sharvari Hupare
            </Heading>
            <Heading mt="10px" size="lg" as="h3">
            <span className="text"></span>
              <span style={{ color: "#0ef", marginLeft: "3px" }}>|</span>
            </Heading>
            <Text fontSize={"20px"} mt="10px">
              I'm a web developer and my <br />
              expertise is to create awesome websites{" "}
            </Text>
            
            <Link
              mt="10px"
              fontWeight="bold"
              borderRadius="5px"
              backgroundImage="linear-gradient(to right, #01b395, #03bd69)"
              id="resume-link-2"
              href={resume}
              download={true}
              target="_blank"
            >
              <Box className="home-icon">
                <Button
                  mt="40px"
                  id="resume-button-2"
                  background="#0ef"
                  onClick={()=>openLink("https://drive.google.com/file/d/1GbXolYZQXqui6TrjEGGCRUR-jEUkqVSg/view?usp=sharing")}
                  className="home-resume btn-box"
                >
                  Download Resume
                </Button>
              </Box>
            </Link>
          </Box>
        </Box>

        <Image
         id="mypic"
          src={myimage}
          className="home-img"
          boxShadow="outline"
          borderColor={"#76446b"}
          alt="myPic"
          w={{base : '80%', sm : '80%', md : '60%', lg : '30%', xl : '30%', '2xl' : '30%'}}
          // w="30%"
          height="60%"
          borderRadius="50%"
        />
      </Flex>
    </>
  );
};

export default Home;
