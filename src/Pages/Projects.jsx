
import { Box , Image,Heading,Link ,Text, Flex, Grid, Center} from '@chakra-ui/react'
import React, { useEffect } from 'react'
import mediverse1 from '../Assets/Projects/LandingUpperPartLightTheme.png'
import beautiq from '../Assets/Projects/beautiq.png'
import {BiFolder,BiCopy} from 'react-icons/bi'
import {FaGithub, FaReact,FaHtml5, FaNodeJs} from 'react-icons/fa'
import {TbJson} from 'react-icons/tb'
import {FaCss3Alt} from 'react-icons/fa'
import {SiChakraui,SiJavascript, SiMongodb, SiNodedotjs, SiRedux, SiTypescript} from 'react-icons/si'
import dashdonation from '../Assets/Projects/dashdonation.png'
import bookDigitally from '../Assets/Projects/bookDigitally.png'
// import {BiLogoHtml5} from 'react-icons/bi'
import jewellery from '../Assets/Projects/Jwellery.png'
import AOS from "aos";
import { IoLogoJavascript } from 'react-icons/io'
import todoFrontpage from '../Assets/Projects/landingPageTodo.png'

const Projects = () => {
  
  useEffect(()=>{
    AOS.init({delay:300});
  },[])
  return (
    <Box cursor={"pointer"}  textAlign={"center"} id='projects'   bg={"#18112C"}
    color={"white"}
    >
      <Heading 
       mt="40px"
       textAlign={"center"}
       className="projects"
        display={"inline-block"}
        padding="10px"
        as="h1"
        size={"2xl"}
        color={"#0ef"}
        data-aos="fade-right"
        >Projects</Heading>

    <Grid>

    
    

        <Box id="project-sec"  data-aos="fade-left"  _hover={{ bg:"#301f5f",border:"1px solid #18112C"}}  borderRadius={"10px"} p="20px" w="80%" m="40px auto"  border={"1px inset #18112C"} className='project-card'>
          <Flex gap={'30px'} justifyContent={"space-evenly"} direction={{base : 'column-reverse', sm : 'column-reverse', md : 'column-reverse', lg : 'row', xl : 'row', '2xl' : 'row'}}>

            <Box w={{base : '100%', sm : '100%', md : '100%', lg : '100%', xl : '100%', '2xl' : '100%'}} >
              <Flex justifyContent={"space-between"}>

                <BiFolder style={{ fontSize: "40px", color: "#388E3C" }} />
                <Box>
                  <Flex>
                    <Link target='_blank' href="https://github.com/sharvarihupare-369/dashDonation-charityapplication-" className='project-github-link'><FaGithub style={{ fontSize: "40px" }} /></Link>
                    <Link target='_blank' href="https://dash-donation-three.vercel.app/" className='project-deployed-link'> <BiCopy style={{ fontSize: "40px", marginLeft: "5px" }} /></Link>
                  </Flex>
                </Box>

              </Flex>
              <Heading textAlign={"left"} size={'md'} mt="10px" className='project-title'>Dash Donation(Charity Hero Clone)</Heading>
              <Text className='project-description' textAlign={"left"} mt="10px">
                Dash Donation is a charitable (Non profitable organization) website which provides food, medicines, education and relief for victims of Ukraine war. It runs with the help of many partner organizations which work together.
              </Text>
              <Text textAlign={"left"}>Built admin panel</Text>
              <Text textAlign={"left"}>Built both frontend and backend part of Admin Side</Text>
              <Text textAlign={"left"}>Functionalities such blacklisting,and other CRUD operations</Text>

              <Box w={'100%'} mt="30px" className='project-tech-stack'>
                <Flex w={'100%'} justifyContent={'space-between'} >
                  <Text><FaReact style={{ fontSize: "40px", color: "#00B0FF" }} /></Text>
                  <Text><SiRedux style={{ fontSize: "40px", color:"#764abc"  }} /></Text>
                  <Text><SiNodedotjs style={{ fontSize: "40px", color:"#539e43" }} /></Text>
                  <Text><SiMongodb style={{ fontSize: "40px", color:"#4caa3d" }} /></Text>
                </Flex>
              </Box>
            </Box>
            <Box w={{base : '100%', sm : '100%', md : '100%', lg : '100%', xl : '100%', '2xl' : '100%'}}>
              <Link target='_blank' href="https://dash-donation-three.vercel.app/" className='project-deployed-link'><Image w="100%" src={dashdonation} /></Link>
            </Box>
          </Flex>
        </Box>

        <Box id="project-sec"  data-aos="fade-right" _hover={{ bg:"#301f5f",border:"1px solid #18112C"}}  borderRadius={"10px"} p="20px" w="80%" m="40px auto" border={"1px inset #18112C"} className='project-card'>
          <Flex gap={'30px'} justifyContent={"space-evenly"} direction={{base : 'column-reverse', sm : 'column-reverse', md : 'column-reverse', lg : 'row', xl : 'row', '2xl' : 'row'}}>

            <Box w={{base : '100%', sm : '100%', md : '100%', lg : '100%', xl : '100%', '2xl' : '100%'}} >
              <Flex justifyContent={"space-between"}>

                <BiFolder style={{ fontSize: "40px", color: "#388E3C" }} />
                <Box>
                  <Flex>
                  <Link href="https://github.com/sharvarihupare-369/fullStacktodoApp" className='project-github-link'><FaGithub style={{fontSize:"40px"}} /></Link>
                  <Link href="https://todomanager-five.vercel.app/" className='project-deployed-link'> <BiCopy  style={{fontSize:"40px", marginLeft:"5px"}} /></Link>
             
                  </Flex>
                </Box>

              </Flex>
              <Heading textAlign={"left"} size={'md'} mt="10px" className='project-title'>TodoManager</Heading>
              <Text className='project-description' textAlign={"left"} mt="10px">
              TodoManager is a powerful and user-friendly Todo Application designed to streamline task management and boost your productivity.
              </Text>
            <Text textAlign={"left"}>On the front-end, I harness the power of React.js, Redux.js, and TypeScript for a dynamic and responsive user interface.</Text>
            <Text textAlign={"left"}>For back-end I used Node.js and Express.js, ensuring robust server-side functionality.</Text>
            <Text textAlign={"left"}>MongoDB serves as database of choice, enabling seamless data management.</Text>
      
       
            <Box w={'100%'}  mt="30px" className='project-tech-stack'>
                <Flex w={'100%'} justifyContent={'space-between'} >
                  <Text><FaReact style={{fontSize:"40px",color:"#00B0FF" }}/></Text>
                  <Text><SiRedux style={{fontSize:"40px",color:"#764abc"}}/></Text>
                  <Text><SiTypescript style={{fontSize:"40px",color:"#2e6ff2"}}/></Text>
                  <Text><FaNodeJs style={{ fontSize: "40px", color:"#539e43" }} /></Text>
                  <Text><SiMongodb style={{ fontSize: "40px", color:"#4caa3d" }} /></Text>
                </Flex>
              </Box>
            </Box>
            <Box w={{base : '100%', sm : '100%', md : '100%', lg : '100%', xl : '100%', '2xl' : '100%'}}>
            <Link target='_blank' href="https://todomanager-five.vercel.app/" className='project-deployed-link'><Image w="100%" src={todoFrontpage}  /></Link>
             
            </Box>
          </Flex>
        </Box>


 <Box id="project-sec"  data-aos="fade-right" _hover={{ bg:"#301f5f",border:"1px solid #18112C"}}  borderRadius={"10px"} p="20px" w="80%" m="40px auto" border={"1px inset #18112C"} className='project-card'>
          <Flex gap={'30px'} justifyContent={"space-evenly"} direction={{base : 'column-reverse', sm : 'column-reverse', md : 'column-reverse', lg : 'row', xl : 'row', '2xl' : 'row'}}>

            <Box w={{base : '100%', sm : '100%', md : '100%', lg : '100%', xl : '100%', '2xl' : '100%'}} >
              <Flex justifyContent={"space-between"}>

                <BiFolder style={{ fontSize: "40px", color: "#388E3C" }} />
                <Box>
                  <Flex>
                  <Link href="https://github.com/sharvarihupare-369/wired-cover-3187" className='project-github-link'><FaGithub style={{fontSize:"40px"}} /></Link>
                  <Link href="https://mediverse-five.vercel.app/" className='project-deployed-link'> <BiCopy  style={{fontSize:"40px", marginLeft:"5px"}} /></Link>
             
                  </Flex>
                </Box>

              </Flex>
              <Heading textAlign={"left"} size={'md'} mt="10px" className='project-title'>Mediverse</Heading>
              <Text className='project-description' textAlign={"left"} mt="10px">
              An online booking appointment website where user or patient can book their appointment digitally with the doctor they want to visit.
              </Text>
              <Text textAlign={"left"}>LightAndDarkMode</Text>
            <Text textAlign={"left"}>Data fetched from json-server <br/> Different routes created with react-router</Text>
      
       
            <Box w={'100%'}  mt="30px" className='project-tech-stack'>
                <Flex w={'100%'} justifyContent={'space-between'} >
                  <Text><FaReact style={{fontSize:"40px",color:"#3fc3bd" }}/></Text>
                  <Text><SiChakraui style={{fontSize:"40px",color:"#3fc3bd" }} /></Text>
                 
                  <Text><TbJson style={{fontSize:"45px",color:"#2e6ff2"}}/></Text>
                
                </Flex>
              </Box>
       
        
            </Box>
            <Box w={{base : '100%', sm : '100%', md : '100%', lg : '100%', xl : '100%', '2xl' : '100%'}}>
            <Link target='_blank' href="https://mediverse-five.vercel.app/" className='project-deployed-link'> <Image w="100%" src={mediverse1} /></Link>
             
             
            </Box>
          </Flex>
        </Box>


      <Box id="project-sec"  data-aos="fade-left"  _hover={{ bg:"#301f5f",border:"1px solid #18112C"}}   borderRadius={"10px"} p="20px" w="80%" m="40px auto" border={"1px inset #18112C"} className='project-card'>
          <Flex gap={'30px'} justifyContent={"space-evenly"} direction={{base : 'column-reverse', sm : 'column-reverse', md : 'column-reverse', lg : 'row', xl : 'row', '2xl' : 'row'}}>

            <Box w={{base : '100%', sm : '100%', md : '100%', lg : '100%', xl : '100%', '2xl' : '100%'}} >
              <Flex justifyContent={"space-between"}>

                <BiFolder style={{ fontSize: "40px", color: "#388E3C" }} />
                <Box>
                  <Flex>
                  <Link href="https://github.com/Upendrapal0607/satisfying-scale-7625" className='project-github-link'><FaGithub style={{fontSize:"40px"}} /></Link>
              <Link href="https://timely-paprenjak-287908.netlify.app/" className='project-deployed-link'> <BiCopy style={{fontSize:"40px", marginLeft:"5px"}} /></Link>
                  </Flex>
                </Box>

              </Flex>
              <Heading textAlign={"left"} size={'md'} mt="10px" className='project-title'>Beatique.com(Purple Clone)</Heading>
              <Text className='project-description' textAlign={"left"} mt="10px">
              A clone of Purple website which sells beauty products.
              </Text>
              <Text textAlign={"left"}>Built Landing Page with carousal </Text>
              <Text textAlign={"left"}>Built Footer Part </Text>
        <Text textAlign={"left"}>Developed the product page</Text>
        <Text textAlign={"left"}>Added add to cart functionality</Text>

              <Box w={'100%'} mt="30px" className='project-tech-stack'>
                <Flex w={'100%'} justifyContent={'space-between'} >
                  <Text><FaHtml5 style={{ fontSize: "40px", color: "coral" }} /></Text>
                  <Text><FaCss3Alt style={{ fontSize: "40px", color:"blue"  }} /></Text>
                  <Text><IoLogoJavascript style={{ fontSize: "40px", color:"#FDD835" }} /></Text>
                  <Text><TbJson style={{fontSize:"45px",color:"#2e6ff2"}}/></Text>
                
                </Flex>
              </Box>
            </Box>
            <Box w={{base : '100%', sm : '100%', md : '100%', lg : '100%', xl : '100%', '2xl' : '100%'}}>
            <Link target='_blank' href="https://timely-paprenjak-287908.netlify.app/" className='project-deployed-link'><Image w="100%"  src={beautiq} /></Link>
        
            </Box>
          </Flex>
        </Box>




        <Box id="project-sec"  data-aos="fade-right" _hover={{ bg:"#301f5f",border:"1px solid #18112C"}}  borderRadius={"10px"} p="20px" w="80%" m="40px auto"  border={"1px inset #18112C"} className='project-card'>
          <Flex gap={'30px'} justifyContent={"space-evenly"} direction={{base : 'column-reverse', sm : 'column-reverse', md : 'column-reverse', lg : 'row', xl : 'row', '2xl' : 'row'}}>

            <Box w={{base : '100%', sm : '100%', md : '100%', lg : '100%', xl : '100%', '2xl' : '100%'}} >
              <Flex justifyContent={"space-between"}>

                <BiFolder style={{ fontSize: "40px", color: "#388E3C" }} />
                <Box>
                  <Flex>
                  <Link href="https://github.com/sharvarihupare-369/adorable_crownn-8253" className='project-github-link'><FaGithub style={{fontSize:"40px"}} /></Link>
              <Link href="https://gem-garden.vercel.app/" className='project-deployed-link'> <BiCopy  style={{fontSize:"40px", marginLeft:"5px"}} /></Link>
             
                  </Flex>
                </Box>

              </Flex>
              <Heading textAlign={"left"} size={'md'} mt="10px" className='project-title'>GemGarden</Heading>
              <Text className='project-description' textAlign={"left"} mt="10px">
              A Jewelery website which sells online jewellery of different types.
              </Text>
              <Text textAlign={"left"}>Built Responsive Landing Page</Text>
              <Text textAlign={"left"}>Added Login and Signup Functionalities</Text>

            <Text textAlign={"left"}>Data fetched from json-server <br/> Different routes created with react-router</Text>
      
       
            <Box w={'100%'}  mt="30px" className='project-tech-stack'>
                <Flex w={'100%'} justifyContent={'space-between'} >
                  <Text><FaReact style={{fontSize:"40px",color:"#3fc3bd" }}/></Text>
                  <Text><SiChakraui style={{fontSize:"40px",color:"#3fc3bd" }} /></Text>
                 
                  <Text><TbJson style={{fontSize:"45px",color:"#2e6ff2"}}/></Text>
                
                </Flex>
              </Box>
       
        
            </Box>
            <Box w={{base : '100%', sm : '100%', md : '100%', lg : '100%', xl : '100%', '2xl' : '100%'}}>
            <Link target='_blank' href="https://gem-garden.vercel.app/" className='project-deployed-link'><Image w="100%" src={jewellery} /></Link>
              
            </Box>
          </Flex>
        </Box>


        

      

      
       



    </Grid>

 </Box>
  )
}

export default Projects
