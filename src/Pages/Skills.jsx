import React from "react";
import { Box, Grid, Heading, Image } from "@chakra-ui/react";
import {BiLogoMongodb} from 'react-icons/bi'
import {SiChakraui, SiMongodb, SiRedux, SiTypescript} from 'react-icons/si'
import {AiFillHtml5} from 'react-icons/ai'
import {FaCss3Alt} from 'react-icons/fa'
import {IoLogoJavascript} from 'react-icons/io'
import { GrReactjs } from "react-icons/gr";
import { DiMongodb, DiNodejsSmall } from "react-icons/di";
import { TbBrandCypress } from "react-icons/tb";
import { SiTailwindcss } from "react-icons/si";
import { SiExpress } from "react-icons/si";

const Skills = () => {

  return (
    <Box
      id="skills"
      // bg={"black"}
      bg={"#18112C"}
      color={"white"}
      textAlign={"center"}
      p="20px"
      
    >
      <Heading
       m="50px 0"
        className="tech-stacks"
        display={"inline-block"}
        padding="10px"
        data-aos="fade-right"
        color={"#0ef"}
       size="2xl"
       as="h1"
      >
        Technical Skills
      </Heading>
      <Grid
      templateColumns={{ base: "repeat(2,1fr)", sm : 'repeat(3,1fr)', md : 'repeat(4,1fr)', lg: "repeat(5,1fr)",xl: "repeat(5,1fr)" ,"2xl": "repeat(5,1fr)"}}
       
        rowGap="60px"
        // margin="50px auto"
        placeItems={"center"}
        alignItems={{ base: "center", sm: "center", md: "center" }}
        
      >
        <Box
          id="html"
          p="10px"
          width={{ base: "70%", sm: "60%", md: "40%", lg: "40%" }}
          className="skills-card"
          
        >
          {/* <Image  m="auto" width="80%" src={html} className="skills-card-img" /> */}
          <AiFillHtml5 fontSize={"65px"} style={{ margin:"auto" }} color="#e54c21" className="skills-card-img"/>
          <Heading  className='skills-card-name' ></Heading>
        </Box>
        <Box
          id="css"
          p="10px"
          width={{ base: "70%", sm: "60%", md: "40%", lg: "40%" }}
          className="skills-card"
        >
          {/* <Image m="auto" width="80%" src={css} className="skills-card-img" /> */}
          <FaCss3Alt fontSize={"65px"} style={{ margin:"auto" }} color="#254bdd"  className="skills-card-img" />
          <Heading className='skills-card-name'></Heading>
        </Box>
        <Box
          id="js"
          p="10px"
          width={{ base: "70%", sm: "60%", md: "40%", lg: "40%" }}
          className="skills-card"
        >
          {/* <Image m="auto"  width="80%" src={js} className="skills-card-img" /> */}
          <IoLogoJavascript fontSize={"65px"} style={{ margin:"auto" }} color="#e2c430"  className="skills-card-img" />
          <Heading className='skills-card-name'></Heading>
        </Box>
        <Box
          id="react"
          p="10px"
          width={{ base: "70%", sm: "60%", md: "40%", lg: "40%" }}
          className="skills-card"
        >
        
          <GrReactjs fontSize={"65px"} style={{ margin:"auto" }} color="#5ed3f3"  className="skills-card-img" />
          <Heading className='skills-card-name'></Heading>
        </Box>
        <Box  id="redux"
          p="10px"
          width={{ base: "70%", sm: "60%", md: "40%", lg: "40%" }} className="skills-card">
        
          <SiRedux fontSize={"65px"} style={{ margin:"auto" }} color="#7248b6"  className="skills-card-img" />
          <Heading className="skills-card-name"></Heading>
        </Box>
        <Box id="node"  p="10px"  width={{ base: "70%", sm: "60%", md: "40%", lg: "40%" }} className="skills-card">
         
          <DiNodejsSmall fontSize={"65px"} style={{ margin:"auto" }} color="#3f873b"  className="skills-card-img"/>
          <Heading className="skills-card-name"></Heading>
        </Box>

        <Box id="express"
          p="10px"  width={{ base: "70%", sm: "60%", md: "40%", lg: "40%" }} className="skills-card">
    
          <SiExpress  fontSize={"65px"} style={{ margin:"auto" }} color="#000000"  className="skills-card-img"/>
          <Heading className="skills-card-name"></Heading>
        </Box>

        <Box id="mongodb"
          p="10px"  width={{ base: "70%", sm: "60%", md: "40%", lg: "40%" }} className="skills-card">
       
         <DiMongodb fontSize={"65px"} style={{ margin:"auto" }} color="#3ca02e"  className="skills-card-img"/>
          <Heading className="skills-card-name"></Heading>
        </Box>


        
        <Box id="typescript"
          p="10px"  width={{ base: "70%", sm: "60%", md: "40%", lg: "40%" }} className="skills-card">
    
          <SiTypescript fontSize={"65px"} style={{ margin:"auto" }} color="#2f74c0"  className="skills-card-img"/>
          <Heading className="skills-card-name"></Heading>
        </Box>
        <Box id="tailwind"
          p="10px"  width={{ base: "70%", sm: "60%", md: "40%", lg: "40%" }} className="skills-card">
      
          <SiTailwindcss  fontSize={"65px"} style={{ margin:"auto" }} color="#36B6F2"  className="skills-card-img"/>
          <Heading className="skills-card-name"></Heading>
        </Box>

       
        <Box id="cypress"
          p="10px"  width={{ base: "70%", sm: "60%", md: "40%", lg: "40%" }} className="skills-card">
      
          <TbBrandCypress fontSize={"65px"} style={{ margin:"auto" }} color="#306158"  className="skills-card-img"/>
          <Heading className="skills-card-name"></Heading>
        </Box>
       
        <Box id="chakra"
          p="10px"  width={{ base: "70%", sm: "60%", md: "40%", lg: "40%" }} className="skills-card">
    
          <SiChakraui fontSize={"65px"} style={{ margin:"auto" }} color="#50c4c0"  className="skills-card-img"/>
          <Heading className="skills-card-name"></Heading>
        </Box>
      </Grid>
    </Box>
  );
};

export default Skills;
