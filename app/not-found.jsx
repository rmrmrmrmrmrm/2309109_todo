"use client";

import Head from "next/head";
import Link from "next/link";
import { Heading, Box, Button, Text } from "@chakra-ui/react";

const NotFound = () => {
  return (
    <>
      <Head>
        <title>Not Found</title>
        <meta name="description" content="Team Development 11th" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <Box align="center" my={24}>
        <Text fontSize="4xl" lineHeight={1} fontWeight="700">
          404
        </Text>
        <Text fontSize="lg" my={5}>
          This is not the web page you are looking for.
        </Text>
        <Link href={"/"}>
          <Button
            background={"green.300"}
            borderColor={"green.300"}
            color={"white"}
            variant="solid"
          >
            TOP
          </Button>
        </Link>
      </Box>
    </>
  );
};

export default NotFound;
