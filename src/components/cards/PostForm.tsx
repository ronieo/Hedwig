import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import TextField from '@mui/material/TextField'
import ArrowBack from '@mui/icons-material/ArrowBack'
import PhotoOutlined from '@mui/icons-material/PhotoOutlined'
import VideoFileOutlined from '@mui/icons-material/VideoFileOutlined'
import Gif from '@mui/icons-material/Gif'

import React, { useState } from 'react'
import { useRouter } from 'next/router'

interface PostInput {
    content: string
    img: File | null
}
interface PostFormProps {
    mutate: (formData: FormData) => void
    initialValue?: PostInput
}

function PostForm({ mutate, initialValue = { content: '', img: null } }: PostFormProps) {
    const mainColor = '#5c940d'
    const [postInput, setPostInput] = useState<PostInput>(initialValue)
    const [previewUrl, setPreviewUrl] = useState(initialValue.img?.toString())
    const router = useRouter()

    // 미디어 추가 함수
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, files } = e.target

        const file = files && files[0]
        if (files) {
            setPostInput({ ...postInput, [name]: files[0] })
        } else {
            setPostInput({ ...postInput, [name]: value })
        }
        // preview condition
        if (file) {
            const reader = new FileReader()
            reader.onloadend = () => {
                console.log('File read successfully:', reader.result)
                setPreviewUrl(reader.result as string)
            }
            reader.readAsDataURL(file)
        }
        console.log('handleChange result:',  file)
    }

    //미디어 지우기
    const handleClearPreview = () => {
        setPreviewUrl('')
    }

    const handlePostSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const formData = new FormData()

        formData.append('content', postInput.content)
        formData.append('file', postInput.img as File)
        mutate(formData)
        // console.log(formData.getAll('img'))
        alert('Hedwig가 날아갑니다')
        router.push('/post')
        console.log('handlePostSubmit result:')
    }

    return (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
            <Box id="componentsWrapper" sx={{ width: 'inherit', alignItems: 'center' }}>
                <Box id="topNavWrapper" sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <IconButton href="/post" aria-label="back" sx={{ color: `${mainColor}` }}>
                        <ArrowBack />
                    </IconButton>
                    <form onSubmit={handlePostSubmit}>
                        <Button type="submit" size="small" color="primary">
                            HOOT
                        </Button>
                    </form>
                </Box>
                <TextField
                    placeholder="글을 작성해 주세요"
                    onChange={handleChange}
                    inputProps={{ name: 'content' }}
                    fullWidth
                    multiline
                    rows={6}
                    variant="standard"
                    sx={{ margin: '2em 0.5em' }}
                    color="success"
                    focused
                    defaultValue={initialValue.content}
                />
                {previewUrl && (
                    <Box mb={2}>
                        <img src={previewUrl} alt="Preview" style={{ maxWidth: '50%', margin: '0 0.5em' }} />
                        <Button onClick={handleClearPreview} size="small" color="secondary">
                            지우기
                        </Button>
                    </Box>
                )}
                <Box display="flex" alignItems="center">
                    <IconButton component="label" htmlFor="photo-input" sx={{ color: `${mainColor}`, width: '2em' }}>
                        <PhotoOutlined />
                        <input name="img" type="file" id="photo-input" accept="image/*" hidden onChange={handleChange} />
                    </IconButton>
                    <IconButton component="label" htmlFor="video-input" sx={{ color: `${mainColor}`, width: '2em' }}>
                        <VideoFileOutlined />
                        <input name="img" type="file" id="video-input" accept="video/*" hidden onChange={handleChange} />
                    </IconButton>
                    <IconButton component="label" htmlFor="gif-input" sx={{ color: `${mainColor}`, width: '2em' }}>
                        <Gif />
                        <input name="img" type="file" id="gif-input" accept="image/*" hidden onChange={handleChange} />
                    </IconButton>
                </Box>
            </Box>
        </div>
    )
}

export default PostForm
