import { ChangeEvent, useState } from 'react'
import { Box, TextField, CircularProgress, Typography, Button } from '@mui/material'
import CustomCard from '../customCard'
import { inputStyle } from '../customCard/styles'
// import CustomButton from '../CustomButton'
interface CommentInputProps {
    profileImg: string
    userName: string
}

function CommentInput({ profileImg }: CommentInputProps) {
    const [showCommentInfo, setshowCommentInfo] = useState(false) // TextField와 LetterCounter의 보이기/숨기기 상태를 관리합니다.
    const [letterCount, setLetterCount] = useState(0)
    const [label, setLabel] = useState('')
    
    const [commentContent, setCommentContent] = useState('Write a comment...')
    const handleFocus = () => {
        setshowCommentInfo(true)
        setLabel('150자 이내로 입력하세요')
    }
    const handleBlur = () => {
        setLabel('Write a comment...')
    }

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setLetterCount(event.target.value.length)
        setCommentContent(event.target.value)
    }
    const textFieldProps = {
        onChange: handleChange,
        onFocus: handleFocus,
        onBlur: handleBlur,
        margin: 'none' as const,
        label: `${label}`,
        placeholder: 'Write a comment...',
        maxRows: 5,
        variant: 'outlined' as const,
    }

    return (
        <CustomCard profileImg={profileImg} userName="" timeStamp="" moreBtn={false}>
            <TextField sx={inputStyle} fullWidth multiline {...textFieldProps} />
            <Box>
                {showCommentInfo && (
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px', justifyContent: 'flex-end' }}>
                        <CircularProgress variant="determinate" color={letterCount > 149 ? 'warning' : 'primary'} value={letterCount > 150 ? 100 : (letterCount / 150) * 100} size={32} />
                        <Box>
                            <Typography color={letterCount > 150 ? 'red' : 'primary'} variant="caption">
                                {letterCount}
                            </Typography>
                        </Box>
                        <Button onClick={() => alert(commentContent)} disabled={letterCount === 0 || letterCount > 150}>Hoot!</Button>
                    </Box>
                )}
            </Box>
        </CustomCard>
    )
}

export default CommentInput
