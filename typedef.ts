export interface Post {
  id: string;
  data: {
      title: string
      body: {
          html: string
      }
  },
  comments: [Comment]
}

export interface Posts {
  posts: [Post]
}

export interface Comment {
  id: string;
  data: {
      body: string
  }
  post: Post
}
export interface Comments {
  comments: [Comment]
}
