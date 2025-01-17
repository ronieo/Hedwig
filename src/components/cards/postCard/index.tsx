import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'

import { StyledCardContent, StyledCardMedia, StyledPostFooter } from '../styles'
import FavoriteBorder from '@mui/icons-material/FavoriteBorder'
import Favorite from '@mui/icons-material/Favorite'
import ChatBubbleOutline from '@mui/icons-material/ChatBubbleOutline'

import CustomCard from '../customCard'

import { MouseEvent, useState } from 'react'
import { useMutation,  useQueryClient } from 'react-query'
import {  likePost } from '@/apis/Post'
import { timeSince } from '@/utils/timeSince'
import { PostCardData } from '@/types/Card'
import CustomDrawer, { DrawerType, POST_UTIL_TYPE } from '@/components/customDrawer'
import { useRouter } from 'next/router'
import { queryKeys } from '@/constants/queryKey'

/**
 * @example 
 * <PostCard userName={userName} content={content} createdAt={createdAt} updatedAt={updatedAt} />
 * 또는
 * <PostCard {{ ...PostCardData, isDetailPost, isLiked }} />
 
 * @property {string} props.userName - 사용자 이름입니다.
 * @property {string} props.content - 게시글 들어갈 내용입니다.
 * @property {Date} props.createdAt - 게시글 작성 시 생성된 Date 객체입니다
 * @property {Date} props.updatedAt - 게시글 수정 시 생성된 Date 객체입니다.
 * @property {string} props.img? - 게시글 미디어카드에 들어갈 이미지 파일 입니다.
 * @property {number} props.likesCount - 게시글에 달린 좋아요 수 입니다.
 * @property {number} props.commentsCount - 게시글에 달린 댓글 수 입니다.
 * @property {boolean} props.isLiked - 현재 사용자가 해당 게시글에 좋아요를 했는지의 여부입니다.
 * @property {boolean} props.isDetailPost - 현재 게시글이 상세 페이지에 보여지는지의 여부입니다.
 * @property {boolean} props.moreBtn - More 버튼 여부입니다.
 * @return {JSX.Element} 게시글 카드 컴포넌트를 반환합니다.
 
 * @description PostCardData는 `@/types/Card.ts`또는 CommentCard 컴포넌트 상단의 import에서 `command + click`으로 확인 가능합니다.
 * @date 2023.04.23
 * 
 * @author 임성열
 */
function PostCard({ userName, content, createdAt, updatedAt, postId, img, likesCount, commentsCount, isLiked, isDetailPost, moreBtn }: PostCardData) {
    // 게시글 좋아요 표시 여부
    const [liked, setLiked] = useState(isLiked)
    const [open, setOpen] = useState(false)
    const [curLikesCount, setCurLikesCount] = useState(Number(likesCount))

    const [isPostDrawerOpen, setIsPostDrawerOpen] = useState(false)
    // 미디어 카드 토글
    const handleClickOpen = () => {
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)
    }

    const togglePostDrawer = () => {
        setIsPostDrawerOpen((prev) => !prev)
    }

    const propCreatedAt = new Date(createdAt)
    const propUpdatedAt = new Date(updatedAt)

    // 작성시간과 수정시간이 같다면 작성된 시간 기준으로 문자열 생성
    // 그게 아니라면 수정이 된 것이므로 수정시간을 기준으로 문자열 생성
    const timeStamp = propCreatedAt === propUpdatedAt ? timeSince(propCreatedAt) + ' 작성됨' : timeSince(propUpdatedAt) + ' 수정됨'

    const queryClient = useQueryClient()
    const { mutate } = useMutation(likePost, {
        onSuccess: () => {
            queryClient.invalidateQueries(queryKeys.post.allPosts)
            setCurLikesCount(liked ? curLikesCount - 1 : curLikesCount + 1)
        },
    })
    const onClickLike = (e: MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation()
        setLiked((prev) => !prev)
        mutate(postId)
        
    }
    const router = useRouter()
    const profileImg = '/default.png'
    // 게시글 본문에 들어갈 컴포넌트
    const bodyContent = (): React.ReactNode => {
        return (
            <>
                <StyledCardContent>{content}</StyledCardContent>
                <Box>
                    {img && !isDetailPost ? <StyledCardMedia src='image' image={img?.toString()} /> : <StyledCardMedia   src='image' image={img?.toString()} onClick={handleClickOpen} />}

                    {img && open && (
                        <Dialog open={open} onClose={handleClose}>
                            <DialogContent>
                                <img src={img.toString()} style={{ width: '100%' }} />
                            </DialogContent>
                        </Dialog>
                    )}
                </Box>
                <Divider />
                {isDetailPost && <Typography>{timeStamp}</Typography>}
            </>
        )
    }

    // 게시글 하단에 들어갈 컴포넌트
    const footerContent = (): React.ReactNode => {
        return (
            <StyledPostFooter>
                <Box mr={'0.6em'} sx={{ display: 'flex', position: 'relative' }}>
                    <IconButton sx={{ padding: '0', mr: '0.4em' }} onClick={() =>  router.push(`/post/${postId}`)}>
                        <ChatBubbleOutline />
                    </IconButton>
                    <Typography>{commentsCount}</Typography>
                </Box>
                <Box mr={'0.6em'} sx={{ display: 'flex', position: 'relative' }}>
                    <IconButton sx={{ padding: '0', mr: '0.4em' }} onClick={onClickLike}>
                        {liked ? <Favorite sx={{ color: 'red' }} /> : <FavoriteBorder />}
                    </IconButton>
                    <Typography>{curLikesCount}</Typography>
                </Box>
            </StyledPostFooter>
        )
    }
    const postDrawerProps = {
        type: POST_UTIL_TYPE as DrawerType,
        id: postId,
        isOpen: isPostDrawerOpen,
    }

    // CustomCard 컴포넌트 레이아웃안의 자식 요소로 전달
    return (
        <>
            <CustomCard profileImg={profileImg} userName={userName} timeStamp={isDetailPost ? '' : timeStamp} moreBtn={moreBtn} moreBtnFn={togglePostDrawer}>
                <div onClick={() => (window.location.href = `/post/${postId ? postId : ''}`)}>{bodyContent()}</div>
                {footerContent()}
            </CustomCard>

            {moreBtn && <CustomDrawer {...postDrawerProps} toggleDrawer={togglePostDrawer} isOpen={isPostDrawerOpen} />}
        </>
    )
}

export default PostCard
