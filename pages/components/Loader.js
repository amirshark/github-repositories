import { Bars } from 'react-loader-spinner'

export default function Loader() {
    return <>
        <div className='d-flex align-items-center justify-content-center mb-4'>
            <Bars color="#282828" height={30} width={30} />
        </div>
    </>
}

