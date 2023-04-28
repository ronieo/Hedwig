// CommentInput.tsx
import React from 'react'
import { useRouter } from 'next/router'
import { useMutation, useQueryClient } from 'react-query'
import { createComment } from '@/apis/Comment'

import CustomCard from '../customCard'
import CommentEdit from '../commentEdit'
import { queryKeys } from '@/constants/queryKey'

interface CommentInputProps {
    profileImg: string
    userName: string
}

function CommentInput({ profileImg, userName }: CommentInputProps) {
    const router = useRouter()
    const postId = Number(router.query.id)
    const queryClient = useQueryClient()
    const { mutate } = useMutation((variables: { content: string, postId: number }) => createComment(variables), {
        onSuccess: () => {
            queryClient.invalidateQueries('comments');
            queryClient.invalidateQueries(queryKeys.post.post(postId));
        },
        onError: (error) => {
            console.log(error)
        },
    })

    const handleCommentSubmit = (content: string) => {
        mutate({ content: content, postId: postId })
    }

    return (
        <CustomCard profileImg={profileImg} userName={userName} timeStamp="" moreBtn={false}>
            <CommentEdit resetOnSubmit={false}  initialContent="" isReadOnly={false} onSubmit={handleCommentSubmit} />
        </CustomCard>
    )
}

export default CommentInput
