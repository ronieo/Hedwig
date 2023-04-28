import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import Drawer from '@mui/material/Drawer'

import { useState } from 'react'
import { useRouter } from 'next/router'

import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import LogoutIcon from '@mui/icons-material/Logout'

import { deletePost } from '@/apis/Post'
import { deleteComment } from '@/apis/Comment'
import { logout } from '@/apis/Auth'
import { useMutation } from 'react-query'
import { queryKeys } from '@/constants/queryKey'

// 로그아웃 타입 만들어서 콜할것
export const POST_UTIL_TYPE = 'POST'
export const COMMENT_UTIL_TYPE = 'COMMENT'
export const LOGOUT_UTIL_TYPE = 'LOGOUT'
export type DrawerType = typeof POST_UTIL_TYPE | typeof COMMENT_UTIL_TYPE | typeof LOGOUT_UTIL_TYPE

const LOGOUT_KEY_TYPE = 'LOGOUT'
const UPDATE_KEY_TYPE = 'UPDATE'
const DELETE_KEY_TYPE = 'DELETE'
type DialogKeyType = typeof UPDATE_KEY_TYPE | typeof DELETE_KEY_TYPE | typeof LOGOUT_KEY_TYPE

export interface CustomDrawerProps {
    id?: number
    type: DrawerType
    isOpen: boolean
    commentFn?: () => void
    toggleDrawer: () => void
}
interface DialogProps {
    title: string
    contentText?: string
    onConfirmClick: () => Promise<void> | void | undefined
}

function CustomDrawer({ type, id, isOpen, toggleDrawer, commentFn }: CustomDrawerProps) {
    const [dialogState, setDialogState] = useState(false)
    
    const router = useRouter()
    const toggleAll = () => {
        toggleDialog()
        toggleDrawer()
    }
    const toggleDialog = () => {
        setDialogState((prev) => !prev)
    }
    const handleDrawerClick = () => {
        if (!dialogState) toggleDrawer()
    }
    const [currentDialogProps, setCurrentDialogProps] = useState<DialogProps>({
        title: '',
        onConfirmClick: () => console.log('Confirm Value was never assigned'),
    })

    function getListItemContents(type: DrawerType) {
        switch (type) {
            case POST_UTIL_TYPE:
                return [
                    {
                        key: UPDATE_KEY_TYPE,
                        icon: <EditIcon />,
                        text: '게시글 수정',
                        dialog: getDialogProps(POST_UTIL_TYPE, UPDATE_KEY_TYPE),
                    },
                    {
                        key: DELETE_KEY_TYPE,
                        icon: <DeleteIcon />,
                        text: '게시글 삭제',
                        dialog: getDialogProps(POST_UTIL_TYPE, DELETE_KEY_TYPE),
                    },
                ]
            case COMMENT_UTIL_TYPE:
                return [
                    {
                        key: UPDATE_KEY_TYPE,
                        icon: <EditIcon />,
                        text: '댓글 수정',
                        dialog: getDialogProps(COMMENT_UTIL_TYPE, UPDATE_KEY_TYPE),
                    },
                    {
                        key: DELETE_KEY_TYPE,
                        icon: <DeleteIcon />,
                        text: '댓글 삭제',
                        dialog: getDialogProps(COMMENT_UTIL_TYPE, DELETE_KEY_TYPE),
                    },
                ]
            case LOGOUT_UTIL_TYPE:
                return [
                    {
                        key: LOGOUT_KEY_TYPE,
                        icon: <LogoutIcon />,
                        text: 'Logout',
                        dialog: getDialogProps(LOGOUT_UTIL_TYPE, LOGOUT_KEY_TYPE),
                    },
                ]
            default:
                throw new Error(`Unsupported type: ${type}`)
        }
    }

    function getDialogProps(type: DrawerType, key: DialogKeyType): DialogProps {
        switch (type) {
            case POST_UTIL_TYPE:
                switch (key) {
                    case UPDATE_KEY_TYPE:
                        return {
                            title: '게시글을 수정하는 페이지로 이동하시겠습니까?',
                            onConfirmClick: () => {
                                router.push(`post/edit/${id}`)
                                toggleAll()
                            },
                        }
                    case DELETE_KEY_TYPE:
                        return {
                            title: '게시물을 삭제하시겠습니까?',
                            onConfirmClick: () => {
                                deletePost(id as number)
                                toggleAll()
                            },
                        }

                    default:
                        throw new Error(`Unsupported key: ${key}`)
                }

            case COMMENT_UTIL_TYPE:
                switch (key) {
                    case UPDATE_KEY_TYPE:
                        return {
                            title: '댓글을 수정하시겠습니까?',
                            onConfirmClick: () => {
                                commentFn?.()
                                toggleAll()
                            },
                        }
                    case DELETE_KEY_TYPE:
                        return {
                            title: '댓글을 삭제하시겠습니까?',
                            onConfirmClick: () => {
                                deleteComment(id as number)
                                toggleAll()
                            },
                        }
                    default:
                        throw new Error(`Unsupported key: ${key}`)
                }

            case LOGOUT_UTIL_TYPE:
                return {
                    title: '로그아웃하시겠습니까?',
                    contentText: '진짜로 가실거에요?',
                    onConfirmClick: () => {
                        logout()
                        router.push('/auth/login')
                        toggleAll()
                    },
                }
            default:
                throw new Error(`Unsupported type: ${type}`)
        }
    }
    function getListContents() {
        return (
            <Box role="presentation">
                <List>
                    {getListItemContents(type).map(({ key, icon, text, dialog }) => (
                        <ListItem key={key} disablePadding>
                            <ListItemButton
                                onClick={(e) => {
                                    e.stopPropagation()
                                    setDialogState(true)
                                    setCurrentDialogProps(dialog)
                                }}
                            >
                                <ListItemIcon>{icon}</ListItemIcon>
                                <ListItemText primary={text} />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
            </Box>
        )
    }

    function getDialogContents(dialogProps: { title: string; contentText?: string; onConfirmClick: () => void }) {
        return (
            <Dialog open={dialogState} onClose={toggleDrawer}>
                <DialogTitle>{dialogProps.title}</DialogTitle>
                <DialogContent>
                    <DialogContentText>{dialogProps.contentText}</DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={dialogProps.onConfirmClick}>확인</Button>
                    <Button onClick={toggleAll} autoFocus>
                        취소
                    </Button>
                </DialogActions>
            </Dialog>
        )
    }

    return (
        <Drawer anchor={'bottom'} onClick={handleDrawerClick} open={isOpen}>
            {getListContents()}
            {getDialogContents(currentDialogProps)}
        </Drawer>
    )
}
export default CustomDrawer
