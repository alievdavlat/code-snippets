import { TrashIcon } from '@radix-ui/react-icons'
import React from 'react'
import { Button } from './ui/button'
import Link from 'next/link'

const NoTrash = () => {
  return (
<div className="pt-20 flex flex-col px-10 items-center justify-center h-full">
      <TrashIcon
        className="mb-10 dark:text-slate-400 text-slate-500 h-[100px] w-[100px]"
        fontSize={"5rem"}
      />

      <p className="mb-8 text-sm font-semibold dark:text-slate-400 text-slate-500">
        It looks like there are no snippets
      </p>

      <Button variant={'outline'} className="p-2 cursor-pointer z-50">
        <Link href={'/my-notes'}>
          Go to All Snippets
        </Link>
      </Button>
    </div>  )
}

export default NoTrash