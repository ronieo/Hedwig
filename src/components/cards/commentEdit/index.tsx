// CommentEdit.tsx
import React, { ChangeEvent, useRef, useState } from 'react'
import CircularProgress from '@mui/material/CircularProgress'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'

import { StyledCardInput } from '../styles'

interface CommentEditProps {
    initialContent: string
    isReadOnly: boolean
    onSubmit: (content: string) => void
    resetOnSubmit: boolean
}

function CommentEdit({ initialContent, isReadOnly, onSubmit, resetOnSubmit }: CommentEditProps) {
    const [showCommentInfo, setShowCommentInfo] = useState(false)
    const [letterCount, setLetterCount] = useState(initialContent.length)
    const [label, setLabel] = useState('')
    const [content, setContent] = useState(initialContent)

    const handleFocus = () => {
        setShowCommentInfo(true)
        setLabel('150자 이내로 입력하세요')
    }

    const handleBlur = () => {
        setLabel('Write a comment...')
    }

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setLetterCount(event.target.value.length)
        setContent(event.target.value)
        if (letterCount > 149) {
            setLabel('150자 초과입니다')
        } else {
            setLabel('150자 이내로 입력하세요')
        }
    }

    const handleCommentSubmit = () => {
        if (resetOnSubmit) {
            setContent('')

        }
        onSubmit(content)
    }

    const textFieldProps = {
        onChange: handleChange,
        onFocus: handleFocus,
        onBlur: handleBlur,
        label: isReadOnly ? '' : `${label}`,
        placeholder: 'Hoot?',
        maxRows: 5,
        InputProps: {
            readOnly: isReadOnly,
        },
        focused: isReadOnly,
        defaultValue: content,
    }

    const circularProgressProps = {
        variant: 'determinate' as const,
        color: letterCount > 149 ? ('warning' as const) : ('primary' as const),
        value: letterCount > 150 ? 100 : (letterCount / 150) * 100,
        size: 32,
    }

    return (
        <>
            <StyledCardInput fullWidth multiline {...textFieldProps} />
            <Box sx={{ display: 'flex', justifyContent: 'end', gap: '10px' }}>
                {!isReadOnly && showCommentInfo && (
                    <>
                        <Box sx={{ width: '100%', display: 'flex', alignItems: 'center', gap: '8px', justifyContent: 'flex-end' }}>
                            <CircularProgress {...circularProgressProps} />
                            <Box>
                                <Typography color={letterCount > 150 ? 'red' : 'primary'} variant="caption">
                                    {letterCount}
                                </Typography>
                            </Box>
                        </Box>

                        <Button onClick={handleCommentSubmit} disabled={letterCount === 0 || letterCount > 150}>
                            Hoot
                        </Button>
                    </>
                )}
            </Box>
        </>
    )
}

export default CommentEdit
