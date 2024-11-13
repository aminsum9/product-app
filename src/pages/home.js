import * as React from 'react';
import Navigation from '../components/navigation';
import ProductServices from '../services/ProductServices';

function Home() {
    var [page, setPage] = React.useState(1);
    var [perPage, setPerPage] = React.useState(10);
    var [totalPages, setTotalPages] = React.useState(0);
    var [data, setData] = React.useState([]);

    var [itemDetail, setItemDetail] = React.useState({});
    var [modalDetail, setModalDetail] = React.useState(false);

    React.useEffect(() => {
        getProducts();
    }, [])

    React.useEffect(() => {
        getProducts();
    }, [page]);

    const getProducts = async () => {
        var data = await new ProductServices().getProducts(page, perPage);
        setData(data.data);
        setPage(data.page);
        setPerPage(data.paging);
        setTotalPages(data.lastPage);
    }


    var arrayPages = [];

    for (let i = 0; i < totalPages; i++) {
        arrayPages.push('-');
    }


    return (
        <div className="flex h-[100vh] bg-white" >
            <Navigation />
            <div className="w-4/5 p-4 h-[100vh]" >
                <h3 className='font-bold text-3xl' >List Products</h3>
                <div className='mt-4 h-3/4' >
                    <table class="flex w-full flex-col h-full overflow-y-scroll overflow-x-scroll table-auto divide-y divide-gray-200 dark:divide-neutral-700">
                        <thead className='w-full' >
                            <tr className='w-full flex flex-row' >
                                <th className="py-3 w-1/12 text-center text-xs font-medium text-gray-500 uppercase dark:text-neutral-500" >No</th>
                                <th className="py-3 w-3/12 text-center text-xs font-medium text-gray-500 uppercase dark:text-neutral-500"  >Nama</th>
                                <th className=" py-3 w-4/12 text-center text-xs font-medium text-gray-500 uppercase dark:text-neutral-500"  >SKU</th>
                                <th className="py-3 w-4/12 text-center text-xs font-medium text-gray-500 uppercase dark:text-neutral-500"  >Desc</th>
                            </tr>
                        </thead>
                        <tbody className='w-full' >
                            {data.map((item, index) => {
                                var no = (index + 1) + ((page - 1) * perPage)
                                return (<tr
                                    onClick={() => {
                                        setModalDetail(true)
                                        setItemDetail(item)
                                    }}
                                    className="w-full flex flex-row cursor-pointer odd:bg-white even:bg-gray-100 dark:odd:bg-neutral-900 dark:even:bg-neutral-800" >
                                    <td className="w-1/12 text-center py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-neutral-200" >{no}</td>
                                    <td className="w-3/12 text-center py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-neutral-200 " >{item.name || '-'}</td>
                                    <td className="w-4/12 text-center py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-neutral-200" >{item.sku}</td>
                                    <td className="w-4/12 text-center py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-neutral-200" >{item.desc}</td>

                                </tr>)
                            })}
                        </tbody>
                    </table>
                    <br />
                    <div className='flex items-center justify-center' >
                        <button
                            className="mr-10 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                            onClick={() => {
                                setPage(page != 1 ? page - 1 : 1)
                            }}
                        >
                            prev page
                        </button>
                        {totalPages < 10 &&
                            arrayPages.map((item, index) => {
                                if (page == index + 1) {
                                    return <button
                                        className="bg-blue-500 text-white font-bold py-2 px-4 rounded"
                                        style={{ marginLeft: index != 0 ? 5 : 0 }} onClick={() => setPage(index + 1)} >{index + 1}</button>
                                } else {
                                    return <button
                                        className="bg-slate-300 hover:bg-blue-500 text-black hover:text-white font-bold py-2 px-4 rounded"
                                        style={{ marginLeft: index != 0 ? 5 : 0 }} onClick={() => setPage(index + 1)} >{index + 1}</button>
                                }
                            })
                        }
                        {(totalPages > 10 && totalPages < 12 && page <= 5) &&
                            <div className='flex flex-row' >
                                {['', '', '', '', '', ''].map((item, index) => {
                                    if (page == index + 1) {
                                        return <button
                                            className="bg-blue-500 text-white font-bold py-2 px-4 rounded"
                                            style={{ marginLeft: index != 0 ? 5 : 0 }} onClick={() => setPage(index + 1)} >{index + 1}</button>
                                    } else {
                                        return <button
                                            className="bg-slate-300 hover:bg-blue-500 text-black hover:text-white font-bold py-2 px-4 rounded"
                                            style={{ marginLeft: index != 0 ? 5 : 0 }} onClick={() => setPage(index + 1)} >{index + 1}</button>
                                    }
                                })}
                                <p className='text-bold text-xl' style={{ marginLeft: 5 }} >...</p>
                                <button
                                    className="bg-slate-300 hover:bg-blue-500 text-black hover:text-white font-bold py-2 px-4 rounded"
                                    style={{ marginLeft: 5 }} onClick={() => setPage(totalPages)} >{totalPages}</button>
                            </div>
                        }
                        {(totalPages > 10 && totalPages < 12 && page > 5) &&
                            <div className='flex flex-row' >
                                <button
                                    className="bg-slate-300 hover:bg-blue-500 text-black hover:text-white font-bold py-2 px-4 rounded"
                                    style={{ marginLeft: 5 }} onClick={() => setPage(1)} >{1}</button>
                                <p className='text-bold text-xl' style={{ marginLeft: 5 }} >...</p>
                                {['', '', '', '', '', '', ''].map((item, index) => {
                                    if (page == 5 + index) {
                                        return <button
                                            className="bg-blue-500 text-white font-bold py-2 px-4 rounded"
                                            style={{ marginLeft: 5 }} onClick={() => setPage(5 + index)} >{5 + index}</button>
                                    } else {
                                        return <button
                                            className="bg-slate-300 hover:bg-blue-500 text-black hover:text-white font-bold py-2 px-4 rounded"
                                            style={{ marginLeft: 5 }} onClick={() => setPage(5 + index)} >{5 + index}</button>
                                    }
                                })}
                            </div>
                        }
                        <button className="ml-10 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                            onClick={() => {
                                setPage(page != totalPages ? page + 1 : 1)
                            }}
                        >
                            next page
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home;