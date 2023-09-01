//SPDX-License-Identifier: MIT

pragma solidity >=0.7.0 <0.9.0;

contract SupplyChain {
    struct Product {
        uint Serial;
        address Manufacturer;
        address ProductID;
        string ProductName;
        string ProductType;
        uint ProductPrice;
        mapping(uint => StateTime) State;
    }
    struct StateTime {
        uint TimeStamp;
        string State;
    }

    struct ProductDetail {
        uint Serial;
        address Manufacturer;
        address ProductID;
        string ProductName;
        string ProductType;
        uint ProductPrice;
        uint TimeStamp;
        string State;
    }

    mapping(address => Product) myproduct;
    ProductDetail[] products;
    address[] ProductAddresses;
    string Manufacturer_Address;

    ProductDetail[] N_Products;

    function enterAddress(string memory _Manufacturer_Address) public {
        Manufacturer_Address = _Manufacturer_Address;
    }

    function getManufacturerAddress() public view returns (string memory) {
        return Manufacturer_Address;
    }

    function createProduct(
        string memory _ProductName,
        string memory _ProductType,
        uint _ProductPrice
    ) public {
        address addr = address(
            bytes20(sha256(abi.encodePacked(msg.sender, block.timestamp)))
        );
        myproduct[addr].Serial = 0;

        myproduct[addr].Manufacturer = msg.sender;
        myproduct[addr].ProductID = addr;
        myproduct[addr].ProductName = _ProductName;
        myproduct[addr].ProductType = _ProductType;
        myproduct[addr].ProductPrice = _ProductPrice;
        StateTime memory _state = StateTime(block.timestamp, "SEETING");
        myproduct[addr].State[myproduct[addr].Serial] = _state;

        myproduct[addr].State[1].TimeStamp = 0;
        myproduct[addr].State[2].TimeStamp = 0;
        myproduct[addr].State[3].TimeStamp = 0;
        myproduct[addr].State[4].TimeStamp = 0;

        ProductAddresses.push(addr);
        products.push(
            ProductDetail(
                myproduct[addr].Serial,
                msg.sender,
                addr,
                _ProductName,
                _ProductType,
                _ProductPrice,
                block.timestamp,
                "SEETING"
            )
        );

        N_Products.push(
            ProductDetail(
                myproduct[addr].Serial,
                myproduct[addr].Manufacturer,
                myproduct[addr].ProductID,
                myproduct[addr].ProductName,
                myproduct[addr].ProductType,
                myproduct[addr].ProductPrice,
                myproduct[addr].State[0].TimeStamp,
                myproduct[addr].State[0].State
            )
        );
    }

    function ChangeState(address addr) public {
        myproduct[addr].Serial++;
        if (myproduct[addr].Serial == 1) {
            StateTime memory _state = StateTime(block.timestamp, "PROCESS");
            myproduct[addr].State[myproduct[addr].Serial] = _state;
            myproduct[addr].State[1].TimeStamp = block.timestamp;
            Delete(addr);

            products.push(
                ProductDetail(
                    myproduct[addr].Serial,
                    msg.sender,
                    addr,
                    myproduct[addr].ProductName,
                    myproduct[addr].ProductType,
                    myproduct[addr].ProductPrice,
                    block.timestamp,
                    "PROCESS"
                )
            );

            N_Products.push(
                ProductDetail(
                    myproduct[addr].Serial,
                    msg.sender,
                    addr,
                    myproduct[addr].ProductName,
                    myproduct[addr].ProductType,
                    myproduct[addr].ProductPrice,
                    block.timestamp,
                    "PROCESS"
                )
            );
        }
        if (myproduct[addr].Serial == 2) {
            StateTime memory _state = StateTime(block.timestamp, "FINISH");
            myproduct[addr].State[myproduct[addr].Serial] = _state;
            myproduct[addr].State[2].TimeStamp = block.timestamp;
            Delete(addr);

            products.push(
                ProductDetail(
                    myproduct[addr].Serial,
                    msg.sender,
                    addr,
                    myproduct[addr].ProductName,
                    myproduct[addr].ProductType,
                    myproduct[addr].ProductPrice,
                    block.timestamp,
                    "FINISH"
                )
            );

            N_Products.push(
                ProductDetail(
                    myproduct[addr].Serial,
                    msg.sender,
                    addr,
                    myproduct[addr].ProductName,
                    myproduct[addr].ProductType,
                    myproduct[addr].ProductPrice,
                    block.timestamp,
                    "FINISH"
                )
            );
        }
        if (myproduct[addr].Serial == 3) {
            StateTime memory _state = StateTime(block.timestamp, "IN_TRANSIT");
            myproduct[addr].State[myproduct[addr].Serial] = _state;
            myproduct[addr].State[3].TimeStamp = block.timestamp;
            Delete(addr);

            products.push(
                ProductDetail(
                    myproduct[addr].Serial,
                    msg.sender,
                    addr,
                    myproduct[addr].ProductName,
                    myproduct[addr].ProductType,
                    myproduct[addr].ProductPrice,
                    block.timestamp,
                    "IN_TRANSIT"
                )
            );

            N_Products.push(
                ProductDetail(
                    myproduct[addr].Serial,
                    msg.sender,
                    addr,
                    myproduct[addr].ProductName,
                    myproduct[addr].ProductType,
                    myproduct[addr].ProductPrice,
                    block.timestamp,
                    "IN_TRANSIT"
                )
            );
        }
        if (myproduct[addr].Serial == 4) {
            StateTime memory _state = StateTime(block.timestamp, "ARRIVED");
            myproduct[addr].State[myproduct[addr].Serial] = _state;
            myproduct[addr].State[4].TimeStamp = block.timestamp;
            Delete(addr);

            products.push(
                ProductDetail(
                    myproduct[addr].Serial,
                    msg.sender,
                    addr,
                    myproduct[addr].ProductName,
                    myproduct[addr].ProductType,
                    myproduct[addr].ProductPrice,
                    block.timestamp,
                    "ARRIVED"
                )
            );

            N_Products.push(
                ProductDetail(
                    myproduct[addr].Serial,
                    msg.sender,
                    addr,
                    myproduct[addr].ProductName,
                    myproduct[addr].ProductType,
                    myproduct[addr].ProductPrice,
                    block.timestamp,
                    "ARRIVED"
                )
            );
        }
    }

    function getAllProductAddr() external view returns (address[] memory) {
        return ProductAddresses;
    }

    function getAllProduct() public view returns (ProductDetail[] memory) {
        return products;
    }

    function getProductState(
        address id
    ) public view returns (uint, uint, uint, uint, uint) {
        return (
            myproduct[id].State[0].TimeStamp,
            myproduct[id].State[1].TimeStamp,
            myproduct[id].State[2].TimeStamp,
            myproduct[id].State[3].TimeStamp,
            myproduct[id].State[4].TimeStamp
        );
    }

    function getProduct(
        address id
    )
        public
        view
        returns (
            uint,
            address,
            address,
            string memory,
            string memory,
            uint,
            uint,
            string memory
        )
    {
        uint _serial = myproduct[id].Serial;
        address _id = id;
        return (
            myproduct[id].Serial,
            myproduct[id].Manufacturer,
            myproduct[id].ProductID,
            myproduct[id].ProductName,
            myproduct[_id].ProductType,
            myproduct[_id].ProductPrice,
            myproduct[_id].State[_serial].TimeStamp,
            myproduct[_id].State[_serial].State
        );
    }

    function Delete(address id) public {
        for (uint i = 0; i < N_Products.length; i++) {
            if (N_Products[i].ProductID == id) {
                for (uint j = i; j < N_Products.length - 1; j++) {
                    N_Products[j] = N_Products[j + 1];
                }
                N_Products.pop();
            }
        }
    }

    // function get() public view returns(uint){
    //     return products[0].Serial;

    // }

    // function GetN_Product(uint _serial) public {
    //     for (uint i = 0; i < 1; i++) {
    //         if (myproduct[ProductAddresses[i]].Serial == _serial) {
    //             N_Products.push(
    //                 ProductDetail(
    //                     myproduct[ProductAddresses[i]].Serial,
    //                     myproduct[ProductAddresses[i]].Manufacturer,
    //                     myproduct[ProductAddresses[i]].ProductID,
    //                     myproduct[ProductAddresses[i]].ProductName,
    //                     myproduct[ProductAddresses[i]].ProductType,
    //                     myproduct[ProductAddresses[i]].ProductPrice,
    //                     myproduct[ProductAddresses[i]].State[_serial].TimeStamp,
    //                     myproduct[ProductAddresses[i]].State[_serial].State
    //                 )
    //             );
    //         }
    //     }
    // }

    function N_Product() public view returns (ProductDetail[] memory) {
        return N_Products;
    }

    // }
}
