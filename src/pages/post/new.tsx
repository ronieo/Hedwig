import React, { useState } from 'react'
import { Box, IconButton, TextField } from '@mui/material'
import { ArrowBack, PhotoOutlined, VideoFileOutlined, Gif } from '@mui/icons-material'
import { instance } from '@/apis/instance'
import CustomButton from '@/components/CustomButton'
interface PostInput {
    body: string
    img: File | null
}

function CreatePost() {
    const mainColor = '#5c940d'
    const [postInput, setPostInput] = useState<PostInput>({ body: '', img: null })
    const [previewUrl, setPreviewUrl] = useState('')

    // 미디어 추가 함수
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, files } = e.target
        console.log('Files:', files)

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
        console.log('handleChange result:', postInput, file)
    }

    //미디어 지우기
    const handleClearPreview = () => {
        setPreviewUrl('')
    }

    // 글쓰기에 추가한 내용 모두 저장 할 함수
    const handlePostSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const formData = new FormData()
        formData.append('body', postInput.body)
        formData.append('img', postInput.img as File)
        await instance.post('/post', formData)

        console.log('handlePostSubmit result:', postInput)
    }

    return (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
            <Box id="componentsWrapper" sx={{ width: 'inherit', alignItems: 'center' }}>
                <Box id="topNavWrapper" sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <IconButton href="/post" aria-label="back" sx={{ color: `${mainColor}` }}>
                        <ArrowBack />
                    </IconButton>
                    <form onSubmit={handlePostSubmit}>
                        <CustomButton type="submit" size="small" color="primary">
                            HOOT
                        </CustomButton>
                    </form>
                </Box>
                <TextField
                    placeholder="글을 작성해 주세요"
                    onChange={handleChange}
                    inputProps={{ name: 'body' }}
                    fullWidth
                    multiline
                    rows={6}
                    variant="standard"
                    sx={{ margin: '2em 0.5em' }}
                    color="success"
                    focused
                />
                {previewUrl && (
                    <Box mb={2}>
                        <img src={previewUrl} alt="Preview" style={{ maxWidth: '50%', margin: '0 0.5em' }} />
                        <CustomButton onClick={handleClearPreview} size="small" color="secondary">
                            지우기
                        </CustomButton>
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
export default CreatePost
