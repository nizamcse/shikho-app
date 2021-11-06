import React, { useState, useEffect } from 'react'
import { Autocomplete, InputLabel, TextField } from '@mui/material'
import { SEARCH_COMMENTS } from '../lib/query/comments'
import { Comments, Comment, Post, Posts } from '../typedef'
import { useQuery } from '@apollo/client'
import CircularProgress from '@mui/material/CircularProgress'
import { SEARCH_POSTS } from '../lib/query/posts'
interface SearchProps {
  setCommentPost: Function
}

const PostSearch: React.FC<SearchProps> = ({ setCommentPost }) => {
  const [queryString, setQueryString] = useState<string | ''>('')
  const [postsData, setPostsData] = useState<Post[] | []>([])
  const { loading, data, error } = useQuery<Posts>(SEARCH_POSTS, {
    variables: {
      where: {
        body: {
          contains: queryString
        }
      }
    }
  })

  useEffect(() => {
    if (loading) setPostsData([])
    if (data && data?.posts) {
      console.log(data.posts)
      setPostsData(data.posts)
    }
  }, [loading, data])
  return (
    <div>
      <InputLabel>Search Post</InputLabel>
      <Autocomplete
        clearOnBlur={true}
        onChange={(e, v) => {
          if (v) setCommentPost(v)
          setQueryString('')
        }}
        isOptionEqualToValue={(o, v) => o.id === v.id}
        getOptionLabel={(c) => c?.data?.title || ''}
        onInputChange={(e, val) => setQueryString(val)}
        forcePopupIcon={false}
        options={postsData}
        size="small"
        loading={loading}
        renderInput={(params) => (
          <TextField
            {...params}
            fullWidth
            variant="outlined"
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <React.Fragment>
                  {loading ? (
                    <CircularProgress color="inherit" size={20} />
                  ) : null}
                  {params.InputProps.endAdornment}
                </React.Fragment>
              )
            }}
          />
        )}
      />
    </div>
  )
}

export default PostSearch
