import {
  indexPosts_get,
  userPosts_get,
  addComments_post,
  postComment_get,
  addPost_post,
  userMarkPosts_get,
  markPost_post,
  cancelMarkPost_delete,
  allPost_get,
  likePost_post,
  cancelLikePost_delete,
  postDetail_get,
} from '@/config/urls'
import { request } from '../request'
import { IAddComments, IPost } from '@/types/posts'

// 获取首页 我的 和 我关注的人的帖子
export const getIndexPosts = (page: number, size: number) => {
  return request({ url: indexPosts_get, method: 'GET', params: { page, size } })
}

// 获取用户帖子
export interface IUserPosts {
  page: number
  size: number
  userId?: string
}
export const getUserPosts = (params: IUserPosts) =>
  request({ url: userPosts_get, method: 'GET', params })

// 获取用户收藏帖子
export interface IUserMarkPosts {
  page: number
  size: number
}
export const getUserMarkPosts = (params: IUserMarkPosts) =>
  request({ url: userMarkPosts_get, method: 'GET', params })

// 添加帖子评论
export const addComments = (params: IAddComments) =>
  request({ url: addComments_post, method: 'POST', data: params })

// 获取帖子评论
export const fetchComments = (
  postId: number,
  rId: number,
  page: number,
  size: number
) => {
  return request({
    url: postComment_get,
    method: 'GET',
    params: { postId, rId, page, size },
  })
}

// 添加帖子
export const addPost = (content: string, imgs: string[], status = 1) =>
  request<IPost>({
    url: addPost_post,
    method: 'POST',
    data: { content, imgs, status },
  })

// 收藏帖子
export const markPost = (postId: number) =>
  request({ url: markPost_post, method: 'POST', data: { postId } })
// 取消收藏帖子
export const cancelMarkPost = (postId: number) =>
  request({ url: `${cancelMarkPost_delete}${postId}`, method: 'DELETE' })

// 获取所有帖子
export const getAllPost = (page: number, size: number) =>
  request({ url: allPost_get, method: 'GET', params: { page, size } })

// 用户喜欢帖子
export const likePost = (postId: number) =>
  request({ url: likePost_post, method: 'POST', data: { postId } })
// 用户取消喜欢帖子
export const cancelLikePost = (postId: number) =>
  request({ url: `${cancelLikePost_delete}${postId}`, method: 'DELETE' })

// 获取帖子详情信息
export const getPostDeatilInfo = (postId: number) =>
  request({ url: postDetail_get, method: 'GET', params: { postId } })
