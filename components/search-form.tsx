import useBoardStore from '@/store/board-store'
import { MagnifyingGlassIcon } from '@heroicons/react/20/solid'

const SearchForm = () => {
  const [searchKeyword, setSearchKeyword] = useBoardStore((state) => [
    state.searchKeyword,
    state.setSearchKeyword,
  ])

  return (
    <form className='flex items-center space-x-5 bg-white rounded-md p-2 shadow-md flex-1 md:flex-initial'>
      <MagnifyingGlassIcon className='h-6 w-6 text-gray-400' />
      <input
        type='text'
        value={searchKeyword}
        onChange={(e) => setSearchKeyword(e.target.value)}
        className='flex-1 p-2'
        placeholder='Search'
      />
      <button type='submit' hidden>
        Search
      </button>
    </form>
  )
}

export default SearchForm
