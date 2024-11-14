import * as React from 'react';
import Navigation from '../components/navigation';
import ProductServices from '../services/ProductServices';
import Modal from 'react-modal';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Home() {
    var [page, setPage] = React.useState(1);
    var [perPage, setPerPage] = React.useState(10);
    var [totalPages, setTotalPages] = React.useState(0);
    var [data, setData] = React.useState([]);

    var [itemDetail, setItemDetail] = React.useState({});
    var [idDeleteProduct, setIdDeleteProduct] = React.useState(0);
    var [modalDetail, setModalDetail] = React.useState(false);
    var [modalAddProduct, showModalAddProduct] = React.useState(false);
    var [modalDeleteProduct, showModalDeleteProduct] = React.useState(false);
    var [modalEditProduct, showModalEditProduct] = React.useState(false);
    // add product
    var [brands, setBrands] = React.useState(['ABC', 'Kelinci Putih', 'Ular Kobra'])
    var [newName, setNewName] = React.useState('');
    var [newSKU, setNewSKU] = React.useState('');
    var [newBrand, setNewBrand] = React.useState('');
    var [desc, setDesc] = React.useState('');
    var [newVariants, setNewVariants] = React.useState([]);

    const setNewVariantName = (value, index) => {
        newVariants[index].name = value;
    }

    const setNewVariantSKU = (value, index) => {
        newVariants[index].sku = value;
    }

    const setNewVariantHargaJual = (value, index) => {
        newVariants[index].harga_jual = value;
    }

    const addNewVariant = () => {
        setNewVariants([...newVariants, {
            name: "",
            sku: "",
            harga_jual: 0
        }]);
    }

    const decreaseNewVariant = () => {
        if (newVariants.length > 0) {
            setNewVariants(newVariants.slice(0, -1));
        }
    }

    const handleAddProduct = async () => {

        var newProduct = {
            name: newName,
            sku: newSKU,
            brand: newBrand,
            desc: desc,
            variant: newVariants
        }

        var ress = await new ProductServices().addProduct(newProduct);

        if (ress.success) {
            window.location.href = '/';
            toast(ress.message)
        } else {
            toast(ress.message)
        }

    }

    // edit product
    var [editedId, setEditedId] = React.useState(0);
    var [editedName, setEditedName] = React.useState('');
    var [editedSKU, setEditedSKU] = React.useState('');
    var [editedBrand, setEditedBrand] = React.useState('');
    var [editedDesc, setEditedDesc] = React.useState('');
    var [editedVariants, setEditedVariants] = React.useState([]);

    const setEditedVariantName = (value, index) => {
        var dataEditedVariants = [...editedVariants];
        dataEditedVariants[index] = { ...dataEditedVariants[index], name: value };
        setEditedVariants(dataEditedVariants)
    }

    const setEditedVariantSKU = (value, index) => {
        var dataEditedVariants = [...editedVariants];
        dataEditedVariants[index] = { ...dataEditedVariants[index], sku: value };
        setEditedVariants(dataEditedVariants)
    }

    const setEditedVariantHargaJual = (value, index) => {
        var dataEditedVariants = [...editedVariants];
        dataEditedVariants[index] = { ...dataEditedVariants[index], harga_jual: value };
        setEditedVariants(dataEditedVariants)
    }

    const addEditedVariant = () => {
        setEditedVariants([...editedVariants, {
            name: "",
            sku: "",
            harga_jual: 0
        }]);
    }

    const decreaseEditedVariant = () => {
        if (editedVariants.length > 0) {
            setEditedVariants(editedVariants.slice(0, -1));
        }
    }

    const handleEditProduct = async () => {

        var newProduct = {
            id: editedId,
            name: editedName,
            sku: editedSKU,
            brand: editedBrand,
            desc: editedDesc,
            variant: editedVariants
        }

        var ress = await new ProductServices().updateProduct(newProduct);

        if (ress.success) {
            window.location.href = '/';
            toast(ress.message)
        } else {
            toast(ress.message)
        }

    }

    // 

   
    const handleDeleteProduct = async (id) => {
        var ress = await new ProductServices().deleteProduct(idDeleteProduct)

        if(ress.success)
        {
            toast(ress.message);
            window.location.href = '/';
        }

    }

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
            <ToastContainer />
            <Navigation />
            <div className="w-4/5 p-4 h-[100vh]" >
                <div className='mt-4 h-3/4' >
                    <div className='flex flex-row justify-between' >
                        <h3 className='font-bold text-3xl' >List Products</h3>
                        <div className='flex flex-row mb-2'>
                            <button onClick={() => showModalAddProduct(true)} className="w-[150px] ms-1 px-2 py-2 text-white uppercase tracking-wide no-underline text-sm font-semibold rounded shadow inline-block bg-teal-500 hover:bg-teal-600 mb-2" >
                                Add Product
                            </button>
                        </div>
                    </div>
                    <table className="flex w-full flex-col h-full overflow-y-scroll overflow-x-scroll table-auto divide-y divide-gray-200 dark:divide-neutral-700">
                        <thead className='w-full' >
                            <tr className='w-full flex flex-row' >
                                <th className="py-3 w-1/12 text-center text-xs font-medium text-gray-500 uppercase dark:text-neutral-500" >No</th>
                                <th className="py-3 w-3/12 text-center text-xs font-medium text-gray-500 uppercase dark:text-neutral-500"  >Name</th>
                                <th className=" py-3 w-3/12 text-center text-xs font-medium text-gray-500 uppercase dark:text-neutral-500"  >SKU</th>
                                <th className=" py-3 w-3/12 text-center text-xs font-medium text-gray-500 uppercase dark:text-neutral-500"  >Brand</th>
                                <th className="py-3 w-3/12 text-center text-xs font-medium text-gray-500 uppercase dark:text-neutral-500"  >Desc</th>
                                <th className="py-3 w-3/12 text-center text-xs font-medium text-gray-500 uppercase dark:text-neutral-500"  >Action</th>
                            </tr>
                        </thead>
                        <tbody className='w-full' >
                            {data.map((item, index) => {
                                var no = (index + 1) + ((page - 1) * perPage)
                                return (<tr
                                    key={index}
                                    className="w-full flex flex-row cursor-pointer odd:bg-white even:bg-gray-100 dark:odd:bg-neutral-900 dark:even:bg-neutral-800" >
                                    <td
                                        onClick={() => {
                                            setModalDetail(true)
                                            setItemDetail(item)
                                        }}
                                        className="w-1/12 text-center py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-neutral-200" >{no}</td>
                                    <td
                                        onClick={() => {
                                            setModalDetail(true)
                                            setItemDetail(item)
                                        }}
                                        className="w-3/12 text-center py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-neutral-200 " >{item.name || '-'}</td>
                                    <td
                                        onClick={() => {
                                            setModalDetail(true)
                                            setItemDetail(item)
                                        }}
                                        className="w-3/12 text-center py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-neutral-200 " >{item.brand || '-'}</td>
                                    <td
                                        onClick={() => {
                                            setModalDetail(true)
                                            setItemDetail(item)
                                        }}
                                        className="w-3/12 text-center py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-neutral-200" >{item.sku}</td>
                                    <td
                                        onClick={() => {
                                            setModalDetail(true)
                                            setItemDetail(item)
                                        }}
                                        className="w-3/12 text-center py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-neutral-200" >{item.desc}</td>
                                    <td className="w-3/12 flex justify-between px-12 text-center py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-neutral-200" >
                                        <button className='bg-red-300 text-white p-1 rounded-sm' onClick={() => {
                                            showModalDeleteProduct(true);
                                            setIdDeleteProduct(item.id);
                                        }} >
                                            delete
                                        </button>
                                        <button className='bg-green-300 text-white p-1 rounded-sm' onClick={() => {
                                            setEditedId(item.id);
                                            setEditedName(item.name);
                                            setEditedSKU(item.sku);
                                            setEditedBrand(item.brand);
                                            setEditedDesc(item.desc);
                                            setEditedVariants(item.variant);
                                            showModalEditProduct(true);
                                        }}  >
                                            edit
                                        </button>
                                    </td>

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
                                        key={index}
                                        className="bg-blue-500 text-white font-bold py-2 px-4 rounded"
                                        style={{ marginLeft: index != 0 ? 5 : 0 }} onClick={() => setPage(index + 1)} >{index + 1}</button>
                                } else {
                                    return <button
                                        key={index}
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
                                            key={index}
                                            className="bg-blue-500 text-white font-bold py-2 px-4 rounded"
                                            style={{ marginLeft: index != 0 ? 5 : 0 }} onClick={() => setPage(index + 1)} >{index + 1}</button>
                                    } else {
                                        return <button
                                            key={index}
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
                                            key={index}
                                            className="bg-blue-500 text-white font-bold py-2 px-4 rounded"
                                            style={{ marginLeft: 5 }} onClick={() => setPage(5 + index)} >{5 + index}</button>
                                    } else {
                                        return <button
                                            key={index}
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
            {/* modal detail */}
            <Modal
                isOpen={modalDetail}
                style={modalDetailStyles}
            >
                <div className='overflow-y-scroll h-[500px] p-5' >
                    <button className='self-end absolute top-2 right-2' onClick={() => setModalDetail(false)}>
                        <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="20" height="20" viewBox="0 0 30 30">
                            <path d="M 7 4 C 6.744125 4 6.4879687 4.0974687 6.2929688 4.2929688 L 4.2929688 6.2929688 C 3.9019687 6.6839688 3.9019687 7.3170313 4.2929688 7.7070312 L 11.585938 15 L 4.2929688 22.292969 C 3.9019687 22.683969 3.9019687 23.317031 4.2929688 23.707031 L 6.2929688 25.707031 C 6.6839688 26.098031 7.3170313 26.098031 7.7070312 25.707031 L 15 18.414062 L 22.292969 25.707031 C 22.682969 26.098031 23.317031 26.098031 23.707031 25.707031 L 25.707031 23.707031 C 26.098031 23.316031 26.098031 22.682969 25.707031 22.292969 L 18.414062 15 L 25.707031 7.7070312 C 26.098031 7.3170312 26.098031 6.6829688 25.707031 6.2929688 L 23.707031 4.2929688 C 23.316031 3.9019687 22.682969 3.9019687 22.292969 4.2929688 L 15 11.585938 L 7.7070312 4.2929688 C 7.5115312 4.0974687 7.255875 4 7 4 z"></path>
                        </svg>
                    </button>
                    <h3 className='font-bold text-3xl' >Detail</h3>
                    <br />
                    <input disabled value={"Name: " + itemDetail?.name} className="mt-2 w-full mx-0 bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow" placeholder="name" />
                    <input disabled value={"SKU: " + itemDetail?.sku} className="mt-2 w-full mx-0 bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow" placeholder="SKU" />
                    <input disabled value={"Brand: " + itemDetail.brand} className="mt-2 w-full mx-0 bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow" placeholder="brand" />
                    <textarea disabled value={"Description: " + itemDetail.desc} className="mt-2 w-full mx-0 bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow" placeholder="desc" />
                    <br />
                    {itemDetail.variant != null && (
                        <div>
                            <h3 className='font-bold text-xl' >Variant</h3>
                            <ol type='number'>
                                {itemDetail?.variant.map((e, index) => {
                                    return (
                                        <li key={index} className='flex flex-row' >
                                            <div className='me-1 font-bold' >
                                                <h2>{index + 1}.</h2>
                                            </div>
                                            <div>
                                                <h4 className='font-bold' >{e.name}</h4>
                                                <p>SKU: {e.sku}</p>
                                                <p>Harga jual: Rp.{e.harga_jual}</p>
                                            </div>
                                        </li>);
                                })}
                            </ol>
                        </div>
                    )}
                </div>
            </Modal>
            {/* modal add product */}
            <Modal
                isOpen={modalAddProduct}
                style={modalDetailStyles}
            >
                <div className='overflow-y-scroll h-[500px] p-5' >
                    <button className='self-end absolute top-2 right-2' onClick={() => showModalAddProduct(false)}>
                        <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="20" height="20" viewBox="0 0 30 30">
                            <path d="M 7 4 C 6.744125 4 6.4879687 4.0974687 6.2929688 4.2929688 L 4.2929688 6.2929688 C 3.9019687 6.6839688 3.9019687 7.3170313 4.2929688 7.7070312 L 11.585938 15 L 4.2929688 22.292969 C 3.9019687 22.683969 3.9019687 23.317031 4.2929688 23.707031 L 6.2929688 25.707031 C 6.6839688 26.098031 7.3170313 26.098031 7.7070312 25.707031 L 15 18.414062 L 22.292969 25.707031 C 22.682969 26.098031 23.317031 26.098031 23.707031 25.707031 L 25.707031 23.707031 C 26.098031 23.316031 26.098031 22.682969 25.707031 22.292969 L 18.414062 15 L 25.707031 7.7070312 C 26.098031 7.3170312 26.098031 6.6829688 25.707031 6.2929688 L 23.707031 4.2929688 C 23.316031 3.9019687 22.682969 3.9019687 22.292969 4.2929688 L 15 11.585938 L 7.7070312 4.2929688 C 7.5115312 4.0974687 7.255875 4 7 4 z"></path>
                        </svg>
                    </button>
                    <h3 className='font-bold text-3xl' >Add Product</h3>
                    <br />
                    <input value={newName} onChange={(e) => setNewName(e.target.value)} className="mt-2 w-full mx-0 bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow" placeholder="Name" />
                    <input value={newSKU} type="text" onChange={(e) => setNewSKU(e.target.value)} className="mt-2 w-full mx-0 bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow" placeholder="SKU" />
                    <div className='ms-1' >
                        <p>Brand:</p>
                        <select defaultValue={''} id="brand" onChange={(e) => setNewBrand(e.target.value)} className="mt-1 bg-gray-50 w-[200px] mb-1 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                            <option value={""}>-- Select Brand --</option>
                            {brands.map((item, index) => {
                                return <option key={index} value={item}>{item}</option>
                            })}
                        </select>
                    </div>
                    <textarea value={desc} onChange={(e) => setDesc(e.target.value)} className="mt-1 w-full mx-0 bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow" placeholder="description" />
                    <div>
                        <h6 className='mb-1' >Variant: </h6>
                        {newVariants.map((item, index) => {
                            return (
                                <div key={index} className="flex flex-col w-full mb-2 border-2 border-inherit rounded-sm border-solid p-1" >
                                    <input className='mb-1 border-2 p-1' placeholder='name' onChange={(val) => setNewVariantName(val.target.value, index)} ></input>
                                    <input className='mb-1 border-2 p-1' placeholder='SKU' onChange={(val) => setNewVariantSKU(val.target.value, index)} ></input>
                                    <input className='border-2 p-1' placeholder='harga jual' onChange={(val) => setNewVariantHargaJual(val.target.value, index)} ></input>
                                </div>)
                        })}
                    </div>
                    <div className='flex flex-row justify-between' >
                        <button className='text-teal-600' type='button' onClick={() => addNewVariant()}>Tambah</button>
                        <button className='text-red-600' type='button' onClick={() => decreaseNewVariant()}>Hapus</button>
                    </div>
                    <br />
                    <br />
                    <button onClick={() => handleAddProduct()} className="w-full mt-2 ms-1 px-2 py-2 text-white uppercase tracking-wide no-underline text-sm font-semibold rounded shadow inline-block bg-teal-500 hover:bg-teal-600 mb-2" >
                        Add Product
                    </button>
                </div>
            </Modal>
              {/* modal delete product */}
              <Modal
                isOpen={modalEditProduct}
                style={modalDetailStyles}
            >
                <div className='overflow-y-scroll h-[500px] p-5' >
                    <button className='self-end absolute top-2 right-2' onClick={() => showModalEditProduct(false)}>
                        <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="20" height="20" viewBox="0 0 30 30">
                            <path d="M 7 4 C 6.744125 4 6.4879687 4.0974687 6.2929688 4.2929688 L 4.2929688 6.2929688 C 3.9019687 6.6839688 3.9019687 7.3170313 4.2929688 7.7070312 L 11.585938 15 L 4.2929688 22.292969 C 3.9019687 22.683969 3.9019687 23.317031 4.2929688 23.707031 L 6.2929688 25.707031 C 6.6839688 26.098031 7.3170313 26.098031 7.7070312 25.707031 L 15 18.414062 L 22.292969 25.707031 C 22.682969 26.098031 23.317031 26.098031 23.707031 25.707031 L 25.707031 23.707031 C 26.098031 23.316031 26.098031 22.682969 25.707031 22.292969 L 18.414062 15 L 25.707031 7.7070312 C 26.098031 7.3170312 26.098031 6.6829688 25.707031 6.2929688 L 23.707031 4.2929688 C 23.316031 3.9019687 22.682969 3.9019687 22.292969 4.2929688 L 15 11.585938 L 7.7070312 4.2929688 C 7.5115312 4.0974687 7.255875 4 7 4 z"></path>
                        </svg>
                    </button>
                    <h3 className='font-bold text-3xl' >Edit Product</h3>
                    <br />
                    <input value={editedName} onChange={(e) => setEditedName(e.target.value)} className="mt-2 w-full mx-0 bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow" placeholder="Name" />
                    <input value={editedSKU} type="text" onChange={(e) => setEditedSKU(e.target.value)} className="mt-2 w-full mx-0 bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow" placeholder="SKU" />
                    <div className='ms-1' >
                        <p>Brand:</p>
                        <select defaultValue={''} id="brand" value={editedBrand} onChange={(e) => setEditedBrand(e.target.value)} className="mt-1 bg-gray-50 w-[200px] mb-1 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                            <option value={""}>-- Select Brand --</option>
                            {brands.map((item, index) => {
                                return <option key={index} value={item}>{item}</option>
                            })}
                        </select>
                    </div>
                    <textarea value={editedDesc} onChange={(e) => setEditedDesc(e.target.value)} className="mt-1 w-full mx-0 bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow" placeholder="description" />
                    <div>
                        <h6 className='mb-1' >Variant: </h6>
                        {editedVariants.map((item, index) => {
                            return (
                                <div key={index} className="flex flex-col w-full mb-2 border-2 border-inherit rounded-sm border-solid p-1" >
                                    <input value={item.name} className='mb-1 border-2 p-1' placeholder='name' onChange={(val) => setEditedVariantName(val.target.value, index)} ></input>
                                    <input value={item.sku} className='mb-1 border-2 p-1' placeholder='SKU' onChange={(val) => setEditedVariantSKU(val.target.value, index)} ></input>
                                    <input value={item.harga_jual} className='border-2 p-1' placeholder='harga jual' onChange={(val) => setEditedVariantHargaJual(val.target.value, index)} ></input>
                                </div>)
                        })}
                    </div>
                    <div className='flex flex-row justify-between' >
                        <button className='text-teal-600' type='button' onClick={() => addEditedVariant()}>Tambah</button>
                        <button className='text-red-600' type='button' onClick={() => decreaseEditedVariant()}>Hapus</button>
                    </div>
                    <br />
                    <br />
                    <button onClick={() => handleEditProduct()} className="w-full mt-2 ms-1 px-2 py-2 text-white uppercase tracking-wide no-underline text-sm font-semibold rounded shadow inline-block bg-teal-500 hover:bg-teal-600 mb-2" >
                        Update Product
                    </button>
                </div>
            </Modal>
            {/* modal delete */}
            <Modal
                isOpen={modalDeleteProduct}
                style={modalDeleteStyles}
            >
                <div className='overflow-y-scroll h-[500px] p-5' >
                    <button className='self-end absolute top-2 right-2' onClick={() => showModalDeleteProduct(false)}>
                        <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="20" height="20" viewBox="0 0 30 30">
                            <path d="M 7 4 C 6.744125 4 6.4879687 4.0974687 6.2929688 4.2929688 L 4.2929688 6.2929688 C 3.9019687 6.6839688 3.9019687 7.3170313 4.2929688 7.7070312 L 11.585938 15 L 4.2929688 22.292969 C 3.9019687 22.683969 3.9019687 23.317031 4.2929688 23.707031 L 6.2929688 25.707031 C 6.6839688 26.098031 7.3170313 26.098031 7.7070312 25.707031 L 15 18.414062 L 22.292969 25.707031 C 22.682969 26.098031 23.317031 26.098031 23.707031 25.707031 L 25.707031 23.707031 C 26.098031 23.316031 26.098031 22.682969 25.707031 22.292969 L 18.414062 15 L 25.707031 7.7070312 C 26.098031 7.3170312 26.098031 6.6829688 25.707031 6.2929688 L 23.707031 4.2929688 C 23.316031 3.9019687 22.682969 3.9019687 22.292969 4.2929688 L 15 11.585938 L 7.7070312 4.2929688 C 7.5115312 4.0974687 7.255875 4 7 4 z"></path>
                        </svg>
                    </button>
                    <h3 className='font-bold text-3xl' >Delete Product</h3>
                    <br />
                    <h4>Delete product?</h4>
                    <br />
                    <div className='flex flex-row' >
                        <button onClick={() => handleDeleteProduct()} className="w-full mt-2 ms-1 px-2 py-2 text-white uppercase tracking-wide no-underline text-sm font-semibold rounded shadow inline-block bg-red-500 hover:bg-teal-600 mb-2" >
                            Continue
                        </button>
                        <button onClick={() => showModalDeleteProduct(false)} className="w-full mt-2 ms-1 px-2 py-2 text-white uppercase tracking-wide no-underline text-sm font-semibold rounded shadow inline-block bg-teal-500 hover:bg-teal-600 mb-2" >
                            Cancel
                        </button>
                    </div>
                </div>
            </Modal>
        </div>
    )
}

const modalDetailStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        padding: 20,
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
};

const modalDeleteStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        padding: 20,
        height: 250,
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
};


export default Home;