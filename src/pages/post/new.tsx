import withAuth from '@/routes/ProtectedRoute'
import PostForm from '@/components/cards/PostForm'
import { createPost } from '@/apis/Post'


function CreatePost() {
    // 글쓰기에 추가한 내용 모두 저장 할 함수
    const mutate = async (formData: FormData) => {
        await createPost(formData)
    }

    return <PostForm mutate={mutate} />
}
export default withAuth(CreatePost)
