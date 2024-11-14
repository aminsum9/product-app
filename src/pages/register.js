import * as React from 'react';
import AuthServices from '../services/AuthServices';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { dataDummy } from '../services/ProductServices';

function Register() {

    localStorage.setItem('products',JSON.stringify(dataDummy))

    var [name, setName] = React.useState('');
    var [email, setEmail] = React.useState('');
    var [address, setAddress] = React.useState('');
    var [password, setPassword] = React.useState('');
    var [passwordConf, setPasswordConf] = React.useState('');

    const handleRegister = async () => {

        var body = {
            name: name,
            email: email,
            address: address,
            password: password,
            password_conf: passwordConf
        }

        var ress = await new AuthServices().register(body)

        if (ress.success) {
            toast(ress.message)
            window.location.href = '/';
        } else {
            toast(ress.message)
        }

    }

    return (
        <div className="flex h-[100vh]" >
            <ToastContainer />
            <div className="w-3/5 bg-[#fcba03]">
                {/*  */}
            </div>
            <div className='flex items-center justify-center w-2/5 text-center bg-white' >
                <div className='w-9/12 flex flex-col items-start'>
                    <h3 className='text-5xl font-bold mb-1'>Sign Up!</h3>
                    <p className='text-left mb-14' >Join us and manage your products!</p>
                    <div className='w-full flex flex-col items-center justify-center mb-16'>
                        <div className="w-full max-w-sm min-w-[200px] items-center justify-center">
                            <input onChange={(e) => setName(e.target.value)} className="w-full mb-4 bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow" placeholder="Name" />
                            <input onChange={(e) => setEmail(e.target.value)} className="w-full mb-4 bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow" placeholder="Email" />
                            <input onChange={(e) => setAddress(e.target.value)} className="w-full mb-4 bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow" placeholder="Address" />
                            <input onChange={(e) => setPassword(e.target.value)} type="password" className="w-full mb-4 bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow" placeholder="Password" />
                            <input onChange={(e) => setPasswordConf(e.target.value)} type="password" className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow" placeholder="Password Confirmation" />
                        </div>
                    </div>
                    <button
                        onClick={() => handleRegister()}
                        className="w-full px-6 py-2 min-w-[120px] text-center text-white bg-[#fc8003] border border-[#fc8003] rounded active:text-violet-500 hover:bg-transparent hover:text-[#fc8003] focus:outline-none focus:ring">
                        Sign Up
                    </button>
                    <p className='text-left mt-3'>Already have account? <span className='ml-1' ><a className='text-yellow-600' href="/" >sign in</a></span></p>
                </div>
            </div>
        </div>
    )
}

export default Register;