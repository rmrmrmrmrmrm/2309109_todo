"use client";

import { AddIcon, DeleteIcon, EditIcon, SearchIcon } from "@chakra-ui/icons";
import {
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
import { useRouter } from "next/navigation";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import db from "../../firebase";
import { format } from "date-fns";
import Link from "next/link";

const Top = () => {
  //状態
  const [todos, setTodos] = useState([]);
  //画面遷移用
  const router = useRouter();

  //firebaseからデータを取得する
  useEffect(() => {
    const todoData = collection(db, "posts");
    //Updateを基準に降順で取得
    const q = query(todoData, orderBy("Update", "desc"));
    getDocs(q).then((snapShot) => {
      const getTodoData = snapShot.docs.map((doc) => {
        return {
          Create: format(doc.data().Create.toDate(), "yyyy-MM-dd HH:mm"),
          Detail: doc.data().Detail,
          Id: doc.data().Id,
          Priority: doc.data().Priority,
          Status: doc.data().Status,
          Task: doc.data().Task,
          Update: format(doc.data().Update.toDate(), "yyyy-MM-dd HH:mm"),
        };
      });
      setTodos(getTodoData);
      // console.log(todos)
    });
  }, []);

  //Createページに遷移する関数
  const linkToCreate = () => {
    //useRouterを使用した動的なページネーションの設定
    router.push("/create");
  };

  //Editページに遷移する関数
  const linkToEdit = (Id) => {
    //useRouterを使用した動的なページネーションの設定
    router.push(`/edit/${Id}`);
  };

  //Deleteボタン押下時に動く関数
  const DeleteTodo = (Id) => {
    //firebaseの中のデータを削除する（バック側）
    deleteDoc(doc(db, "posts", Id));
    //表示するための処理（フロント側）
    const deleteTodo = todos.filter((todo) => todo.Id !== Id);
    setTodos(deleteTodo);
  };

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
              onClick={linkToCreate}
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
                <Th width="12%">Create</Th>
                <Th width="12%">Update</Th>
                <Th width="12%">Action</Th>
              </Tr>
            </Thead>
            <Tbody>
              {/* TODO: Taskデータをここにマップして表示：ここから */}
              {todos.map((todo) => {
                return (
                  <Tr key={todo.Id}>
                    {" "}
                    {/* keyを設定 */}
                    <Td width="40%" p={1}>
                      <Link
                        href={`/show/${todo.Id}`}
                        style={{ cursor: "pointer" }}
                      >
                        {todo.Task}
                      </Link>
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
                        <option value="High">high</option>
                        <option value="Middle">middle</option>
                        <option value="Low">low</option>
                      </Select>
                    </Td>
                    <Td width="12%" p={2}>
                      {todo.Create}
                    </Td>
                    <Td width="12%" p={2}>
                      {todo.Update}
                    </Td>
                    <Td width="12%" p={1}>
                      <IconButton
                        icon={<EditIcon />}
                        size="xs"
                        ml={4}
                        onClick={() => {
                          linkToEdit(todo.Id);
                        }}
                      />
                      <IconButton
                        icon={<DeleteIcon />}
                        size="xs"
                        ml={4}
                        onClick={() => {
                          DeleteTodo(todo.Id);
                        }}
                      />
                    </Td>
                  </Tr>
                );
              })}
              {/* TODO: Taskデータをここにマップして表示：ここまで */}
            </Tbody>
            {/* TODO: ページネーション機能 */}
          </Table>
        </TableContainer>
      </Box>
    </>
  );
};

export default Top;
