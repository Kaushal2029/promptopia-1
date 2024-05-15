import React, { Suspense } from 'react'
const PromptCards = React.lazy(() => import('./PromptCards'))

const PromptContainer = () => {
    return (
        <>
            <div className='grid gap-5 px-5 pb-4 overflow-auto sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 prompts'>
                <PromptCards />
            </div>
        </>
    )
}

export default PromptContainer