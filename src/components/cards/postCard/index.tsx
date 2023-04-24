import { PostCardData } from '@/types/Card'

import { Button, CardContent, Box, CardMedia, Divider, Typography } from '@mui/material'
import { cardContentStyle, cardIconButtonStyle, cardMediaStyle } from '../customCard/styles'
import { FavoriteBorder, Favorite, ChatBubbleOutline } from '@mui/icons-material'

import { timeSince } from '../timeSince'
import CustomCard from '../customCard'

import { useState } from 'react'

/**
 * @example 
 * <PostCard profileImg={profileImg} userName={userName} content={content} createdAt={createdAt} updatedAt={updatedAt} />
 * 또는
 * <PostCard {{ ...PostCardData, isDetailPost, isLiked }} />
 
 * @property {string} props.profileImg - 프로필 이미지 URL입니다.
 * @property {string} props.userName - 사용자 이름입니다.
 * @property {string} props.content - 게시글 들어갈 내용입니다.
 * @property {Date} props.createdAt - 게시글 작성 시 생성된 Date 객체입니다
 * @property {Date} props.updatedAt - 게시글 수정 시 생성된 Date 객체입니다.
 * @property {string} props.img? - 게시글 미디어카드에 들어갈 이미지 파일 입니다.
 * @property {number} props.likeCount - 게시글에 달린 좋아요 수 입니다.
 * @property {number} props.commentCount - 게시글에 달린 댓글 수 입니다.
 * @property {boolean} props.isLiked - 현재 사용자가 해당 게시글에 좋아요를 했는지의 여부입니다.
 * @property {boolean} props.isDetailPost - 현재 게시글이 상세 페이지에 보여지는지의 여부입니다.
 * @property {boolean} props.moreBtn - More 버튼 여부입니다.
 * @return {JSX.Element} 게시글 카드 컴포넌트를 반환합니다.
 
 * @description PostCardData는 `@/types/Card.ts`또는 CommentCard 컴포넌트 상단의 import에서 `command + click`으로 확인 가능합니다.
 * @date 2023.04.23
 * 
 * @author 임성열
 */
function PostCard({ profileImg, userName, content, createdAt, updatedAt, postId, img, likeCount, commentCount, isLiked, isDetailPost, moreBtn }: PostCardData) {

    // 게시글 좋아요 표시 여부
    const [liked, setLiked] = useState(isLiked)

    // png, jpg, jpeg면 CardMedia의 component속성을 img로 설정
    // 현재는 img만 받는다는 전제로 진행중
    const isImage = /\.(png|jpg|jpeg)$/i.test(img || ' ')
    const cardMediaComponent = isImage ? 'img' : 'video'

    // 작성시간과 수정시간이 같다면 작성된 시간 기준으로 문자열 생성
    // 그게 아니라면 수정이 된 것이므로 수정시간을 기준으로 문자열 생성
    const timeStamp = createdAt === updatedAt ? timeSince(createdAt) + ' 작성됨' : timeSince(updatedAt) + ' 수정됨'

    // 게시글 본문에 들어갈 컴포넌트
    const bodyContent = (): React.ReactNode => {
        return (
            <>
                <CardContent sx={cardContentStyle}>{content}</CardContent>
                {/* img말고 동영상도 받을경우 media로 변경 */}
                {img && <CardMedia component={cardMediaComponent} src={img} sx={cardMediaStyle} onClick={() => console.log(`Post ID: ${postId}\n Media Content Clicked`)} />}
                <Divider />
                {isDetailPost && <Typography>{createdAt.toLocaleString()}</Typography>}
            </>
        )
    }

    // 게시글 하단에 들어갈 컴포넌트
    const footerContent = (): React.ReactNode => {
        return (
            <Box sx={cardIconButtonStyle}>
                <Button startIcon={<ChatBubbleOutline />} endIcon={commentCount} onClick={() => console.log(`Post ID: ${postId}\n Comment Button Clicked`)} />

                <Button
                    startIcon={liked ? <Favorite sx={{ color: 'red' }} /> : <FavoriteBorder />}
                    endIcon={likeCount}
                    onClick={() => {
                        console.log(`Post ID: ${postId}\n Like Button Clicked`)
                        setLiked((prev) => !prev)
                        console.log(`Request Like status change to server as ${liked}`)
                    }}
                />
            </Box>
        )
    }

    // CustomCard 컴포넌트 레이아웃안의 자식 요소로 전달
    return (
        <>
            <CustomCard profileImg={profileImg} userName={userName} timeStamp={isDetailPost ? '' : timeStamp} moreBtn={moreBtn}>
                {bodyContent()}
                {footerContent()}
            </CustomCard>
        </>
    )
}

export default PostCard
