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
  Spacer,
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
  orderBy,
} from "firebase/firestore";
import db from "../../../firebase";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const Show = () => {
  // id
  const pathname = usePathname();
  const segments = pathname.split("/");
  const id = segments[segments.length - 1];
  if (id == "show") {
    router.push(`/404`);
  }
  // State
  const [todos, setTodos] = useState([]);
  const [comments, setComments] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const router = useRouter();

  // Todoリスト
  const postsCol = collection(db, "posts");
  const queryRef = query(postsCol, where("Id", "==", id));
  const fetchData = async () => {
    console.log("Todo取得");
    try {
      const querySnapshot = await getDocs(queryRef);
      const todoDocObj = querySnapshot.docs[0];
      if (todoDocObj) {
        const data = todoDocObj.data();
        const formattedCreate = format(data.Create.toDate(), "yyyy-MM-dd HH:mm");
        const formattedUpdate = format(data.Update.toDate(), "yyyy-MM-dd HH:mm");
        setTodos({
          Create: formattedCreate,
          Detail: data.Detail,
          Task: data.Task,
          Update: formattedUpdate,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  // コメント表示
  const fetchComment = async () => {
    console.log("コメント取得");
    try {
      const cmtCol = collection(db, "comments");
      const cmtQueryRef = query(cmtCol, where("Id", "==", id), orderBy("commentCreate", "desc"));
      getDocs(cmtQueryRef).then((cmtSnapShot) => {
        const cmtObj = cmtSnapShot.docs.map((doc) => {
          return {
            commentId: doc.data().commentId,
            commentName: doc.data().commentName,
            commentDetail: doc.data().commentDetail,
            commentCreate: format(doc.data().commentCreate.toDate(), "yyyy-MM-dd HH:mm"),
          };
        });
        setComments(cmtObj);
      });
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchComment();
  }, []);

  // コメント追加
  const addComment = async (e) => {
    e.preventDefault();
    try {
      const { commentName, commentDetail } = e.target.elements;
      const newComment = doc(collection(db, "comments"));
      const comdetail = commentDetail.value;
      const comname = commentName.value;
      await setDoc(newComment, {
        Id: id,
        commentCreate: Timestamp.now(),
        commentDetail: comdetail,
        commentId: newComment.id,
        commentName: comname,
      });
      e.target.reset();
      onClose();
      fetchComment();
    } catch (error) {
      // console.log(error);
    }
  };

  const linkToEdit = () => {
    router.push(`/edit/${id}`);
  };

  return (
    <>
      {/* コンテンツ */}
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

        <Flex align="flex-start">
          {/* Todoリスト部分 */}
          <Box w="55%" border="1px" borderColor="gray" p={2} mr="20px" borderRadius="10px">
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
                onClick={linkToEdit}
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

          {/* コメント部分 */}
          <Box w="45%">
            {comments.map((comment) => {
              return (
                <Box
                  mb="20px"
                  border="1px"
                  borderColor="gray"
                  borderRadius="5px"
                  key={comment.commentId}
                >
                  <Flex bgColor="green.600" color="white" px={3}>
                    <Text>{comment.commentName}</Text>
                    <Spacer />
                    <Text textAlign="right">{comment.commentCreate}</Text>
                  </Flex>
                  <Text p={3}>{comment.commentDetail}</Text>
                </Box>
              );
            })}
          </Box>
        </Flex>
      </Box>
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
            <form onSubmit={addComment} style={{ width: "100%" }}>
              <Box>
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
