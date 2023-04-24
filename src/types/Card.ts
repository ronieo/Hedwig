/**
 * CardData 타입입니다.
 * @see {@link PostCardData} | {@link CommentCardData}
 * @date 2023.04.23
 * @author 임성열
 */
export type CardDataType = PostCardData | CommentCardData

/**
 * @interface CardData
 * @property {string} profileImg - 프로필 이미지 URL입니다.
 * @property {string} userName - 사용자 이름입니다.
 * @property {string} content - 카드에 들어갈 내용입니다.
 * @property {Date} createdAt - 카드 작성일입니다.
 * @property {Date} updatedAt - 카드 수정일입니다.
 * @description 확장된 인터페이스들의 공통적인 프로퍼티를 가지는 기본 인터페이스 입니다.
 * @date 2023.04.23
 * @author 임성열
 */
interface CardData {
    profileImg: string
    userName: string
    content: string
    createdAt: Date
    updatedAt: Date
    moreBtn: boolean
}

/**
 * @interface PostCardData
 * @property {number} postId - 게시글의 ID입니다.
 * @property {string=} img - 게시글의 이미지의 URL입니다. (선택적)
 * @property {number} likeCount - 게시글이 받은 좋아요 수입니다.
 * @property {number} commentCount - 게시글이 받은 댓글 수입니다.
 * @property {boolean} isLiked - 현재 사용자가 게시글을 좋아하는지 여부입니다.
 * @property {boolean} isDetailPost - 현재 게시글이 상세 페이지에서 보여지는지 여부입니다.
 * @extends CardData
 * @see {@link CardData}
 * @date 2023.04.23
 * @author 임성열
 */
export interface PostCardData extends CardData {
    postId: number
    img?: string
    likeCount: number
    commentCount: number
    isLiked: boolean
    isDetailPost: boolean
}

/**
 * @interface CommentCardData
 * @extends  CardData
 * @property {number} commentId - 댓글의 ID입니다.
 * @see {@link CardData}
 * @date 2023.04.23
 * @author 임성열
 */
export interface CommentCardData extends CardData {
    commentId: number
}

/**
 * @interface CustomCardProps
 * @property {string} profileImg - CustomCard에 들어가는 사용자 아바타 이미지 URL입니다.
 * @property {string} userName - 사용자의 이름 입니다.
 * @property {string} timeStamp - 현재 날짜로부터 언제 작성/수정 했는지 보여주는 문자열입니다
 * @property {React.ReactNode} children - CustomCard 본문과 하단에 들어갈 컴포넌트 입니다. 
 * 
 * @date 2023.04.23
 * @author 임성열
 */
export interface CustomCardProps {
    profileImg: string
    userName: string
    timeStamp: string
    moreBtn: boolean
    children: React.ReactNode
}
