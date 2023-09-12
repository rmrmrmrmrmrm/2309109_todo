"use client";

import { v4 as uuidv4} from 'uuid';
import {
  Heading,
  Box,
  Button,
  Input,
  RadioGroup,
  Radio,
  Stack,
  Flex,
  Textarea,
  SelectField,
  FormControl,
} from "@chakra-ui/react";
import { useState } from "react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { BackButton } from "../components/button/BackButton";
import { useRouter } from "next/navigation";
import db from "../../firebase";

const initialTodo = {
  Task: "",
  Detail: "",
  Priority: "High",
  Status: "NOT STARTED",
};

const priorities = ["High", "Middle", "Low"];

export default function Create() {
  const router = useRouter();
  const [newTodo, setNewTodo] = useState(initialTodo);

  const hendleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTodo({ ...newTodo, [name]: value });
  };

  const handleSubmit = async () => {
    if (confirm("Todoリストを追加します。よろしいですか？")) {
      try {
        const collectionRef = collection(db, "posts");
        const todo = await addDoc(collectionRef, {
          ...newTodo,
          Id: uuidv4(),
          Create: serverTimestamp(),
          Update: serverTimestamp(),
        });
        console.log("todoが追加されました: ", todo);
        setNewTodo(initialTodo);
        router.push("/top");
      } catch (error) {
        alert("todoの登録に失敗しました。");
        console.log(error);
      }
    }
  };

  return (
    <>
      {/* 中身 */}
      <Box border={5} p={20} pt={5}>
        {/* Backボタン */}
        <Flex justify="end">
          <BackButton />
        </Flex>
        {/* Backボタン */}

        {/* TODOのタイトル設定 */}
        <FormControl onSubmit={handleSubmit}>
          <Heading as="h4" size="md">
            TITLE
          </Heading>
          <Input
            name="Task"
            rounded={8}
            h={16}
            size="md"
            placeholder="Text"
            _placeholder={{ color: "gray", fontWeight: "bold" }}
            value={newTodo.Task}
            onChange={hendleInputChange}
            required
          />
          {/* TODOのタイトル設定 */}

          {/* 詳細部分 */}
          <Heading as="h4" size="md" mt="15px">
            DETAIL
          </Heading>
          <Textarea
            name="Detail"
            rounded={8}
            rows={10}
            resize="none"
            size="md"
            placeholder="Text"
            _placeholder={{ color: "gray", fontWeight: "bold" }}
            value={newTodo.Detail}
            onChange={hendleInputChange}
          />
          {/* 詳細部分 */}

          {/* 優先順位の選択肢 */}
          <Box fontSize="20px" fontWeight="bold">
            <RadioGroup name="Priority" value={newTodo.Priority}>
              <Heading as="h4" size="md" mt="15px">
                PRIORITY
              </Heading>
              <Stack direction="row">
                {priorities.map((priority) => (
                  <Radio
                    key={priority}
                    value={priority}
                    checked={priority === SelectField}
                    onChange={hendleInputChange}
                  >
                    <Box fontSize="20px" pr={3}>
                      {priority}
                    </Box>
                  </Radio>
                ))}
              </Stack>
            </RadioGroup>
          </Box>
          {/* 優先順位の選択肢 */}

          {/* CREATEボタン */}
          <Flex justify="end">
            <Button
              onClick={handleSubmit}
              px={5}
              background={"green.500"}
              border="1px"
              borderColor="green.900"
              rounded="full"
              fontSize={18}
              color="white"
            >
              CREATE
            </Button>
          </Flex>
          {/* CREATEボタン */}
        </FormControl>
      </Box>
      {/* 中身 */}
    </>
  );
}
