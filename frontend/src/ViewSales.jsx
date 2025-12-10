import { useState, useEffect } from "react";
import { useNavigate, Link } from 'react-router-dom';
import "./ViewSales.css"
function ViewSales() {

    const [sales, setSales] = useState([]);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const [isEditable, setIsEditable] = useState(true);
    const navigate = useNavigate();

    const fetchSalesData = async () => {
        setLoading(true);
        setIsEditable(false);

        try {
            const res = await fetch(`${import.meta.env.VITE_API_URL}sales`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: "include"
            });

            if (!res.ok) {
                const content = await res.json();
                navigate("/error", {
                    state: {
                        errorCode: res.status,
                        errorMessage: content.message || "Fetch error"
                    }
                });
                return;
            }

            else {
                const content = await res.json();
                console.log(content);
                setSales(content);
            }
        }

        catch (error) {
            navigate("/error", {
                state: {
                    errorCode: 500,
                    errorMessage: "Network error: " + error.message
                }
            });

        } finally {
            setIsEditable(true);
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchSalesData();
    }, []);


    const itemsPerPage = 10;
    const [currentPage, setCurrentPage] = useState(1);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;

    const currentItems = sales.slice(indexOfFirstItem, indexOfLastItem);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    }

    return (
        <div className="max-w-4xl mx-auto my-8 p-4 shadow-lg rounded-lg bg-white">
            <h1>View Sales</h1>
            <br /><br />
            <table className="table-auto w-full text-left border-collapse border border-gray-300">
                <thead className="bg-blue-100">
                    <tr>
                        <th className="px-6 py-3 font-medium text-gray-700">Date</th>
                        <th className="px-6 py-3 font-medium text-gray-700">Order#</th>
                        <th className="px-6 py-3 font-medium text-gray-700">Seller</th>
                        <th className="px-6 py-3 font-medium text-gray-700">Buyer</th>
                        <th className="px-6 py-3 font-medium text-gray-700">11kgK C</th>
                        <th className="px-6 py-3 font-medium text-gray-700">11kgK R</th>
                        <th className="px-6 py-3 font-medium text-gray-700">11kgP C</th>
                        <th className="px-6 py-3 font-medium text-gray-700">11kgP R</th>
                        <th className="px-6 py-3 font-medium text-gray-700">2.7kg C</th>
                        <th className="px-6 py-3 font-medium text-gray-700">2.7kg R</th>
                        <th className="px-6 py-3 font-medium text-gray-700">Total</th>
                        <th className="px-6 py-3 font-medium text-gray-700"> </th>
                        <th className="px-6 py-3 font-medium text-gray-700"> </th>
                    </tr>
                </thead>
                <tbody>
                    {currentItems.map((sale) => (
                        <tr key={sale.id} className="border-b hover:bg-gray-50">
                            <td className="px-6 py-3">{sale.date}</td>
                            <td className="px-6 py-3">{sale.number}</td>
                            <td className="px-6 py-3">{sale.seller}</td>
                            <td className="px-6 py-3">{sale.buyer}</td>
                            <td className="px-6 py-3">{sale.qty11kgKCylinder}</td>
                            <td className="px-6 py-3">{sale.qty11kgKRefill}</td>
                            <td className="px-6 py-3">{sale.qty11kgPCylinder}</td>
                            <td className="px-6 py-3">{sale.qty11kgPRefill}</td>
                            <td className="px-6 py-3">{sale.qty2_7kgCylinder}</td>
                            <td className="px-6 py-3">{sale.qty2_7kgRefill}</td>
                            <td className="px-6 py-3">{sale.totalPrice}</td>
                            <td className="px-6 py-3"><Link to="/edit-sale"><button className="btn">Edit</button></Link></td>
                            <td className="px-6 py-3"><button className="btn">Delete</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <br /><br />
            <div className="mt-4 flex justify-between items-center">
                <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-700 disabled:opacity-50"
                >
                    Previous
                </button>
                &nbsp; &nbsp;
                Page {currentPage} of {Math.ceil(sales.length / itemsPerPage)}
                &nbsp; &nbsp; &nbsp;
                <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === Math.ceil(sales.length / itemsPerPage)}
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-700 disabled:opacity-50"
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default ViewSales;