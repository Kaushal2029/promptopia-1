import React from 'react'
import { useRecoilState } from 'recoil';
import { search_ } from '../Utils/store';

const SearchBar = () => {
    const [search, setSearch] = useRecoilState(search_);

    const handleSearch = (e) => {
        setSearch(e.target.value);
    }

    return (
        <>
            <div className='grid py-20 place-items-center'>
                <input
                    className="w-[95vw] max-w-[600px] placeholder:text-gray-600 py-2
                    px-4 text-lg outline-none rounded-sm shadow-md"
                    type='search'
                    name="Search prompts"
                    value={search}
                    onChange={handleSearch}
                    placeholder="Search for 'username' or 'topic' or 'prompt'"
                    autoComplete='off'
                />
            </div>
        </>
    )
}

export default SearchBar