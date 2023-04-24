import { Avatar, Grid, Card, CardHeader, IconButton } from '@mui/material'
import { cardStyle, cardHeaderStyle } from './styles'

import MoreHorizIcon from '@mui/icons-material/MoreHoriz'
import { CustomCardProps } from '@/types/Card'

/**
* @example 
- <CustomCard profileImg={profileImg} userName={userName} timeStamp={timeStamp} moreBtn={moreBtn}>
-    {children}
- </CustomCard>

* @property {string} props.profileImg - 프로필 이미지 URL입니다.
* @property {string} props.userName - 사용자 이름입니다.
* @property {string} props.timeStamp - 작성 또는 수정된 시간 기준으로 생성된 배열입니다. 
* @property {boolean} props.moreBtn - more 버튼 여부
* @property {ReactNode} props.children - 내용에 들어갈 컴포넌트
* @return {JSX.Element} - 렌더링된 카드를 반환합니다.
* 
* @description CustomCardProps는 `@/types/Card.ts` 또는 
                CustomCard 컴포넌트 상단의 import에서 `command + click`으로 확인 가능합니다.
* @date 2023.04.23
* @author 임성열
 */
function CustomCard({ profileImg, userName, timeStamp, children, moreBtn }: CustomCardProps) {
    return (
        <Card sx={cardStyle}>
            <Grid p={'0 1em'} direction={'row'} container>
                <Grid item xs={2.5}>
                    <Avatar src={profileImg} />
                </Grid>
                <Grid item xs={9.5}>
                    <CardHeader
                        sx={cardHeaderStyle}
                        title={userName}
                        subheader={timeStamp && timeStamp}
                        action={ moreBtn &&
                            <IconButton sx={{ width: '1.5em', height: '1.5em' }} onClick={() => console.log('clicked')}>
                                <MoreHorizIcon sx={{ fontSize: '0.75em' }} />
                            </IconButton>
                        }
                    />
                    {children}
                </Grid>
                {/* 여기까지 Grid Items */}
            </Grid>
            {/* 여기까지 Grid Container */}
        </Card>
    )
}

export default CustomCard
