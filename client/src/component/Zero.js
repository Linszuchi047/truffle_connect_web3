import { useState, useEffect } from "react";
export default function Zero({ state }) {
    const [product, setProduct] = useState([]);
    const [Manufacturer_Address, setAdress] = useState('');
    // const [record, setRecord] = useState([]);

    useEffect(() => {
        const { contract } = state;
        async function readData() {
            const data = await contract.methods.getManufacturerAddress().call();
            setAdress(data);
        }
        contract && readData();
    }, [state]);



    // useEffect(() => {
    //     const { contract } = state;

    // async function Product() {
    //     const { contract } = state;
    //     await contract.methods.GetN_Product().send({ from: Manufacturer_Address, gas: '1000000' });
    //     alert("Login is successul");
    //     window.location.reload();
    // }

    // async function Product() {
    //     const { contract } = state;
    //     await contract.methods.ChangeState('0xC1A3391D3196842b7e7F108Ce920e7733535970C').send({ from: Manufacturer_Address, gas: '1000000' });
    //     alert("Login is successul");
    //     window.location.reload();
    // }
    //     contract && Product();
    // }, [state]);







    useEffect(() => {
        const { contract } = state;

        async function N_Product() {
            const product = await contract.methods.N_Product().call();


            const Fliter = product.filter((pd) => pd.Serial === '0');
            setProduct(Fliter);
        }
        contract && N_Product();


    }, [state]);




    // useEffect(() => {
    //     const { contract } = state;
    //     async function getproduct() {
    //         const address = await contract.methods.getAllProduct().call();
    //         setProduct(address);
    //     }
    //     contract && getproduct();
    // }, [state]);


    async function ChangeState(address) {
        const { contract } = state;
        await contract.methods.ChangeState(address).send({ from: Manufacturer_Address, gas: '1000000' })
        alert("Login is successul");
        window.location.reload();

    }

    return (
        <>


            <div style={{ position: 'initial', top: '15%', left: '2.5%' }} class='animate'>



                <table>
                    <thead>
                        <tr>

                            <th>商品ID</th>
                            <th>製造商ID</th>
                            <th>商品</th>
                            <th >材質</th>
                            <th >價格</th>
                            <th >時間</th>
                            <th >狀態</th>
                            <th>階段</th>
                        </tr>
                    </thead>
                    <tbody >

                        {product.map((pd) => {
                            return (
                                <tr>


                                    <td
                                        style={{
                                            backgroundColor: "#dcdc9e",
                                            border: "1px solid white",
                                            borderCollapse: "collapse",
                                            padding: "7px",
                                            width: "50px",
                                            color: "black",

                                        }}
                                    >
                                        {pd.ProductID}

                                    </td>
                                    <td
                                        style={{
                                            backgroundColor: "#dcdc9e",
                                            border: "1px solid white",
                                            borderCollapse: "collapse",
                                            padding: "7px",
                                            width: "50px",
                                            color: "black",

                                        }}
                                    >
                                        {pd.Manufacturer}
                                    </td>


                                    <td
                                        style={{
                                            backgroundColor: "#dcdc9e",
                                            border: "1px solid white",
                                            borderCollapse: "collapse",
                                            padding: "7px",
                                            width: "50px",
                                            color: "black",

                                        }}
                                    >
                                        {pd.ProductName}
                                    </td>
                                    <td
                                        style={{
                                            backgroundColor: "#dcdc9e",
                                            border: "1px solid white",
                                            borderCollapse: "collapse",
                                            padding: "7px",
                                            width: "50px",
                                            color: "black",

                                        }}
                                    >
                                        {pd.ProductType}
                                    </td>
                                    <td
                                        style={{
                                            backgroundColor: "#dcdc9e",
                                            border: "1px solid white",
                                            borderCollapse: "collapse",
                                            padding: "7px",
                                            width: "50px",
                                            color: "black",

                                        }}
                                    >
                                        {pd.ProductPrice}
                                    </td>
                                    <td
                                        style={{
                                            backgroundColor: "#dcdc9e",
                                            border: "1px solid white",
                                            borderCollapse: "collapse",
                                            padding: "7px",
                                            width: "150px",
                                            color: "black",

                                        }}
                                    >
                                        {new Date(pd.TimeStamp * 1000).toLocaleString()}
                                    </td>
                                    <td
                                        style={{
                                            backgroundColor: "#dcdc9e",
                                            border: "1px solid white",
                                            borderCollapse: "collapse",
                                            padding: "7px",
                                            width: "50px",
                                            color: "black",

                                        }}
                                    >
                                        {pd.State}
                                    </td>

                                    <td
                                        style={{
                                            backgroundColor: "#dcdc9e",
                                            border: "1px solid white",
                                            borderCollapse: "collapse",
                                            padding: "7px",
                                            width: "50px",
                                            color: "black",

                                        }}
                                    >
                                        {pd.Serial}
                                    </td>
                                    <td
                                        style={{
                                            backgroundColor: "#dcdc9e",
                                            border: "1px solid white",
                                            borderCollapse: "collapse",
                                            padding: "7px",
                                            width: "50px",
                                            color: "black",

                                        }}
                                    >
                                        <button onClick={() => ChangeState(pd.ProductID)} style={{ position: 'relative', width: '100%', backgroundColor: "#C2C287" }}>NEXT</button>

                                    </td>

                                </tr>

                            );
                        })}
                    </tbody>
                </table>

            </div>
        </>
    );
}
