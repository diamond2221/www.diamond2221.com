import gql from 'graphql-tag'
// import { IPostStatus } from "../../types/posts"

export const updatePostStatus = (/* postId: number, status: IPostStatus */) => {
    return gql`
            mutation updatePostStatus($postId: Float!, $status: Float!) {
                updatePostStatus(postId: $postId, status: $status)
            }
        `
    // return {
    //     mutation: gql`
    //         mutation updatePostStatus($postId: Float!, $status: Float!) {
    //             updatePostStatus(postId: $postId)
    //         }
    //     `,
    //     variables: { postId, status }
    // }
}
