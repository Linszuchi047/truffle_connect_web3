import { useState, useEffect } from "react";
const Test = ({ state }) => {
    // const [count, setCount] = useState(0);
    const [product, setProduct] = useState([]);
    // const { contract } = state;

    // useEffect(() => {

    //     async function readData() {
    //         const data = await contract.methods.get().call();
    //         setCount(data);
    //     }
    //     contract && readData();
    // }, [contract]);

    useEffect(() => {
        const { contract } = state;
        async function getproduct() {
            const address = await contract.methods.getAllProduct().call();
            setProduct(address);
        }
        contract && getproduct();
    }, [state]);



    // const test = async(event)=>{
    //   event.preventDefault();
    //   const {contract}=state;
    //   const name = document.querySelector("#name").value;
    //   const message = document.querySelector("#message").value;
    //   //const amount = document.querySelector("#amount").value;
    //   const amount = {value:ethers.utils.parseEther("0.001")}
    //   const transaction = await contract.buyChai(name,message,amount)
    //   await transaction.wait();
    //   alert("Transaction is successul");
    //   window.location.reload();
    // }
    return (
        //   <div className="center">
        //    <h1>Thanks</h1>
        //     <form onSubmit={buyChai}>
        //       <div className="inputbox">
        //         <input type="text" required="required" id="name" />
        //         <span>Name</span>
        //       </div>
        //       <div className="inputbox">
        //         <input type="text" required="required" id="message" />
        //         <span>Message</span>
        //       </div>
        //       <div className="inputbox">
        //         <input type="submit" value="Pay"  disabled={!state.contract}/>
        //       </div>
        //     </form>

        //     </div>
        <div>
            <p>Show data<br /></p>
            {/* <p>{count}</p> */}

            <table>
                <thead>
                    <tr>
                        <th>商品</th>
                        <th >材質</th>
                        <th >價格</th>
                        <th >時間</th>
                        <th >狀態</th>
                    </tr>
                </thead>
                <tbody >

                    {product.map((pd) => {
                        return (
                            <tr >


                                <td
                                    style={{
                                        backgroundColor: "#C2C287",
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
                                        backgroundColor: "#C2C287",
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
                                        backgroundColor: "#C2C287",
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
                                        backgroundColor: "#C2C287",
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
                                        backgroundColor: "#C2C287",
                                        border: "1px solid white",
                                        borderCollapse: "collapse",
                                        padding: "7px",
                                        width: "50px",
                                        color: "black",

                                    }}
                                >
                                    {pd.state}
                                </td>
                            </tr>

                        );
                    })}
                </tbody>
            </table>

        </div>
    );
}
export default Test;