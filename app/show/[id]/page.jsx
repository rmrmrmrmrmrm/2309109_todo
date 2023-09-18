"use client";

import { EditIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Flex,
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  useDisclosure,
  Input,
  Textarea,
  FormControl,
  FormLabel,
  Center,
} from "@chakra-ui/react";
import { BackButton } from "../../components/button/BackButton";
import { usePathname } from "next/navigation";
import {
  collection,
  doc,
  getDocs,
  setDoc,
  query,
  where,
  Timestamp,
} from "firebase/firestore";
import db from "../../../firebase";
import { format } from "date-fns";
import { useEffect, useState } from "react";
// import { useForm } from "react-hook-form";

const Show = () => {
  // useRouterを使用して現在いるページのidを取得する
  const pathname = usePathname();
  const segments = pathname.split("/");
  const id = segments[segments.length - 1];
  // todo詳細の表示
  const [todos, setTodos] = useState([]);
  // firebaseからpostsコレクションをを取得
  const postsCol = collection(db, "posts");
  // Firestoreのクエリ where を使用して条件を指定
  const queryRef = query(postsCol, where("Id", "==", id));
  (async () => {
    try {
      // getDocs 関数を使用してデータを取得
      // getDocs関数の前に await を追加し、データの取得を非同期で待ってから次の行を実行する
      const querySnapshot = await getDocs(queryRef);
      const todoDocObj = querySnapshot.docs[0];
      if (todoDocObj) {
        const data = todoDocObj.data();
        // データを使用して何かを行う
        // console.log(data);
        // toDate()を使用してFirebaseのTimestampをDateオブジェクトに変換
        const formattedCreate = format(
          data.Create.toDate(),
          "yyyy-MM-dd HH:mm"
        );
        const formattedUpdate = format(
          data.Update.toDate(),
          "yyyy-MM-dd HH:mm"
        );
        setTodos({
          Create: formattedCreate,
          Detail: data.Detail,
          Task: data.Task,
          Update: formattedUpdate,
        });
      }
    } catch (error) {
      // console.log("idが一致しない" + error);
    }
  })();

  // コメント取得

  // コメント追加
  const addComment = async (e) => {
    e.preventDefault();
    try {
      const { commentName, commentDetail } = e.target.elements;
      const newComment = doc(collection(db, "comments"));
      const comdetail = commentDetail.value; // 入力フィールドから値を取得
      const comname = commentName.value; // 入力フィールドから値を取得
      await setDoc(newComment, {
        Id: id,
        commentCreate: Timestamp.now(),
        commentDetail: comdetail, // 取得したコメント詳細を使用
        commentId: newComment.id,
        commentName: comname, // 取得したコメント名を使用
      });
      // フォームをクリア
      commentName.value = ""; // コメント名フィールドをクリア
      commentDetail.value = ""; // コメント詳細フィールドをクリア
      // モーダル閉じる
      onClose();
      // fetchComment();
    } catch (error) {
      console.log("コメント登録失敗" + error);
    }
  };

  // モーダル開閉(chakra-ui オプション)
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Box m="0 auto" maxW="1080px">
        {/* コンテンツ部分の最大幅と横の余白 */}

        {/* CommentボタンとBackボタン */}
        <Flex mb="20px" justify="end">
          <Button
            mr="20px"
            w="90px"
            bgColor="green.700"
            rounded="full"
            color="white"
            textAlign="center"
            border="1px"
            borderColor="black"
            onClick={onOpen}
          >
            Comment
          </Button>
          <BackButton />
        </Flex>
      </Box>

      {/* Todoリスト部分 */}
      <Flex>
        <Box
          w="55%"
          border="1px"
          borderColor="gray"
          p={2}
          mr="20px"
          borderRadius="10px"
        >
          <Box bg="#68D391">
            <Text as="b">TITLE</Text>
          </Box>
          <Text mb="20px">{todos.Task}</Text>
          <Box bg="#68D391">
            <Text as="b">DETAIL</Text>
          </Box>
          <Text mb="20px">{todos.Detail}</Text>
          <Flex mb="20px">
            <Button
              w="25%"
              mr="30px"
              bgColor="green.300"
              rounded="full"
              textAlign="center"
              border="1px"
              borderColor="black"
            >
              Edit
              <EditIcon ml="2" />
            </Button>
            <Box w="35%">
              <Text>Create</Text>
              <Text>{todos.Create}</Text>
            </Box>
            <Box w="35%">
              <Text>Update</Text>
              <Text>{todos.Update}</Text>
            </Box>
          </Flex>
        </Box>
      </Flex>

      {/* モーダル */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent
          minWidth="none"
          w="480px"
          h="480px"
          px={5}
          py={5}
          mt="120px"
          border="1px"
          borderColor="gray"
          borderRadius="10px"
        >
          <Text fontSize="5xl" as="b">
            Comment
          </Text>
          <Center>
            <form onSubmit={addComment}>
              <Box w="100%">
                {/* 名前入力部分 */}
                <FormControl mt="16px" mb="10px">
                  <FormLabel>Name</FormLabel>
                  <Input
                    size="lg"
                    id="commentName"
                    name="commentName"
                    type="commentName"
                    placeholder="Name"
                  />
                </FormControl>
                {/* コメント入力部分 */}
                <FormControl marginBottom="16px">
                  <FormLabel>Your Comment</FormLabel>
                  <Textarea
                    h="160px"
                    resize="none"
                    id="commentDetail"
                    name="commentDetail"
                    type="commentDetail"
                    placeholder="Your Comment"
                  />
                </FormControl>
                {/* Createボタン */}
                <Button
                  bgColor="green.600"
                  w="100%"
                  color="white"
                  border="1px"
                  borderColor="black"
                  borderRadius="10px"
                  type="submit"
                >
                  CREATE
                </Button>
              </Box>
            </form>
          </Center>
        </ModalContent>
      </Modal>
    </>
  );
};

export default Show;
