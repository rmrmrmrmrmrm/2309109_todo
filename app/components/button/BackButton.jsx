"use client";

import {Button} from '@chakra-ui/react'
import Link from 'next/link';

export const BackButton = () => {
  return (
    <>
        <Link href="/top">
          <Button w='90px' bgColor="green.300" rounded="full" textAlign="center" border='1px' borderColor='black'>
            Back
          </Button>
        </Link>
    </>
  )
}

