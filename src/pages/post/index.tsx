import BottomNavigation from '@mui/material/BottomNavigation'
import BottomNavigationAction from '@mui/material/BottomNavigationAction'

import Tab from '@mui/material/Tab'
import Tabs from '@mui/material/Tabs'

import CreateIcon from '@mui/icons-material/Create'
import HomeIcon from '@mui/icons-material/Home'

import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import Link from 'next/link'
import React, { useCallback, useEffect, useRef, useState, useMemo } from 'react'
import { useRouter } from 'next/router'


import PostCard from '@/components/cards/postCard'
import { getPosts } from '@/apis/Post'
import { useQuery } from 'react-query'
import { verify } from '@/apis/Auth';
import withAuth from '@/routes/ProtectedRoute'

import Loader from '@/components/Loader'
import { PostResponseData } from '@/types/Post'
import CustomDrawer, { LOGOUT_UTIL_TYPE } from '@/components/customDrawer'

// tab 컴포넌트 스타일 객체
const tabStyles = {
    fontSize: '17px',
    fontWeight: '600',
    '&.Mui-selected': {
        color: '#5c940d',
    },
    mx: 1.1,
}

// bottom 컴포넌트 스타일 객체
const navStyles = {
    wdith: '90px',
    height: '50px',
    '&.Mui-selected': {
        color: '#5c940d',
    },
    // 간격 넓히기
    mx: 2,
}

const Post = () => {
    // 무한 스크롤 관련 state
    const [allData, setAllData] = useState<any[]>([])
    const [pageNumber, setPageNumber] = useState<number>(1)
    const [pageSize, setPageSize] = useState<number>(10)
    const endOfListRef = useRef<HTMLDivElement>(null)

    const { data: allPost, isLoading } = useQuery('posts', getPosts, {
        onSuccess: (allPost) => {
            const recentSortedPost = allPost.sort((comp1: PostResponseData, comp2: PostResponseData) => {
                return new Date(comp2.updatedAt).getTime() - new Date(comp1.updatedAt).getTime()
            })
            setAllData(recentSortedPost)
        },
    })
    const handleLoadMore = () => {
        setPageNumber((prevPageNumber) => prevPageNumber + 1)
    }

    useEffect(() => {
        if (!isLoading) {
            // Intersection Observer 설정
            const options = {
                root: null,
                rootMargin: '0px',
                threshold: 1.0,
            }
            const observer = new IntersectionObserver((entries) => {
                if (entries[0].isIntersecting) {
                    handleLoadMore()
                }
            }, options)
            if (endOfListRef.current) {
                observer.observe(endOfListRef.current)
            }

            // 컴포넌트 언마운트 시 observer 해제
            return () => {
                observer.disconnect()
            }
        }
    }, [isLoading])

    

    // 데이터 조각내기
    const getPageData = (allData: any[], pageNumber: number, pageSize: number): any[] => {
        const startIndex = (pageNumber - 1) * pageSize
        const endIndex = startIndex + pageSize
        return allData?.slice(0, endIndex)
    }
    // 조각낸 데이터
    const pageData = useMemo(() => getPageData(allData, pageNumber, pageSize), [allData, pageNumber, pageSize]);

    // 현재 로그인된 유저와 게시글 데이터의 유저 이름 비교를 위한 코드
    const { data: userdata } = useQuery('userdata', verify)
    const currentUser = userdata?.content.username

    //MUI 컴포넌트 states
    const [value, setValue] = useState<string>('main')
    const [btValue, setBtValue] = useState<string>('home')
    const [drawerState, setDrawerState] = useState<boolean>(false)

    let myPost = null
    if (value === 'my') {
        myPost = allPost?.filter((post: PostResponseData) => post.userName === currentUser)
    }
    if (value === 'liked') {
        myPost = allPost?.filter((post: PostResponseData) => post.isLiked === true)
    }
    const [selectedPost, setSelectedPost] = useState(pageData)

    useEffect(() => {
        if (value === 'my') {
            setSelectedPost(allPost?.filter((post: PostResponseData) => post.userName === currentUser))
        } else if (value === 'liked') {
            setSelectedPost(allPost?.filter((post: PostResponseData) => post.isLiked === true))
        } else {
            setSelectedPost(pageData)
        }
    }, [value, allPost, currentUser, pageData])


    const router = useRouter()
    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue)
        console.log(value)
    }
    const handleBtNavChange = (event: React.SyntheticEvent, newValue: string) => {
        setBtValue(newValue)
    }

    const toggleDrawer  = () => {
        setDrawerState(prev => !prev)
    }


    if (isLoading) {
        return <Loader />
    }

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100vh' }}>
            <Link href="/post">
                <img src="logo.svg" style={{ width: '30px', height: '30px', paddingTop: '10px' }} alt="arrow" />
            </Link>

            <Tabs
                value={value}
                onChange={handleChange}
                // 선택 되었을때 하단의 bar 스타일 속성
                sx={{
                    paddingTop: '10px',
                    '& .MuiTabs-indicator': {
                        backgroundColor: '#5c940d',
                    },
                }}
            >
                <Tab value="main" label="Main" sx={tabStyles} />
                <Tab value="liked" label="Liked" sx={tabStyles} />
                <Tab value="my" label="My" sx={tabStyles} />
            </Tabs>
            <div className="CardContainer" style={{ width: '100%' }}>
                <div style={{ textAlign: 'center' }}>
                    {/*<CircularProgress color="inherit" />*/}
                </div>
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: '#fff',
                        transition: 'background-color 0.3s ease',
                        paddingBottom: '75px',
                    }}
                >
                    {selectedPost &&
                        selectedPost.map((post: PostResponseData) => {
                            const moreBtn = currentUser === post.userName

                            return <PostCard key={post.id} {...post} isDetailPost={false} postId={post.id} moreBtn={moreBtn} />
                        })}
                    <div ref={endOfListRef} />
                </div>
            </div>

            <BottomNavigation value={btValue} onChange={handleBtNavChange} sx={{ position: 'fixed', bottom: '0' }}>
                <BottomNavigationAction label="new" value="new" icon={<CreateIcon sx={{ fontSize: '30px' }} />} sx={navStyles} href="post/new" />
                <BottomNavigationAction label="home" value="home" icon={<HomeIcon sx={{ fontSize: '30px' }} />} sx={navStyles} href="post/" />
                <BottomNavigationAction label="profile" value="profile" icon={<AccountCircleIcon sx={{ fontSize: '30px' }} />} sx={navStyles} onClick={toggleDrawer} />
                <CustomDrawer type={LOGOUT_UTIL_TYPE} isOpen={drawerState} toggleDrawer={toggleDrawer} />
            </BottomNavigation>
        </div>
    )
}

export default withAuth(Post)
