'use client'

import { useState, useEffect } from 'react'
import { UserCircleIcon } from '@heroicons/react/20/solid'

import useBoardStore from '@/store/board-store'

import fetchSuggestion from '@/lib/fetchSuggestion'

import clsx from 'clsx'

const GPTSuggestion = () => {
  const board = useBoardStore((state) => state.board)

  const [loading, setLoading] = useState<boolean>(false)
  const [suggestion, setSuggestion] = useState<string>('')

  useEffect(() => {
    if (board.columns.size === 0) return
    setLoading(true)

    const fetchGPTSuggestion = async () => {
      const suggestion = await fetchSuggestion(board)
      setSuggestion(suggestion)
      setLoading(false)
    }

    fetchGPTSuggestion()
  }, [board])

  return (
    <div className='flex items-center justify-center px-5 py-2 md:py-5'>
      <p className='flex items-center text-sm font-light p-5 shadow-xl rounded-xl w-fit bg-white italic max-w-3xl text-[#0055d1]'>
        <UserCircleIcon
          className={clsx(
            'inline-block h-10 w-10 text-[#0055d1] mr-1',
            loading && 'animate-spin'
          )}
        />
        {suggestion && !loading
          ? suggestion
          : 'GPT is summarizing your tasks for the day...'}
      </p>
    </div>
  )
}

export default GPTSuggestion
