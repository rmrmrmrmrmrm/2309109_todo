"use client";

import { AddIcon, DeleteIcon, EditIcon, SearchIcon } from "@chakra-ui/icons";
import {
  Heading,
  FormControl,
  FormLabel,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Box,
  HStack,
  Button,
  Select,
  Input,
  InputRightElement,
  InputGroup,
  IconButton,
  Spacer,
} from "@chakra-ui/react";

const Top = () => {
  return (
    <>
      <Box px={20} py={6}>
        <HStack mb={4}>
          <HStack spacing={2}>
            <FormControl>
              <FormLabel>SEARCH</FormLabel>
              <InputGroup size="sm">
                <InputRightElement>
                  <IconButton icon={<SearchIcon />} size="sm" />
                </InputRightElement>
                <Input placeholder="タスクを検索" />
              </InputGroup>
            </FormControl>
            <FormControl>
              <FormLabel>STATUS</FormLabel>
              <Select placeholder="状態を選択" size="sm">
                <option>未完了</option>
                <option>完了</option>
              </Select>
            </FormControl>
            <FormControl>
              <FormLabel>PRIORITY</FormLabel>
              <Select placeholder="重要度を選択" size="sm">
                <option>高</option>
                <option>中</option>
                <option>低</option>
              </Select>
            </FormControl>
            <Box>
              <Button variant="outline" colorScheme="gray" rounded="full">
                RESET
              </Button>
            </Box>
          </HStack>
          <Spacer />
          <Box>
            <IconButton
              icon={<AddIcon />}
              colorScheme="teal"
              rounded="full"
              mr={2}
            >
              Task作成
            </IconButton>
          </Box>
        </HStack>
        <TableContainer>
          <Table variant="simple">
            <Thead bgColor="green.300">
              <Tr>
                <Th width="40%">Task</Th>
                <Th width="12%">Status</Th>
                <Th width="12%">Priority</Th>
                <Th width="12%">作成日</Th>
                <Th width="12%">更新日</Th>
                <Th width="12%">Action</Th>
              </Tr>
            </Thead>
            <Tbody>
              {/* TODO: Taskデータをここにマップして表示 */}
              <Tr>
                <Td width="40%" p={1}>
                  Next.jsでTodoサイトを作成
                </Td>
                <Td width="12%" p={1}>
                  <Button
                    p={2}
                    bgColor="green.100"
                    rounded="full"
                    textAlign="center"
                  >
                    DOING
                  </Button>
                </Td>
                <Td width="12%" p={1}>
                  <Select size="sm">
                    <option>高</option>
                    <option>中</option>
                    <option>低</option>
                  </Select>
                </Td>
                <Td width="12%" p={1}>
                  yyyy-mm-dd
                </Td>
                <Td width="12%" p={1}>
                  yyyy-mm-dd
                </Td>
                <Td width="12%" p={1}>
                  <IconButton icon={<EditIcon />} size="xs" ml={4} />
                  <IconButton icon={<DeleteIcon />} size="xs" ml={4} />
                </Td>
              </Tr>
            </Tbody>
            {/* TODO: ページネーション機能 */}
          </Table>
        </TableContainer>
      </Box>
    </>
  );
};

export default Top;
