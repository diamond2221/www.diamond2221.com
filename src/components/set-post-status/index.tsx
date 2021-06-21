import React from "react"
import { IPost, IPostStatus } from "@/types/posts";
import { useMutation } from "react-apollo";
import { updatePostStatus } from '@/graphql/mutaions/post'

interface IProps {
    detailCardInfo: IPost;
    closeHandle?(): void
}
const SetPostStatus = (props: IProps) => {
    const { detailCardInfo } = props;
    const [fn] = useMutation(updatePostStatus())
    const setPostStatus = async () => {
        let status: IPostStatus = detailCardInfo.status === 1 ? 2 : 1;
        const res = await fn({
            variables: { postId: detailCardInfo.postId, status }
        })
        if (res.data.updatePostStatus === 1) {
            detailCardInfo.status = status
            if (props.closeHandle) {
                props.closeHandle()
            }
        }
    }

    return (
        < button
            className="set-item"
            onClick={setPostStatus}
        >
            {
                detailCardInfo.status === 1 ? '设置为仅自己可以查看' : '设置为所有人可以查看'
            }
        </button>
    )
}

export default SetPostStatus
