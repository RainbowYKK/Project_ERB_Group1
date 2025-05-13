"use client";
import { useState, useEffect } from "react";
import Loading from "@/app/components/loading";
import { X, Check } from "lucide-react";

export default function Profile() {
  const [username, setUserName] = useState(null);
  const [email, setEmail] = useState(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editField, setEditField] = useState(null);
  const [editValue, setEditValue] = useState("");

  const [isLoading, setIsLoading] = useState(true);

  const handleEdit = (field) => {
    setEditField(field);
    setEditValue(
      field === "username" ? username : field === "email" ? email : ""
    );
    setIsModalOpen(true);
  };

  const handleSave = async () => {
    const token = localStorage.getItem("token");

    console.log(editValue, editField);
    try {
      const res = await fetch("http://localhost:3030/staff/profit/edit", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          editField,
          editValue,
        }),
      });

      if (!res.ok) {
        throw new Error("Server Error");
      }

      editField === "username"
        ? setUserName(editValue)
        : editField === "email"
        ? setEmail(editValue)
        : "";
    } catch (err) {
      console.log(err.message);
    }

    setIsModalOpen(false);
    setEditField(null);
    setEditValue("");
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const renderFieldInput = () => {
    switch (editField) {
      case "username":
        return (
          <input
            type="text"
            value={editValue || ""}
            onChange={(e) => setEditValue(e.target.value)}
            className="input input-bordered w-full"
            placeholder="Enter your username"
          />
        );
      case "email":
        return (
          <input
            type="email"
            value={editValue || ""}
            onChange={(e) => setEditValue(e.target.value)}
            className="input input-bordered w-full"
            placeholder="Enter your email"
          />
        );
      case "picture":
        return (
          <input
            type="picture"
            value={editValue || ""}
            onChange={(e) => setEditValue(e.target.value)}
            className="input input-bordered w-full"
            placeholder="Enter the URL"
          />
        );
      default:
        return null;
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    async function fetchUser() {
      try {
        const res = await fetch("http://localhost:3030/staff/profile", {
          method: "POST",
          headers: {
            "Content-type": "application/json",
            authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          throw new Error("Failed to fetch");
        }

        const data = await res.json();
        setUserName(data.username);
        setEmail(data.email);
        setIsLoading(false);
      } catch (err) {
        console.log(err.message);
      }
    }

    // dummy code
    async function regUser() {
      try {
        const res = await fetch("http://localhost:3030/staff/reg", {
          method: "POST",
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            username: "admin",
            email: "admin@gmail.com",
            password: "Ab12",
          }),
        });

        if (!res.ok) {
          throw new Error("Failed to fetch");
        }

        const data = await res.json();
        console.log("Staff register OK");
      } catch (err) {
        console.log(err.message);
      }
    }

    // regUser();
    fetchUser();
  }, []);

  const [password, setPassword] = useState("");
  const [repeatPW, setRepeatPW] = useState("");
  const [passwordErr, setPasswordErr] = useState(null);
  const [repeatPWErr, setRepeatPWErr] = useState(null);

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    if (name === "password") {
      setPassword(value);
    } else if (name === "repeated-password") {
      setRepeatPW(value);
    }
  };

  async function handleSubmit(e) {
    e.preventDefault(); // Prevent the form from submitting

    setPasswordErr(null);
    setRepeatPWErr(null);

    let token = localStorage.getItem("token");
    console.log(token);

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{4,}$/; // 4-digit for testing
    if (!password) {
      setPasswordErr("Please enter a password");
      return;
    }
    if (!passwordRegex.test(password)) {
      setPasswordErr(
        "Password must be at least 4 characters long and contain one number, one lowercase letter, and one uppercase letter"
      );
      return;
    }
    if (!repeatPW) {
      setRepeatPWErr("Please re-enter the password");
      return;
    }
    if (password !== repeatPW) {
      setRepeatPWErr("The two passwords do not match");
      return;
    }

    try {
      const res = await fetch("http://localhost:3030/update-password", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        console.log("Fail");
        setPasswordErr(data.error || "Failed to update password");
      } else {
        console.log("Reset successfully:", data.message);
        setPasswordErr(null);
        setRepeatPWErr("Password updated successfully");
        setPassword("");
        setRepeatPW("");
      }
    } catch (err) {
      console.log(err.message);
      setPasswordErr("Network error, please try again");
    }
  }

  return (
    <>
      {isLoading ? (
        <div className="h-full flex justify-center">
          <Loading />
        </div>
      ) : (
        <div className="w-full max-w-2xl mx-auto p-4 space-y-4 border-amber-2">
          {/* Basic Information */}
          <div className="bg-white rounded-lg p-6 border-2 border-gray-400">
            <h2 className="text-xl font-semibold mb-6">Basic Information</h2>
            <div className="flex items-center justify-center mb-4 p-4 border-b-2 border-gray-300">
              <div className="avatar">
                <div
                  className="w-24 rounded-full hover:cursor-pointer"
                  onClick={() => handleEdit("picture")}
                >
                  <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                </div>
              </div>
            </div>
            <div className="space-y-6">
              <div className="flex items-center  border-gray-300  pl-3 pr-3">
                <span className="w-28">Username:</span>
                <span className="flex-grow px-4">
                  {username ? username : "Not yet set"}
                </span>
                <button
                  className="btn btn-sm normal-case bg-gray-500 hover:bg-gray-600 text-white border-none rounded-xl"
                  onClick={() => handleEdit("username")}
                >
                  Edit
                </button>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="bg-white rounded-lg p-6 border-2 border-gray-400">
            <h2 className="text-xl font-semibold mb-6 border-b-2 border-gray-300 pb-2">
              Contact Information
            </h2>
            <div className="space-y-6">
              <div className="flex items-center  border-gray-300  pl-3 pr-3">
                <span className="w-28">Email:</span>
                <span className="flex-grow px-4">
                  {email ? email : "Not yet set"}
                </span>
                <button
                  className="btn btn-sm normal-case bg-gray-500 hover:bg-gray-600 text-white border-none rounded-xl"
                  onClick={() => handleEdit("email")}
                >
                  Edit
                </button>
              </div>
            </div>
          </div>

          {/* Change Password */}
          <div className="bg-white rounded-lg p-6 border-2 border-gray-400">
            <h2 className="text-xl font-semibold mb-6 border-b-2 border-gray-300 pb-2">
              Change Password
            </h2>

            {/* New Password */}
            <div className="flex items-center mb-1">
              <div className="w-1/3 text-gray-700">New Password:</div>
              <label className="flex items-center w-2/3 input mb-2">
                <svg
                  className="h-[1em] opacity-50 mr-2"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <g
                    strokeLinejoin="round"
                    strokeLinecap="round"
                    strokeWidth="2.5"
                    fill="none"
                    stroke="currentColor"
                  >
                    <path d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z"></path>
                    <circle
                      cx="16.5"
                      cy="7.5"
                      r=".5"
                      fill="currentColor"
                    ></circle>
                  </g>
                </svg>
                <input
                  type="password"
                  name="password"
                  value={password}
                  onChange={handleOnChange}
                  placeholder="Password"
                  className="w-full"
                />
              </label>
            </div>

            {/* Password Error/Success */}
            <div className="h-6 mb-4">
              {passwordErr !== null &&
                (passwordErr ? (
                  <div className="flex justify-between">
                    <p className="text-red-500 text-xs">{`${passwordErr}`}</p>
                    <X className="h-4 w-4 text-red-500" />
                  </div>
                ) : (
                  <div className="flex justify-end">
                    <Check className="h-4 w-4 text-green-500" />
                  </div>
                ))}
            </div>

            {/* Confirmed Password */}
            <div className="flex items-center">
              <div className="w-1/3 text-gray-700">Confirmed Password:</div>
              <label className="flex items-center w-2/3 input mb-2">
                <svg
                  className="h-[1em] opacity-50 mr-2"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <g
                    strokeLinejoin="round"
                    strokeLinecap="round"
                    strokeWidth="2.5"
                    fill="none"
                    stroke="currentColor"
                  >
                    <path d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z"></path>
                    <circle
                      cx="16.5"
                      cy="7.5"
                      r=".5"
                      fill="currentColor"
                    ></circle>
                  </g>
                </svg>
                <input
                  type="password"
                  name="repeated-password"
                  value={repeatPW}
                  onChange={handleOnChange}
                  placeholder="Re-enter Password"
                  className="w-full"
                />
              </label>
            </div>
            {/* Confirmed Password Error/Success */}
            <div className="h-6 mb-1">
              {repeatPWErr !== null &&
                (repeatPWErr === "Password updated successfully" ? (
                  <div className="flex justify-between">
                    <p className="text-green-500 text-xs">{repeatPWErr}</p>
                    <Check className="h-4 w-4 text-green-500" />
                  </div>
                ) : repeatPWErr ? (
                  <div className="flex justify-between">
                    <p className="text-red-500 text-xs mb-2">{repeatPWErr}</p>
                    <X className="h-4 w-4 text-red-500" />
                  </div>
                ) : (
                  <div className="flex justify-end">
                    <Check className="h-4 w-4 text-green-500" />
                  </div>
                ))}
            </div>
            {/* Submit Button */}
            <div className="flex justify-center">
              <button
                className="btn btn-md bg-gray-500 hover:bg-gray-600 text-white rounded-2xl mr-2"
                onClick={handleSubmit}
              >
                Submit
              </button>
            </div>
          </div>

          {/* Modal for Editing */}
          {isModalOpen && (
            <div className="fixed inset-0 flex justify-center items-center bg-gray bg-opacity-50">
              <div className="bg-white p-6 rounded shadow-lg">
                <h3 className="text-lg font-semibold mb-4">
                  Edit {editField === "dateOfBirth" ? "Birthday" : editField}
                </h3>
                {renderFieldInput()}
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
        </div>
      )}
    </>
  );
}
