var dataDummy = [
    {
        name: "Dompet",
        sku: "1234",
        desc: "dompet bagus"
    },
    {
        name: "Tas",
        sku: "1234",
        desc: "tas bagus"
    },
    {
        name: "Smartphone",
        sku: "1234",
        desc: "smartphone bagus"
    },
    {
        name: "Baju",
        sku: "1234",
        desc: "baju bagus"
    },
    {
        name: "Celana",
        sku: "1234",
        desc: "celana bagus"
    },
    {
        name: "Topi",
        sku: "1234",
        desc: "topi bagus"
    },
    {
        name: "Kerudung",
        sku: "1234",
        desc: "kerudung bagus"
    },
    {
        name: "Sarung Tangan",
        sku: "1234",
        desc: "sarung tangan bagus"
    },
    {
        name: "Celana Panjang",
        sku: "1234",
        desc: "celana panjang bagus"
    },
    {
        name: "sabuk",
        sku: "1234",
        desc: "sabuk bagus"
    },
    {
        name: "motor",
        sku: "1234",
        desc: "motor bagus"
    },
    {
        name: "mobil",
        sku: "1234",
        desc: "mobil bagus"
    },
    {
        name: "Galon",
        sku: "1234",
        desc: "galon bagus"
    },
    {
        name: "lampu merah",
        sku: "1234",
        desc: "lampu merah bagus"
    },
    {
        name: "Korden",
        sku: "1234",
        desc: "korden bagus"
    },
    {
        name: "Sepatu biru",
        sku: "1234",
        desc: "Sepatu biru bagus"
    },
    {
        name: "Sandal jepit",
        sku: "1234",
        desc: "sandal jepit bagus"
    },
    {
        name: "Baju kemeja",
        sku: "1234",
        desc: "baju kemeja bagus"
    },
    {
        name: "Baju Koko",
        sku: "1234",
        desc: "baju koko bagus"
    },
    {
        name: "Peci",
        sku: "1234",
        desc: "peci bagus"
    },
    {
        name: "Sarung",
        sku: "1234",
        desc: "sarung bagus"
    },
    // 
    {
        name: "Dompet",
        sku: "1234",
        desc: "dompet bagus"
    },
    {
        name: "Tas",
        sku: "1234",
        desc: "tas bagus"
    },
    {
        name: "Smartphone",
        sku: "1234",
        desc: "smartphone bagus"
    },
    {
        name: "Dompet",
        sku: "1234",
        desc: "dompet bagus"
    },
    {
        name: "Tas",
        sku: "1234",
        desc: "tas bagus"
    },
    {
        name: "Smartphone",
        sku: "1234",
        desc: "smartphone bagus"
    },
    {
        name: "Dompet",
        sku: "1234",
        desc: "dompet bagus"
    },
    {
        name: "Tas",
        sku: "1234",
        desc: "tas bagus"
    },
    {
        name: "Smartphone",
        sku: "1234",
        desc: "smartphone bagus"
    },
    {
        name: "Dompet",
        sku: "1234",
        desc: "dompet bagus"
    },
    {
        name: "Tas",
        sku: "1234",
        desc: "tas bagus"
    },
    {
        name: "Smartphone",
        sku: "1234",
        desc: "smartphone bagus"
    },
    {
        name: "Dompet",
        sku: "1234",
        desc: "dompet bagus"
    },
    {
        name: "Tas",
        sku: "1234",
        desc: "tas bagus"
    },
    {
        name: "Smartphone",
        sku: "1234",
        desc: "smartphone bagus"
    }
]

class ProductServices {

    getProducts = (page, paging = 10) => {
        return {
            success: true,
            data: dataDummy.slice((page - 1) * 10,page * 10 ),
            page: page,
            paging: paging,
            lastPage: Math.ceil(dataDummy.length / 10)
        }
    }

}

export default ProductServices;