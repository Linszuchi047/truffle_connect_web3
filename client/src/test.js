import { useState, useEffect } from "react";
import * as XLSX from "xlsx";


function Test({ state }) {

    const [data, setData] = useState([]);

    const handleFileUpload = (e) => {
        const reader = new FileReader();
        reader.readAsBinaryString(e.target.files[0]);
        reader.onload = (e) => {
            const data = e.target.result;
            const workbook = XLSX.read(data, { type: "binary" });
            const sheetName = workbook.SheetNames[0];
            const sheet = workbook.Sheets[sheetName];
            const parsedData = XLSX.utils.sheet_to_json(sheet);
            setData(parsedData);

        };
    }

    const [Manufacturer_Address, setAdress] = useState('');

    useEffect(() => {
        const { contract } = state;
        async function readData() {
            const data = await contract.methods.getManufacturerAddress().call();
            setAdress(data);
        }
        contract && readData();
    }, [state]);


    let k = [];
    async function set() {
        const { contract } = state;
        for (let i = 0; i < data.length; i++) {
            k.push(Object.values(data[i])[1]);
            await contract.methods.createProduct(Object.values(data[i])[1], Object.values(data[i])[2], Object.values(data[i])[3], Object.values(data[i])[4]).send({ from: Manufacturer_Address, gas: '1000000' });

        }
        alert("Tracking is successul");
        window.location.reload();
    }


    return (
        <div className="App" style={{ position: 'fixed', top: '20%', left: '40%' }}>

            <input
                type="file"
                accept=".xlsx, .xls"
                onChange={handleFileUpload}
            />




            {data.length > 0 && (
                <>


                    <button onClick={() => set()}>Upload</button>
                </>


                // <table className="table">
                //     <thead>
                //         <tr>
                //             {Object.keys(data[0]).map((key) => (
                //                 <th>{key}</th>

                //             ))}
                //             {Object.values(data[0])[1]}
                //         </tr>
                //     </thead>
                //     <tbody>
                //         {data.map((row, index) => (
                //             <tr key={index}>
                //                 {Object.values(row).map((value) => (
                //                     <td key={index}>{value}</td>
                //                 ))}
                //             </tr>
                //         ))}
                //     </tbody>
                // </table>
            )}




        </div>
    );
}

export default Test;