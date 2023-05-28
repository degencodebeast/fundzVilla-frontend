import React, { useEffect, useState } from 'react'
import {
  Box,
  Heading,
  Link,
  Image,
  Text,
  Divider,
  HStack,
  Tag,
  Wrap,
  WrapItem,
  SpaceProps,
  useColorModeValue,
  Container,
  VStack,
  FormControl,
  FormLabel,
  Textarea,
  Button,
  Modal,
  Center,
  ModalBody,
  ModalContent,
  ModalOverlay,
  Spinner,
  useToast,
  Input,
} from '@chakra-ui/react'
import { Navbar } from '@/components'
import { useRouter } from 'next/router'
import { Web3Storage } from 'web3.storage'
import { readContract } from '@wagmi/core'
import { Address } from 'wagmi'
import axios from 'axios'
import { getAccount, prepareWriteContract, writeContract } from '@wagmi/core'

const token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweEQyQkNCYTBDQzMyMDJjMmZkQkUzMjFhZjdmODBiOEQ2NzZCRTkyOTciLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2Nzk4OTI0NzE5OTYsIm5hbWUiOiJUb2tlbiJ9.QQbjt0glkuKqkJ-C4-5q8LOGUFIIhjaIX7FZHohSQhw'

type Comment = {
  comment_address: Address
  comment_content: string
}

type Post = {
  post_ID: number
  post_image: any
  post_title: string
  post_description: string
  post_content: string
  post_category: string
  poster_address: any
  comments: Comment[]
}

export const Campaign = () => {
  const router = useRouter()

  const post = router.query.postSCAddress as Address
  const post_id = router.query.post_Id as string
  const toast = useToast()


  const [postCID, setPostCID] = useState('')
  const [latestCID, setLatestCID] = useState('')
  const [loading, setLoading] = useState(false)
  const [title, setTitile] = useState('')
  const [body, setBody] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  const [author, setAuthor] = useState('')
  const [numberOfComments, setNumberOfcomments] = useState(0)
  const [commentContent, setCommentContent] = useState('')
  const [currentPostData, setCurrentPostData] = useState<Post>({
    post_ID: 0,
    post_image: '',
    post_title: '',
    post_description: '',
    post_content: '',
    post_category: '',
    poster_address: '',
    comments: [],
  })
  const [comments, setComments] = useState<Comment[]>([])

  const [description, setDescription] = useState('')
  const toastError = (msg: string) => {
    return toast({
      title: msg,
      status: 'error',
      duration: 9000,
      isClosable: true,
    })
  }

  const toastSuccess = (msg: string, description: string) => {
    return toast({
      title: msg,
      description: description,
      status: 'success',
      duration: 5000,
      isClosable: true,
    })
  }

  const getPostData = async () => {
    
    try {
//       if(!post) {
//         router.push('/')
//       }
//       const postCID: any = await readContract({
//         address: post,
//         abi: BLOG_POST_ABI,
//         functionName: 'postCID',
//       })
//       setPostCID(postCID)
//       const numComments: any = await readContract({
//         address: post,
//         abi: BLOG_POST_ABI,
//         functionName: 'commentListLength',
//       })
//       setNumberOfcomments(numComments.toNumber())

//       const comments: any = await readContract({
//         address: post,
//         abi: BLOG_POST_ABI,
//         functionName: 'getComments',
//       })
//       console.log(comments)
//       let new_comment = []
//       for (let i = 0; i < comments.length; i++) {
//         console.log(`COmment1`, comments[i])

//         let config: any = {
//           method: 'get',
//           url: `https://${comments[i]}.ipfs.w3s.link/post.json`,
//           headers: {},
//         }
//         const axiosResponse = await axios(config)
//         const data = axiosResponse.data

//         const commentData: Comment = {
//           comment_address: data.comment_address,
//           comment_content: data.comment_content,
//         }
//         new_comment.push(commentData)
//       }
//       setComments(new_comment)
    } catch (error) {
      console.log(error)
    }
  }

  const getPostDetails = async () => {
    try {
      let config: any = {
        method: 'get',
        url: `https://${postCID}.ipfs.w3s.link/post.json`,
        headers: {},
      }
      const axiosResponse = await axios(config)
      const data = axiosResponse.data[post_id]
      setCurrentPostData(data)
      setTitile(data.post_title)
      setBody(data.post_content)
      setImageUrl(data.post_image)
      setDescription(data.post_description)
      setAuthor(data.poster_address)
    } catch (error) {
      console.log(error)
    }
  }


  const postComment = async (e: any) => {
    e.preventDefault();
    try {
      setLoading(true)
    const account = getAccount();
    if(!account) {
      return alert(`Please connect your wallet`)
    }
    const storage = new Web3Storage({ token })
    const userComment = {
      comment_address: account.address as Address,
      comment_content: commentContent,
    }

    //store new JSON object in IPFS
    const buffer = Buffer.from(JSON.stringify(userComment))

    const newfile = [new File([buffer], 'post.json')]
    const newCid = await storage.put(newfile)
    console.log(`Posted comment to: `, newCid)

    // const configure = await prepareWriteContract({
    //   address: BLOG_MANAGER_CONTRACT_ADDRESS,
    //   abi: BLOG_MANAGER_ABI,
    //   functionName: 'addComment',
    //   args: [newCid, post],
    // })
    // const data = await writeContract(configure)

    // const tx = await data.wait()
    toastSuccess('Comment Added', 'Successfully added comment')
    getPostDetails()
    getPostData
    
    setLoading(false)
    setCommentContent('');
      
    } catch (error) {
      toastError('Oops!, something went wrong, please try again')
      setLoading(false)


      
    }
    
  }

  useEffect(() => {
    const updateData = async ()=>{
      await getPostData()
      await getPostDetails()
    }
    updateData();
    
  }, )

  return (
    <>
      <Navbar />
      <Modal
        isOpen={loading}
        onClose={() => {
          !loading
        }}
        isCentered
      >
        <ModalOverlay />
        <ModalContent>
          <ModalBody>
            <Center>
              <Spinner
                thickness="4px"
                speed="0.65s"
                emptyColor="gray.200"
                color="blue.500"
                size="xl"
              />
            </Center>
          </ModalBody>
        </ModalContent>
      </Modal>

      <main
      className={`main-color flex min-h-screen flex-col items-center justify-between p-24 `}
    >

      <Container maxW={'7xl'} p="12">
        <Heading as="h6">Campaign</Heading>
        <Box
          marginTop={{ base: '1', sm: '5' }}
          display="flex"
          flexDirection={{ base: 'column', sm: 'row' }}
          justifyContent="space-between"
        >
          <Box
            display="flex"
            flex="1"
            marginRight="3"
            position="relative"
            alignItems="center"
          >
            <Box
              width={{ base: '90%', sm: '55%' }}
              zIndex="2"
              marginLeft={{ base: '0', sm: '5%' }}
              marginTop="5%"
            >
              <Link textDecoration="none" _hover={{ textDecoration: 'none' }}>
                <Image
                  borderRadius="lg"
                  src={`https://ipfs.io/ipfs/${imageUrl}`}
                  alt="campaignBanner"
                  objectFit="contain"
                />
              </Link>
            </Box>
            <Box
              zIndex="1"
              width="100%"
              position="absolute"
              height="100%"
            ></Box>
          </Box>
          <Box
            display="flex"
            flex="1"
            flexDirection="column"
            justifyContent="center"
            marginTop={{ base: '3', sm: '0' }}
          >
            <Heading marginTop="1">
              <Link textDecoration="none" _hover={{ textDecoration: 'none' }}>
                {title}
              </Link>
            </Heading>
            <Text
              as="p"
              marginTop="2"
              color={useColorModeValue('gray.700', 'gray.200')}
              fontSize="lg"
            >
              {description}
            </Text>
            <Divider marginTop="5" mb={5} />
            <Text>By: {author}</Text>
            {/* <Text>Posted: 2023-04-06T19:01:27Z</Text> */}
          </Box>
        </Box>

        <Divider marginTop="5" />

        <VStack paddingTop="40px" spacing="2" alignItems="flex-start">
          <Heading as="h2">{title}</Heading>
          <Text as="p" fontSize="lg" width={'89%'}>
            {body}
          </Text>
        </VStack>
        <Divider marginTop="5" mb={5} />
        <Heading> {numberOfComments} Donor(s)</Heading>

        {comments.map((data) => {
        
          return (
            <>
              <Text>Donation by: {data.comment_address}</Text>
              <Text>Message: {data.comment_content} </Text>
              <Divider marginTop="5" mb={5} />
            </>
          )
        })}
        <Divider marginTop="5" mb={5} />

        

        <FormControl mb={4}>
          Donate 
          <FormLabel>Donate : </FormLabel>
          <Input
            width={'50%'}
            onChange={(e) => setCommentContent(e.target.value)}
            placeholder='Amount'
          />
        </FormControl>
        <Button onClick={postComment} type="submit" colorScheme="teal">
        </Button>
      </Container>
      </main>
    </>
  )
}

export default Campaign