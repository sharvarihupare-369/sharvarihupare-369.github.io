import { Box, Button, ColorModeProvider, Flex, Link } from "@chakra-ui/react";
import React from "react";
import { HashLink } from "react-router-hash-link";
import resume from '../Assets/Resume/Sharvari-Hupare-Resume.pdf'
import "animate.css";
// import '../Contact.css'
import AOS from 'aos' 
import { useEffect } from "react";




const Navbar = () => {
 

useEffect(() => {
   AOS.init({delay : 300});
}, [])

  return (
    
    <Box 
    // w="90%"
    p="20px 10px"
    background={"#0F2027"}
    color={"white"}
    position={"sticky"}
    zIndex={"overlay"}
    top="0"  
    >
    
     <nav  id="nav-menu">

      <Flex justifyContent={"space-around"} alignItems={"center"}>
        <Box w="20%" textAlign={"center"}>
          Sharvari
        </Box>
        <Box w="50%">
          <Flex justifyContent={"space-between"} alignItems={"center"}>
            <HashLink
            
              className="nav-link home"
              to="/#"
              >
              Home
            </HashLink>
            <HashLink
             className="nav-link about"
             style={{ color: "white", textDecoration: "none" }}
             to="/#about"
            >
              About
            </HashLink>
            <HashLink
             className="nav-link skills"
              style={{ color: "white", textDecoration: "none" }}
              to="/#skills"
              >
              Skills
            </HashLink>
          
            <HashLink
             className="nav-link projects"
             style={{ color: "white", textDecoration: "none" }}
             to="/#projects"
             >
              Projects
            </HashLink>

            <HashLink
             className="nav-link contact"
             style={{ color: "white", textDecoration: "none" }}
             to="/#contact"
             
             >
              Contact
            </HashLink>


          {/* <ColorModeProvider/> */}
              <Link  
               id="resume-link-1"
              
              className="nav-link resume"
            href={resume} download={true}>
              <Button id="resume-button-1"   mr="20px"
            _hover={{
              bgGradient: "linear(to-r,#3fada8, purple.500)",
            }} color="white" p="10px 40px" borderRadius={"5px"} bgGradient="linear(to-l,#304352, #3fada8)" >
              Resume 
              </Button>

              </Link>


           
          </Flex>
        </Box>
      </Flex>
           
              </nav>
    </Box>



  );
};

export default Navbar;
