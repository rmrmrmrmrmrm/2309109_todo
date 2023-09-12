"use client";

import { EditIcon } from '@chakra-ui/icons'
import {Box,Button,Flex,Text,Heading,Spacer} from '@chakra-ui/react'
import { BackButton } from "../components/button/BackButton"

const Show = () => {
  return (
    <>
      {/* ヘッダー */}
      <Heading bg="#68D391" h="50px" mb={5} pl="50px" pr='30px' alignItems="center">
        <Flex>
         <Text>
          TODO
         </Text>
         <Spacer />
         <Button mt='5px'>
          LOGOUT
         </Button>
        </Flex>
      </Heading>

      {/* コンテンツ */}
      <Box m='0 auto' maxW='1080px'>{/* コンテンツ部分の最大幅と横の余白 */}

        {/* CommentボタンとBackボタン */}
        <Flex mb='20px' justify="end">
          <Button mr='20px' w='90px' bgColor="green.700" rounded="full" color='white' textAlign="center" border='1px' borderColor='black'>
            Comment
          </Button>
          <BackButton />
        </Flex>

        {/* Todoリスト部分 */}
        <Flex>
          <Box w='55%' border='1px' borderColor='gray' p={2} mr='20px' borderRadius='10px' >
            <Box bg="#68D391">
              <Text as='b'>TITLE</Text>
            </Box>                        
            <Text mb='20px'>ここにテキストが入ります。</Text>
            <Box bg="#68D391">
              <Text as='b'>DETAIL</Text>
            </Box> 
            <Text mb='20px'>
              ここにテキストが入ります。ここにテキストが入ります。ここにテキストが入ります。ここにテキストが入ります。ここにテキストが入ります。ここにテキストが入ります。ここにテキストが入ります。ここにテキストが入ります。ここにテキストが入ります。ここにテキストが入ります。ここにテキストが入ります。ここにテキストが入ります。ここにテキストが入ります。ここにテキストが入ります。ここにテキストが入ります。
            </Text>
            <Flex mb='20px'>
              <Button w='25%' mr='30px' bgColor="green.300" rounded="full" textAlign="center" border='1px' borderColor='black'>
                Edit
                <EditIcon ml='2'/>
              </Button>
              <Box w='35%'>
                <Text>Create</Text>
                <Text>yyyy-mm-dd-tt:tt</Text>
              </Box>
              <Box w='35%'>
                <Text>Update</Text>
                <Text>yyyy-mm-dd-tt:tt</Text>
              </Box>
            </Flex>
          </Box> 

          {/* コメント部分 */}
          <Box mb='20px' border='1px' borderColor='gray' h='120px' w='45%'borderRadius='5px'>
            <Flex bgColor="green.600" color='white' px={3}>
              <Text>ジョン</Text>
              <Spacer />
              <Text>yyyy/mm/dd</Text>
            </Flex>
            <Text px={2}>ここにテキストが入ります。</Text>
          </Box>
        </Flex>
      </Box>
    </>
  )
}

export default Show;