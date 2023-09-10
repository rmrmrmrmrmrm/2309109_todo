"use client";

import {Input, Textarea, Button, FormControl, FormLabel, Box, Text,Center,} from '@chakra-ui/react'

const ModalPage = () => {
  return (
    <>
      {/* モーダル部分 */}
      <Center>
        <Box w='480px' h='480px'px={5} py={5} mt="120px" border='1px' borderColor='gray' borderRadius='10px'>
          <Text fontSize='5xl' as='b'>Comment</Text>
          
          {/* 名前入力部分 */}
          <FormControl mt='16px' mb='10px'>
            <FormLabel>Name</FormLabel>
            <Input size='lg' />
          </FormControl>

          {/* コメント入力部分 */}
          <FormControl marginBottom="16px">
            <FormLabel>Your Comment</FormLabel>
            <Textarea  h='160px' resize='none' />
          </FormControl>

          {/* Createボタン */}
          <Button bgColor="green.600" w='100%' color='white' border='1px' borderColor='black' borderRadius='10px'>
            CREATE
          </Button>
        </Box>
      </Center>
    </>
  )
}

export default ModalPage;