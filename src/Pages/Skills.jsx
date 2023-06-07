import React from "react";
import { Box, Grid, Heading, Image } from "@chakra-ui/react";
import html from "../Assets/TechStacks/html-5.png";
import css from "../Assets/TechStacks/css-3.png";
import js from "../Assets/TechStacks/js2.png";
import react from "../Assets/TechStacks/react-icon-29.jpg";
import redux1 from '../Assets/TechStacks/redux1.png'
import chakra from '../Assets/TechStacks/chakra.jpg'
import npm from '../Assets/TechStacks/npm.png'
import vscode from '../Assets/TechStacks/vscode3.png'
import postman from '../Assets/TechStacks/postman-logo-0087CA0D15-seeklogo.com.png'
import node from '../Assets/TechStacks/nodejs-1-logo.png'

const Skills = () => {
  // 162a33
  return (
    <Box
      id="skills"
      bg={"black"}
      color={"white"}
      // minH={"100v  h"}
      // margin="50px auto"
      // width="80%"
      textAlign={"center"}
      p={"100px"}
    >
      <Heading
       mt="40px"
        className="tech-stacks"
        display={"inline-block"}
        padding="10px"
        bgGradient="linear(to-r, #1a9a7c, #5c0c5c)"
        borderRadius={"8px"}
        data-aos="fade-right"
       
      >
        My Technical Skills
      </Heading>
      <Grid
        templateColumns={{ base: "repeat(4,1fr)", lg: "repeat(5,1fr)" }}
        rowGap="60px"
        margin="50px auto"
        alignItems={{ base: "center", sm: "center", md: "center" }}
        marginLeft="10%"
      >
        <Box
          id="html"
          p="10px"
          width={{ base: "90%", sm: "60%", md: "40%", lg: "40%" }}
          className="skills-card"
          
        >
          <Image  m="auto" width="80%" src={html} className="skills-card-img" />
          <Heading  className='skills-card-name' ></Heading>
        </Box>
        <Box
          id="css"
          p="10px"
          width={{ base: "90%", sm: "60%", md: "40%", lg: "40%" }}
          className="skills-card"
        >
          <Image m="auto" width="80%" src={css} className="skills-card-img" />
          <Heading className='skills-card-name'></Heading>
        </Box>
        <Box
          id="js"
          p="10px"
          width={{ base: "90%", sm: "60%", md: "40%", lg: "40%" }}
          className="skills-card"
        >
          <Image m="auto"  width="80%" src={js} className="skills-card-img" />
          <Heading className='skills-card-name'></Heading>
        </Box>
        <Box
          id="react"
          p="10px"
          width={{ base: "90%", sm: "60%", md: "40%", lg: "40%" }}
          className="skills-card"
        >
          <Image m="auto"  width="80%" src={react} className="skills-card-img" />
          <Heading className='skills-card-name'></Heading>
        </Box>
        <Box  id="redux"
          p="10px"
          width={{ base: "90%", sm: "60%", md: "40%", lg: "40%" }} className="skills-card">
          <Image m="auto" borderRadius={"50%"} width="80%" src={redux1} className="skills-card-img" />
          <Heading className="skills-card-name"></Heading>
        </Box>
        <Box id="chakra"
          p="10px" width={{ base: "90%", sm: "60%", md: "40%", lg: "40%" }} className="skills-card">
          <Image  m="auto" borderRadius={"50%"} width="80%" src={chakra} className="skills-card-img" />
          <Heading className="skills-card-name"></Heading>
        </Box>
        <Box id="npm"
          p="10px" width={{ base: "90%", sm: "60%", md: "40%", lg: "40%" }} className="skills-card">
          <Image  m="auto" borderRadius={"50%"} width="80%" src={npm} className="skills-card-img" />
          <Heading className="skills-card-name"></Heading>
        </Box>

        <Box id="vscode"
          p="10px" width={{ base: "90%", sm: "60%", md: "40%", lg: "40%" }} className="skills-card">
          <Image  m="auto" borderRadius={"50%"} width="80%" src={vscode} className="skills-card-img" />
          <Heading className="skills-card-name"></Heading>
        </Box>
        <Box id="postman"
          p="10px" width={{ base: "90%", sm: "60%", md: "40%", lg: "40%" }} className="skills-card">
          <Image  m="auto" borderRadius={"50%"} width="80%" src={postman} className="skills-card-img" />
          <Heading className="skills-card-name"></Heading>
        </Box>

        <Box id="node"
          p="10px" width={{ base: "90%", sm: "60%", md: "40%", lg: "40%" }} className="skills-card">
          <Image  m="auto" borderRadius={"50%"} width="80%" src={node} className="skills-card-img" />
          <Heading className="skills-card-name"></Heading>
        </Box>
      </Grid>
    </Box>
  );
};

export default Skills;
