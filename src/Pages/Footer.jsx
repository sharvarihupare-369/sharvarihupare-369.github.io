import { Box, Flex } from "@chakra-ui/react";
import React from "react";
import { FaGithub, FaHeart, FaLinkedin } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <Flex
      gap="15px"
      boxSizing="border-box"
      alignItems={"center"}
      flexDirection={{
        base: "column",
        sm: "column",
        md: "column",
        lg: "row",
        xl: "row",
        "2xl": "row",
      }}
      color={"gray.300"}
      fontSize={"20px"}
      bg={"black"}
      p={"10px"}
      justifyContent="space-between"
    >
      <Box fontWeight={"bold"} color={"#0ef"}>
        {"< S/>"}
      </Box>
      <Box display={"flex"} alignItems={"center"}>
        Made with{" "}
        <span>
          {" "}
          <FaHeart color="red" style={{ margin: "0 5px" }} />
        </span>{" "}
        by{" "}
        <span style={{ color: "#0ef", marginLeft: "3px" }}>
          {" "}
          Sharvari Hupare !
        </span>
      </Box>
      <Flex alignItems={"center"}>
        <Link
          target="_blank"
          id="contact-github"
          to="https://github.com/sharvarihupare-369"
        >
          <FaGithub fontSize={"35px"} />
        </Link>
        <Link
          target="_blank"
          id="contact-linkedin"
          to="https://www.linkedin.com/in/sharvari-hupare15/"
        >
          <FaLinkedin
            style={{ marginLeft: "20px" }}
            color="#0e76a8"
            fontSize={"35px"}
          />
        </Link>
      </Flex>
    </Flex>
  );
};

export default Footer;
