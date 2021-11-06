import React,{useState,useEffect} from 'react'
import {Autocomplete,InputLabel,TextField} from '@mui/material'
import {SEARCH_COMMENTS} from '../lib/query/comments'
import {Comments,Comment} from '../typedef'
import { useQuery } from '@apollo/client';
import CircularProgress from '@mui/material/CircularProgress'
interface SearchProps {
  setPostComments: Function
}

const CommentSearch: React.FC<SearchProps> = ({ setPostComments }) => {
  const [queryString, setQueryString] = useState<string | ''>('')
  const [commentsData, setCommentsData] = useState<[Comment] | []>([])
  const { loading, data, error } = useQuery<Comments>(SEARCH_COMMENTS, {
    variables: {
      where: {
        body: {
          contains: queryString
        }
      }
    }
  })

  useEffect(() => {
    if (loading) setCommentsData([])
    if (data && data?.comments) {
      console.log(data.comments)
      setCommentsData(data.comments)
    }
  }, [loading, data])
  return (
    <div>
      <InputLabel>Search Comments</InputLabel>
      <Autocomplete
        clearOnBlur={true}
        onChange={(e, v) => {
          if (v) setPostComments(v)
          setQueryString('')
        }}
        isOptionEqualToValue={(o, v) => o.id === v.id}
        getOptionLabel={(c) => c?.data?.body || ''}
        onInputChange={(e, val) => setQueryString(val)}
        forcePopupIcon={false}
        options={commentsData}
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

export default CommentSearch
