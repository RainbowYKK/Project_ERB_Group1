"use client";

import { useState, useEffect } from "react";
import Loading from "@/app/components/loading";
import "./Order.css";

export default function Orders() {
  const [transactionsInfo, setTransactionInfo] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [displayedTransactions, setDisplayedTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  const [transactionId, setTransactionId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [statusValue, setStatusValue] = useState("");

  const handleEdit = (id, currentStatus) => {
    setTransactionId(id);
    setStatusValue(
      currentStatus.toLowerCase().includes("pending")
        ? "Pending Payment"
        : "Paid"
    );
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setStatusValue("");
    setTransactionId(null);
  };

  const handleSave = async () => {
    try {
      const res = await fetch("http://localhost:3030/staff/transactionUpdate", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          transactionId,
          statusValue,
        }),
      });

      if (!res.ok) {
        throw new Error("Server Error");
      }

      // Update local state to reflect the change
      setTransactionInfo((prev) =>
        prev.map((transaction) =>
          transaction._id === transactionId
            ? { ...transaction, status: statusValue }
            : transaction
        )
      );
      closeModal();
    } catch (err) {
      console.log(err.message);
    }
  };

  // Fetch all transactions at the start
  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const res = await fetch("http://localhost:3030/staff/transactions");
        if (res.ok) {
          const data = await res.json();

          const filteredTransactions = data.result
            .filter((transaction) => transaction.status !== "Shopping Cart")
            .sort((a, b) => {
              return new Date(b.createdAt) - new Date(a.createdAt);
            });

          setTransactionInfo(filteredTransactions);
          setLoading(false);
        }
      } catch (err) {
        console.error("Error fetching transactions:", err);
      }
    };

    fetchTransactions();
  }, []);

  // Update displayed transactions based on the search term
  useEffect(() => {
    if (!searchTerm.trim()) {
      // Show all transactions if no search term
      setDisplayedTransactions(transactionsInfo);
    } else {
      // Filter based on the search term
      const filtered = transactionsInfo.filter((transaction) => {
        const searchLower = searchTerm.toLowerCase();
        return (
          transaction.userId.toLowerCase().includes(searchLower) ||
          transaction.type.toLowerCase().includes(searchLower) ||
          transaction.price.includes(searchLower) ||
          transaction.status.toLowerCase().includes(searchLower)
        );
      });
      setDisplayedTransactions(filtered);
    }
  }, [searchTerm, transactionsInfo]);

  return (
    <>
      {loading ? (
        <div className="h-full flex justify-center">
          <Loading />
        </div>
      ) : (
        <div className="TeachList-container" id="TeachList-container">
          {/* Search Bar */}
          <label className="TeachList-input" id="TeachList-searchBar">
            <input
              type="text"
              className="TeachList-inputField"
              id="TeachList-searchInput"
              placeholder="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="TeachList-icon"
              id="TeachList-icon"
            >
              <path
                fillRule="evenodd"
                d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                clipRule="evenodd"
              />
            </svg>
          </label>

          {/* List of Transactions */}
          <div
            className="TeachList-tableContainer"
            id="TeachList-tableContainer"
          >
            <table className="TeachList-table" id="TeachList-table">
              {/* Table Head */}
              <thead
                className="TeachList-tableHeader"
                id="TeachList-tableHeader"
              >
                <tr className="TeachList-headerRow" id="TeachList-headerRow">
                  <th id="TeachList-indexHeader"></th>
                  <th id="TeachList-userIdHeader">User ID</th>
                  <th id="TeachList-typeHeader">Type</th>
                  <th id="TeachList-priceHeader">Price</th>
                  <th id="TeachList-statusHeader">Status</th>
                  <th id="TeachList-createdAtHeader">Created Time</th>
                </tr>
              </thead>

              {/* Table Body */}
              <tbody className="TeachList-tableBody" id="TeachList-tableBody">
                {displayedTransactions.length === 0 ? (
                  <tr
                    className="TeachList-noResultRow"
                    id="TeachList-noResultRow"
                  >
                    <td
                      colSpan="6"
                      className="text-center"
                      id="TeachList-noResultMessage"
                    >
                      No result is found
                    </td>
                  </tr>
                ) : (
                  displayedTransactions.map((transaction, index) => (
                    <tr
                      key={index}
                      className="TeachList-row"
                      id={`TeachList-row-${index}`}
                    >
                      <td
                        className="TeachList-cell"
                        id={`TeachList-index-${index}`}
                      >
                        {index + 1}
                      </td>
                      <td
                        className="TeachList-cell"
                        id={`TeachList-userId-${index}`}
                      >
                        {transaction.userId}
                      </td>
                      <td
                        className="TeachList-cell"
                        id={`TeachList-type-${index}`}
                      >
                        {transaction.type.toLowerCase().includes("class")
                          ? "Class"
                          : transaction.type.includes("package")
                          ? "Package"
                          : transaction.type.includes("room")
                          ? "Room Rental"
                          : "Other"}
                      </td>
                      <td
                        className="TeachList-cell"
                        id={`TeachList-price-${index}`}
                      >
                        {transaction.price}
                      </td>
                      <td
                        className="TeachList-cell"
                        id={`TeachList-status-${index}`}
                      >
                        <span
                          onClick={() =>
                            handleEdit(transaction._id, transaction.status)
                          }
                        >
                          {transaction.status.toLowerCase().includes("pending")
                            ? "Pending"
                            : "Paid"}
                        </span>{" "}
                      </td>
                      <td
                        className="TeachList-cell"
                        id={`TeachList-createdAt-${index}`}
                      >
                        {
                          new Date(transaction.createdAt)
                            .toLocaleString()
                            .split(",")[0]
                        }{" "}
                        {/* Format date */}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
      {/* Modal for Editing */}
      {isModalOpen && (
        <div className="fixed inset-0 flex justify-center items-center bg-gray bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-lg">
            <h3 className="text-lg font-semibold mb-4">Edit Status</h3>
            <select
              value={statusValue}
              onChange={(e) => setStatusValue(e.target.value)}
              className="select select-bordered w-full"
            >
              <option value="pending">Pending</option>
              <option value="paid">Paid</option>
            </select>
            <div className="flex justify-end mt-4">
              <button
                className="btn btn-sm bg-gray-500 hover:bg-gray-600 text-white rounded mr-2"
                onClick={closeModal}
              >
                Cancel
              </button>
              <button
                className="btn btn-sm bg-blue-500 hover:bg-blue-600 text-white rounded"
                onClick={handleSave}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
