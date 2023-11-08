'use client'

import Image from 'next/image'
import Avatar from 'react-avatar'

import SearchForm from './search-form'
import GPTSuggestion from './gpt-suggestion'

const Header = () => {
  return (
    <header>
      <div className='flex flex-col md:flex-row items-center p-5 bg-gray-500/10 rounded-b-2xl justify-between'>
        <div className='absolute top-0 left-0 w-full h-96 bg-gradient-to-br from-pink-400 to-[#0055d1] rounded-md filter blur-3xl opacity-50 -z-50' />
        <Image
          src='https://links.papareact.com/c2cdd5'
          alt='Trello Logo'
          width={300}
          height={100}
          className='w-44 md:w-56 pb-10 md:pb-0 object-contain'
        />

        <div className='flex items-center space-x-5 flex-1 justify-end w-full'>
          <SearchForm />
          <Avatar name='Jao Turingan' round size='50' color='#0055d1' />
        </div>
      </div>
      <GPTSuggestion />
    </header>
  )
}

export default Header
