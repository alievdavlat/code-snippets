import { useQuery } from '@tanstack/react-query'
import { ReactNode, useContext} from 'react'
import React from 'react'
import { Box } from '@mui/material'
import { hanldeRequest } from '../../configs/req'
import { RandomContext } from '../../context/RandomContext'

interface IProps {
  url: string
  disabled?: boolean
  params?: object
  children: (props: any) => ReactNode
  onSuccess?: (data: any) => void
  onError?: (data: any) => void
  name?: string
  hideLoading?: boolean
}

function GetContainer(props: IProps) {
  const { random } = useContext<any>(RandomContext)


  const { data, isLoading, isSuccess, error, isError, isFetching, refetch } = useQuery(
    {
      queryFn: async () => {

        const response: any = await hanldeRequest({
          url: props.url,
          params: props.params,
          method: 'GET'
        })
        
        return response.data
      },
      queryKey: [props.url, random, ...(props?.params ? Object.values(props.params) : [])],
      enabled: !!props.url && !props.disabled,      
    },
  )
 
  
  return (
    <Box>
      {isLoading && !props.hideLoading ? (
        <Box
          style={{
            width: '100%',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 20
          }}
        >
          <h1 className='text-lg dark:text-white text-slate-500 font-semibold'>Loading...</h1>
        </Box>
      ) : (
        props.children({
          data: data,
          isLoading,
          isFetching,
          isError,
          error,
          refetch,
          isSuccess
        })
      )}
    </Box>
  )
}

export default GetContainer
