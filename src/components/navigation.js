import * as React from 'react';
import AuthServices from '../services/AuthServices';

function Navigation() {

    return (
        <div className='flex-col bg-[#fcba03] justify-center w-1/5 text-center' >
            <div className='w-full flex-col items-start justify-start text-start pt-4 ps-3' >
                <h3 className='text-4xl font-bold text-black' >Product App</h3>
            </div>
            <div className='w-full flex-col items-start justify-start text-start pt-4 px-3'  >
                <ItemNav title="List Product" route="/" />
                <LogOutButton />
            </div>
        </div>
    )
}

function ItemNav({ title, route }) {
    return (
        <div>
            <button onClick={() => window.location.href = route} className="w-full px-4 py-2 text-white uppercase tracking-wide no-underline text-sm font-semibold rounded hover:shadow inline-block bg-transparent hover:bg-teal-600 mb-2" >
                {title}
            </button>
        </div>
    )
}

function LogOutButton() {

    const handleLogout = () => {
     new AuthServices().logout();
    }

    return (
        <div>
            <button onClick={() => handleLogout()} className="w-full px-4 py-2 text-white uppercase tracking-wide no-underline text-sm font-semibold rounded hover:shadow inline-block bg-transparent hover:bg-[#eb020e] mb-2" >
                Log Out
            </button>
        </div>
    )
}

export default Navigation;