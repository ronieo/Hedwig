import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import withAuth from '@/routes/ProtectedRoute'
import { useQuery, useQueryClient } from 'react-query'
import { queryKeys } from '@/constants/queryKey'
import { getPost } from '@/apis/Post'
import PostCard from '@/components/cards/postCard'
import CommentInput from '@/components/cards/commentInput'
import CommentCard from '@/components/cards/commentCard'
import { getCookie } from '@/utils/cookies'

import { userPayload } from '@/types/Auth'
import { getComments } from '@/apis/Comment'
import IconButton from '@mui/material/IconButton'

import ArrowBack from '@mui/icons-material/ArrowBack'
import theme from '@/styles/styles'
interface Comment {
    postId: number
    comment: string
    commentId: number
    userName: string
    createdAt: Date
    updatedAt: Date
}
const PostDetail = () => {
    const router = useRouter()
    const id = Number(router.query.id)
    const [comments, setComments] = useState([])

    const { data: singlePost, isLoading: postLoading } = useQuery(queryKeys.post.post(id), () => getPost(id), {
        enabled: !!id // id 값이 있을 때만 요청하도록 설정
    })
    const { data: commentsData, isLoading: commentsLoading } = useQuery('comments', () => getComments(id), {
        enabled: !!id // id 값이 있을 때만 요청하도록 설정
    })

    useEffect(() => {
        if (!commentsLoading && commentsData) {
            const recentSortedComments = commentsData.sort((comp1: Comment, comp2: Comment) => {
                return new Date(comp2.updatedAt).getTime() - new Date(comp1.updatedAt).getTime()
            })

            setComments(recentSortedComments)
        }
    }, [commentsLoading, commentsData])

    const storedUserInfo = useQueryClient().getQueryData<userPayload>(queryKeys.auth.verify(getCookie('accessToken')))
    const authUserName = storedUserInfo?.content?.username

    if (postLoading || commentsLoading) {
        return <div>Loading...</div>
    }

    let isCurrentUserPost = false
    let isCurrentUserComment = false


    if (singlePost) {
        isCurrentUserPost = authUserName === singlePost.userName
    }


    return (
        <>
            <IconButton href="/post" aria-label="back" sx={{ color: `${theme.palette.primary.main}` }}>
                <ArrowBack />
            </IconButton>
            <PostCard {...singlePost} isDetailPost={true} moreBtn={isCurrentUserPost} />
            <CommentInput profileImg="/default.png" userName={authUserName ? authUserName : ' '} />
            {comments.map((comment: Comment) => {
                 isCurrentUserComment = authUserName === comment.userName
               return <CommentCard key={comment.commentId} {...comment} moreBtn={isCurrentUserComment} />
            })}
        </>
    )
}

export default withAuth(PostDetail)
