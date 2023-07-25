import React, { useEffect } from 'react'
import GitHubCalendar from 'react-github-calendar';
import { Image , Box , Heading} from '@chakra-ui/react';
import AOS from "aos";

export const Github = () => {
    useEffect(() => {
        AOS.init({ delay: 300 });
      }, []);
    const gitcal = (contributions) => {
        const today = new Date();
        const startTimestamp = new Date(
          today.getFullYear(),
          today.getMonth() - 12,
          1
        ).getTime();
        const endTimestamp =
          new Date(today.getFullYear(), today.getMonth() + 1, 1).getTime() - 1;
    
        return contributions.filter((day) => {
          const contributionTimestamp = new Date(day.date).getTime();
    
          return (
            contributionTimestamp >= startTimestamp &&
            contributionTimestamp <= endTimestamp
         );
        });
      };
    


  return (
    <Box cursor={"pointer"} p="10px"  className='react-activity-calender'  textAlign={"center"} id='projects' bg={"black"}
    color={"white"}>
        <Box>

        <Box  display={"inline-block"}
            padding="10px"
            bgGradient="linear(to-r, #0ef, cyan.500)"
            borderRadius={"8px"}
            className="tech-skill-heading"
            data-aos="flip-right"
            marginBottom={{ base: "30px", sm: "50px" }}>
          <Heading size={"md"}>Github Calender</Heading>
       </Box>
        <Box w="90%" m="auto"  data-aos="fade-left" >
        <GitHubCalendar  username="sharvarihupare-369"
          blockSize={20}
          transformData={gitcal}>Github</GitHubCalendar>

          </Box>
          </Box>
          <Box>


          <Box  display={"inline-block"}
            padding="10px"
            bgGradient="linear(to-r, #0ef, cyan.500)"
            borderRadius={"8px"}
            className="tech-skill-heading"
            // data-aos="flip-right"
            marginBottom={{ base: "30px", sm: "20px" }}>
          <Heading size={"md"}>Github Streaks</Heading>
       </Box>
          <Box w="30%" m="30px auto" data-aos="fade-right">
            <Image id="github-streak-stats"
            src="https://github-readme-streak-stats.herokuapp.com/?user=sharvarihupare-369&theme=sea&hide_border=true&border_radius=10&date_format=j%20M%5B%20Y%5D&background=#a084ca"
            alt="streak-stat" />
          </Box>
          </Box>

          <Box>
          <Box display={"inline-block"}
            padding="10px"
            bgGradient="linear(to-r, #0ef, cyan.500)"
            borderRadius={"8px"}
            className="tech-skill-heading"
            data-aos="flip-right"
            marginBottom={{ base: "30px", sm: "20px" }}>
          <Heading size={"md"}>Github Stats-Card</Heading>
       </Box>

      
          <Box w="30%" m="30px auto" data-aos="fade-left">
           <Image id="github-stats-card"

            src="https://github-readme-stats.vercel.app/api?username=sharvarihupare-369&show_icons=true&title_color=#4c3575&text_color=#4c3575&icon_color=#4c3575&bg_color=red&border_radius=10&border_color=#4c3575"
            alt="stat-card" />
          </Box>
          </Box>

          <Box w="20%" m="30px auto">

         
          <Box  display={"inline-block"}
        //   data-aos="fade-"
            padding="10px"
            bgGradient="linear(to-r, #0ef, cyan.500)"
            borderRadius={"8px"}
            className="tech-skill-heading"
            data-aos="flip-right"
            marginBottom={{ base: "30px", sm: "20px" }}>
          <Heading size={"md"}>Most Used Languages</Heading>
       </Box>
          <Box data-aos="fade-right">
            <Image id="github-top-langs"
            src="https://github-readme-stats.vercel.app/api/top-langs/?username=sharvarihupare-369&title_color=4C3575&icon_color=#4c3575&text_color=#4c3575&bg_color=#a084ca&show_icons=true" alt='stat-top-lang' />
          </Box>
          </Box>
    </Box>
  )
}
