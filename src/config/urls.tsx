// 登录
export const login_post: string = `/api/accounts/login`
// 注册
export const register_post: string = `/api/accounts/register`
// 注册发送手机号验证码
export const resisterSms_post: string = `/api/accounts/signUp/sms`
// 验证注册信息
export const registerVerify_post: string = `/api/accounts/signUp/verify`

// 获取首页我的和关注的人的帖子
export const indexPosts_get: string = `/api/posts/fetch/index`
// 获取用户帖子
export const userPosts_get: string = `/api/posts/fetch/user`
// 添加帖子
export const addPost_post: string = `/api/posts/create/post`
// 获取用户收藏帖子
export const userMarkPosts_get: string = `/api/posts/fetch/mark`
// 收藏帖子
export const markPost_post: string = `/api/posts/create/mark`
// 取消收藏帖子
export const cancelMarkPost_delete: string = `/api/posts/cancel/mark/`
// 添加帖子评论
export const addComments_post: string = `/api/posts/create/comment`
// 获取帖子的评论
export const postComment_get: string = `/api/posts/fetch/comment`
// 获取所有帖子
export const allPost_get: string = `/api/posts/fetch/all`

// 获取用户信息
export const userInfo_get: string = `/api/users/get/info`
// 修改账户信息
export const changeInfo_put: string = `/api/users/update/info`
// 修改手机号校验手机 是否已被别人使用
export const userPhoneVerify_post: string = `/api/users/phone/verify`
// 发送修改手机号确定 验证码
export const userPhoneSms_post: string = `/api/users/phone/sms`
// 修改个人手机号
export const userPhoneUpdate_post: string = `/api/users/phone/update`
// 关注其他用户
export const focusUser_post: string = `/api/users/create/follow`
// 取消关注其他用户
export const focusUser_delete: string = `/api/users/cancel/follow/`
// 获取关注用户列表
export const focusUsers_get: string = `/api/users/fetch/follows`
// 获取粉丝列表
export const fans_get: string = `/api/users/fetch/fans`
// 搜索用户
export const searchUser_get: string = `/api/users/search/name`

// 修改用户密码
export const changePassword_post: string = `/api/accounts/changePassword`
// 用户喜欢帖子
export const likePost_post: string = `/api/posts/create/like`
// 用户取消喜欢帖子
export const cancelLikePost_delete: string = `/api/posts/remove/like/`
// 获取帖子详情信息
export const postDetail_get: string = `/api/posts/get/detail`

// 添加用户访问记录
export const visitRecord_post: string = `/api/record/create/visit`
// 获取推荐用户
export const recommendUser_get: string = `/api/users/fetch/suggested`
