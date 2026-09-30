

type Probs = {
    searchTerm:string,
    setSearchTerm:(v:string) => void,
    filteredItems:any[],
}

const SearchComponent = ({searchTerm,setSearchTerm,filteredItems}:Probs) => {
    return (<>
    
    {/* Search */}
        <div className="mb-6">
            <div
                className="
                    group
                    relative
                    flex
                    w-full
                    items-center
                    overflow-hidden
                    rounded-2xl
                    border
                    border-white/10
                    bg-white/[0.07]
                    shadow-[0_8px_30px_rgba(0,0,0,0.12)]
                    transition-all
                    duration-300
                    focus-within:border-purple-300/40
                    focus-within:bg-white/[0.10]
                    focus-within:shadow-[0_8px_35px_rgba(168,85,247,0.12)]
                "
            >

                {/* Search icon */}
                <div
                    className="
                        flex
                        h-11
                        w-11
                        shrink-0
                        items-center
                        justify-center
                        text-purple-200/60
                        transition
                        group-focus-within:text-purple-300
                    "
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={1.8}
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="m21 21-4.35-4.35m1.35-5.65a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z"
                        />
                    </svg>
                </div>


                {/* Input */}
                <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search items..."
                    className="
                        min-w-0
                        flex-1
                        bg-transparent
                        py-3
                        pr-3
                        text-sm
                        text-white
                        outline-none
                        placeholder:text-purple-100/40
                    "
                />


                {/* Clear */}
                {searchTerm && (
                    <button
                        onClick={() => setSearchTerm("")}
                        className="
                            mr-2
                            flex
                            h-7
                            w-7
                            shrink-0
                            items-center
                            justify-center
                            rounded-lg
                            text-purple-200/50
                            transition
                            hover:bg-white/10
                            hover:text-white
                        "
                        title="Clear search"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M6 6l12 12M18 6 6 18"
                            />
                        </svg>
                    </button>
                )}

            </div>


            {/* Search result info */}
            {searchTerm && (
                <div className="mt-2 flex items-center gap-2 px-2">
                    <span className="text-xs text-purple-200/50">
                        Searching for
                    </span>

                    <span className="max-w-[200px] truncate text-xs font-medium text-purple-200">
                        "{searchTerm}"
                    </span>

                    <span className="text-xs text-purple-200/40">
                        •
                    </span>

                    <span className="text-xs text-purple-200/50">
                        {filteredItems.length} result
                        {filteredItems.length !== 1 ? "s" : ""}
                    </span>
                </div>
            )}
        </div>
    </>)
}


export default SearchComponent;