'use client'

import { Heading, Box, Button, Input, RadioGroup, Radio, Stack, Flex, Textarea } from "@chakra-ui/react";
import { useState } from "react";

export default function Create() {
   const [value, setValue] = useState('high')
  return(
    <div>
    {/* ヘッダー */}   
      <Box background={"green.300"} p={3} px={50}>
        <Heading as='h2' size='2xl'>
          TODO
        </Heading>
      </Box>
    {/* ヘッダー */}
  
    {/* 中身 */}
      <Box border={5} p={20} pt={5}>

      {/* Backボタン */}
      <Flex justify="end">
        <Button px={8} background={"green.300"} border='1px' borderColor='green.600' rounded="full">
          Back
        </Button>
      </Flex>
      {/* Backボタン */}

      {/* TODOのタイトル設定 */}
        <Heading as='h4' size='md'>
          TITLE
        </Heading>
          <Input
            defaultValue=""
            rounded={8}
            h={16}
            size='md'
            placeholder="Text"
            _placeholder={{ color: 'black', fontWeight: 'bold' }}
          />
      {/* TODOのタイトル設定 */}

      {/* 詳細部分 */}
        <Heading as='h4' size='md' mt='15px'>
          DETAIL
        </Heading>
          <Textarea
            defaultValue=""
            rounded={8}
            rows={10}
            resize="none"
            size='md'
            placeholder="Text"
            _placeholder={{ color: 'black', fontWeight: 'bold' }}
          />
      {/* 詳細部分 */}

      {/* 優先順位の選択肢 */}
      <Box fontSize="20px" fontWeight="bold">
        <RadioGroup 
          onChange={setValue} value={value}
        >
          <Heading as='h4' size='md' mt='15px'>
            PRIORITY
          </Heading>
          <Stack direction='row'>
            <Radio value='high'>
              <Box fontSize="20px" pr={3}>High</Box>
            </Radio>
            <Radio value='middle'>
              <Box fontSize="20px" pr={3}>Middle</Box>
            </Radio>
            <Radio value='low'>
              <Box fontSize="20px">Low</Box>
            </Radio>
          </Stack>
        </RadioGroup>
      </Box>
      {/* 優先順位の選択肢 */}  

      {/* CREATEボタン */}
      <Flex justify="end">
        <Button px={5} background={"green.500"} border='1px' borderColor='green.900' rounded="full" fontSize={18} color="white">
          CREATE
        </Button>
      </Flex>
      {/* CREATEボタン */}
    </Box>
    {/* 中身 */}
    
  </div>
  )
}