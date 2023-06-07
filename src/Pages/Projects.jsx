
import { Box , Image,Heading,Link ,Text, Flex, Grid, Center} from '@chakra-ui/react'
import React, { useEffect } from 'react'
import mediverse1 from '../Assets/Projects/LandingUpperPartLightTheme.png'
import beautiq from '../Assets/Projects/beautiq.png'
import {BiFolder,BiCopy} from 'react-icons/bi'
import {FaGithub, FaReact,FaHtml5} from 'react-icons/fa'
import {TbJson} from 'react-icons/tb'
import {FaCss3Alt} from 'react-icons/fa'
import {SiChakraui,SiJavascript} from 'react-icons/si'
// import {BiLogoHtml5} from 'react-icons/bi'
import AOS from "aos";

const Projects = () => {
  // #162a33
  useEffect(()=>{
    AOS.init({delay:300});
  },[])
  return (
    <Box cursor={"pointer"}  textAlign={"center"} id='projects' bg={"black"}
    color={"white"}
    >
      <Heading 
      mt="40px"
       className="projects"
        display={"inline-block"}
        padding="10px"
        bgGradient="linear(to-r, #1a9a7c, #5c0c5c)"
        borderRadius={"8px"}
        data-aos="fade-right">My projects</Heading>


    <Grid>


      <Box data-aos="flip-up" id="project-sec" _hover={{bg:"#162a33"}} borderRadius={"10px"} p="20px" w="80%" m="40px auto" border={"1px inset"}  className='project-card'>
      <Flex justifyContent={"space-evenly"}>
      
        <Box w="40%" >
          <Flex justifyContent={"space-between"}>
        
            <BiFolder style={{fontSize:"40px",color:"#388E3C"}}/>
            <Box>
              <Flex>
              <Link href="https://github.com/sharvarihupare-369/wired-cover-3187/tree/main/mediverse" className='project-github-link'><FaGithub style={{fontSize:"40px"}} /></Link>
              <Link href="https://mediverse-five.vercel.app/" className='project-deployed-link'> <BiCopy  style={{fontSize:"40px", marginLeft:"5px"}} /></Link>
             
              </Flex>
            </Box>

          </Flex>
         <Heading textAlign={"left"} size={'md'} mt="10px" className='project-title'>Mediverse</Heading>
         <Text className='project-description' textAlign={"left"} mt="10px">
         An online booking appointment website where user or patient can book their appointment digitally with the doctor they want to visit.
         </Text>
        {/* <Text textAlign={"left"}>Website contains both light mode and dark mode which user can use accordingly</Text> */}
        <Text textAlign={"left"}>LightAndDarkMode</Text>
        <Text textAlign={"left"}>Data fetched from json-server <br/> Different routes created with react-router</Text>
      
         <Box mt="30px" className='project-tech-stack'>
          <Flex   textAlign={"left"} alignItems={"center"} >
            <Text><FaReact style={{fontSize:"40px" , color:"#00B0FF"}} /> </Text>
            <Text m="0px 20px"><SiChakraui style={{fontSize:"40px",color:"#3fc3bd" }} /></Text>
            <Text><TbJson style={{fontSize:"45px",color:"#2e6ff2"}} /></Text>
          </Flex>
         </Box>
       
        
        </Box>
        <Box w="50%">
         <Image w="100%" src={mediverse1} />
        </Box>
        </Flex>
      </Box> 





      <Box data-aos="flip-up" id="project-sec" _hover={{bg:"#162a33"}} borderRadius={"10px"} p="20px" w="80%" m="40px auto" border={"1px inset"}  className='project-card'>
      <Flex justifyContent={"space-evenly"}>
      
        <Box w="40%" >
          <Flex justifyContent={"space-between"}>
        
            <BiFolder style={{fontSize:"40px",color:"#388E3C"}}/>
            <Box>
              <Flex>
              <Link href="https://github.com/Upendrapal0607/satisfying-scale-7625" className='project-github-link'><FaGithub style={{fontSize:"40px"}} /></Link>
              <Link href="https://timely-paprenjak-287908.netlify.app/" className='project-deployed-link'> <BiCopy style={{fontSize:"40px", marginLeft:"5px"}} /></Link>
             
              </Flex>
            </Box>

          </Flex>
         <Heading textAlign={"left"} size={'md'} mt="10px" className='project-title'>Purple Clone</Heading>
         <Text className='project-description' textAlign={"left"} mt="10px">
        A clone of Purple website which sells beauty products.
         </Text>
        <Text textAlign={"left"}>Built Home Page with carousal </Text>
        <Text textAlign={"left"}>Developed the product page with add to cart functionality</Text>
      
         <Box mt="90px" className='project-tech-stack'>
          <Flex textAlign={"left"} >
            <Text><FaHtml5 style={{fontSize:"40px",color:"coral" }}/></Text>
            <Text m="0px 15px"><FaCss3Alt style={{fontSize:"40px",color:"blue" }}/></Text>
            <Text><SiJavascript style={{fontSize:"40px",color:"#FDD835" }}/></Text>
          </Flex>
         </Box>
       
        
        </Box>
        <Box w="50%">
         <Image w="100%" src={beautiq} />
        </Box>
        </Flex>
      </Box> 


      <Box data-aos="flip-up" id="project-sec" _hover={{bg:"#162a33"}} borderRadius={"10px"} p="20px" w="80%" m="40px auto" border={"1px inset"}  className='project-card'>
      <Flex justifyContent={"space-evenly"}>
      
        <Box w="40%" >
          <Flex justifyContent={"space-between"}>
        
            <BiFolder style={{fontSize:"40px",color:"#388E3C"}}/>
            <Box>
              <Flex>
              <Link href="https://github.com/sharvarihupare-369/wired-cover-3187/tree/main/mediverse" className='project-github-link'><FaGithub style={{fontSize:"40px"}} /></Link>
              <Link href="https://mediverse-five.vercel.app/" className='project-deployed-link'> <BiCopy  style={{fontSize:"40px", marginLeft:"5px"}} /></Link>
             
              </Flex>
            </Box>

          </Flex>
         <Heading textAlign={"left"} size={'md'} mt="10px" className='project-title'>Mediverse</Heading>
         <Text className='project-description' textAlign={"left"} mt="10px">
         An online booking appointment website where user or patient can book their appointment digitally with the doctor they want to visit.
         </Text>
        {/* <Text textAlign={"left"}>Website contains both light mode and dark mode which user can use accordingly</Text> */}
        <Text textAlign={"left"}>LightAndDarkMode</Text>
        <Text textAlign={"left"}>Data fetched from json-server <br/> Different routes created with react-router</Text>
      
         <Box mt="30px" className='project-tech-stack'>
          <Flex   textAlign={"left"} alignItems={"center"} >
            <Text><FaReact style={{fontSize:"40px" , color:"#00B0FF"}} /> </Text>
            <Text m="0px 20px"><SiChakraui style={{fontSize:"40px",color:"#3fc3bd" }} /></Text>
            <Text><TbJson style={{fontSize:"45px",color:"#2e6ff2"}} /></Text>
          </Flex>
         </Box>
       
        
        </Box>
        <Box w="50%">
         <Image w="100%" src={mediverse1} />
        </Box>
        </Flex>
      </Box> 

      

      <Box data-aos="flip-up" id="project-sec" _hover={{bg:"#178444"}} borderRadius={"10px"} p="20px" w="80%" m="40px auto" border={"1px inset"}  className='project-card'>
      <Flex justifyContent={"space-evenly"}>
      
        <Box w="40%" >
          <Flex justifyContent={"space-between"}>
        
            <BiFolder style={{fontSize:"40px",color:"#388E3C"}}/>
            <Box>
              <Flex>
              <Link href="https://github.com/Upendrapal0607/satisfying-scale-7625" className='project-github-link'><FaGithub style={{fontSize:"40px"}} /></Link>
              <Link href="https://timely-paprenjak-287908.netlify.app/" className='project-deployed-link'> <BiCopy style={{fontSize:"40px", marginLeft:"5px"}} /></Link>
             
              </Flex>
            </Box>

          </Flex>
         <Heading textAlign={"left"} size={'md'} mt="10px" className='project-title'>Purple Clone</Heading>
         <Text className='project-description' textAlign={"left"} mt="10px">
        A clone of Purple website which sells beauty products.
         </Text>
        <Text textAlign={"left"}>Built Home Page with carousal </Text>
        <Text textAlign={"left"}>Developed the product page with add to cart functionality</Text>
      
         <Box mt="90px" className='project-tech-stack'>
          <Flex textAlign={"left"} >
            <Text><FaHtml5 style={{fontSize:"40px",color:"coral" }}/></Text>
            <Text m="0px 15px"><FaCss3Alt style={{fontSize:"40px",color:"blue" }}/></Text>
            <Text><SiJavascript style={{fontSize:"40px",color:"#FDD835" }}/></Text>
          </Flex>
         </Box>
       
        
        </Box>
        <Box w="50%">
         <Image w="100%" src={beautiq} />
        </Box>
        </Flex>
      </Box> 




    </Grid>



   
 </Box>
  )
}

export default Projects