import React from "react";
import { Box, Grid, Heading, Image } from "@chakra-ui/react";
import { AiFillGithub } from "react-icons/ai";
import { SiNetlify, SiPostman } from "react-icons/si";
import { SiVercel } from "react-icons/si";
import { TbBrandVscode } from "react-icons/tb";
import { FaSlack } from "react-icons/fa";
import { ImNpm } from "react-icons/im";
import { BiLogoZoom } from "react-icons/bi";


const Tools = () => {

  return (
    <Box
      id="skills"
      // bg={"black"}
      bg={"#18112C"}
      color={"white"}
      textAlign={"center"}
      p={"100px"}
    >
      <Heading
     
        className="tech-stacks"
        display={"inline-block"}
        padding="10px"
        data-aos="fade-right"
        color={"#0ef"}
       size="2xl"
       as="h1"
      >
       Tools
      </Heading>
      <Grid
      templateColumns={{ base: "repeat(2,1fr)", sm : 'repeat(2,1fr)', md : 'repeat(3,1fr)', lg: "repeat(4,1fr)",xl: "repeat(4,1fr)" ,"2xl": "repeat(4,1fr)"}}
       
        rowGap="60px"
        margin="50px auto"
        alignItems={{ base: "center", sm: "center", md: "center" }}
        marginLeft="10%"
      >
        <Box
        id="github"
          p="10px"
          width={{ base: "90%", sm: "60%", md: "40%", lg: "40%" }}
          className="skills-card"
          
        >
          <AiFillGithub fontSize={"65px"} style={{ margin:"auto" }}   className="skills-card-img" />
          <Heading  className='skills-card-name' ></Heading>
        </Box>
        <Box
         id="netlify"
          p="10px"
          width={{ base: "90%", sm: "60%", md: "40%", lg: "40%" }}
          className="skills-card"
        >
         <SiNetlify fontSize={"65px"} style={{ margin:"auto" }} color="#24c1b1"   className="skills-card-img"/>
         
          <Heading className='skills-card-name'></Heading>
        </Box>
        <Box
          id="vercel"
          p="10px"
          width={{ base: "90%", sm: "60%", md: "40%", lg: "40%" }}
          className="skills-card"
        >
       <SiVercel fontSize={"65px"} style={{ margin:"auto" }} color="black"   className="skills-card-img"/>
          <Heading className='skills-card-name'></Heading>
        </Box>
        <Box
         id="vscode"
          p="10px"
          width={{ base: "90%", sm: "60%", md: "40%", lg: "40%" }}
          className="skills-card"
        >
         <TbBrandVscode fontSize={"65px"} style={{ margin:"auto" }} color="#0082ca"   className="skills-card-img"/>
          <Heading className='skills-card-name'></Heading>
        </Box>
        <Box 
        id="npm" 
          p="10px"
          width={{ base: "90%", sm: "60%", md: "40%", lg: "40%" }} className="skills-card">
        <ImNpm fontSize={"65px"} style={{ margin:"auto" }} color="#c53635"   className="skills-card-img"/>
          <Heading className="skills-card-name"></Heading>
        </Box>
        <Box 
        id="slack"
          p="10px" width={{ base: "90%", sm: "60%", md: "40%", lg: "40%" }} className="skills-card">
         <FaSlack  fontSize={"65px"} style={{ margin:"auto" }} color="#e5ac2d"   className="skills-card-img" />
          <Heading className="skills-card-name"></Heading>
        </Box>
        <Box 
        id="postman"
          p="10px" width={{ base: "90%", sm: "60%", md: "40%", lg: "40%" }} className="skills-card">
          <SiPostman fontSize={"65px"} style={{ margin:"auto" }} color="#f76935"   className="skills-card-img"  />
          <Heading className="skills-card-name"></Heading>
        </Box>

        {/* <Box id="vscode"
          p="10px" width={{ base: "90%", sm: "60%", md: "40%", lg: "40%" }} className="skills-card">
           {/* <BiLogoZoom/> */}
          {/* <Heading className="skills-card-name"></Heading> */}
        {/* </Box> */}
       {/* */} 
      </Grid>
    </Box>
  );
};

export default Tools;
