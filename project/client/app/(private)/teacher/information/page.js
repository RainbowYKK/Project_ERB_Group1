"use client";
import { useState, useEffect } from "react";
import Loading from "@/app/components/loading";
import { X, Check } from "lucide-react";

export default function Information() {
  const [username, setUserName] = useState(null);
  const [dateOfBirth, setDateOfBirth] = useState(null);
  const [gender, setGender] = useState("");
  const [email, setEmail] = useState(null);
  const [phone, setPhone] = useState(null);
  const [point, setPoint] = useState(null);
  const [instagram, setInstagram] = useState(null);
  const [nickname, setNickname] = useState(null);
  const [style, setStyle] = useState(null);
  const [profilePic, setprofilePic] = useState(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editField, setEditField] = useState(null);
  const [editValue, setEditValue] = useState("");

  const [isLoading, setIsLoading] = useState(true);

  const handleEdit = (field) => {
    setEditField(field);
    setEditValue(
      field === "username"
        ? username
        : field === "dateOfBirth"
        ? dateOfBirth
        : field === "gender"
        ? gender
        : field === "email"
        ? email
        : field === "phone"
        ? phone
        : field === "profilePic"
        ? profilePic
        : field === "nickname"
        ? nickname
        : field === "style"
        ? style
        : field === "instagram"
        ? instagram
        : ""
    );
    setIsModalOpen(true);
  };

  const handleSave = async () => {
    const token = localStorage.getItem("token");
    console.log(editValue, editField);

    try {
      const res = await fetch("http://localhost:3030/teacher/edit", {
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
        : editField === "dateOfBirth"
        ? setDateOfBirth(editValue)
        : editField === "gender"
        ? setGender(editValue)
        : editField === "email"
        ? setEmail(editValue)
        : editField === "phone"
        ? setPhone(editValue)
        : editField === "nickname"
        ? setNickname(editValue)
        : editField === "style"
        ? setStyle(editValue)
        : editField === "profilePic"
        ? setprofilePic(editValue)
        : editField === "instagram"
        ? setInstagram(editValue)
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
      case "dateOfBirth":
        return (
          <input
            type="date"
            value={editValue || ""}
            onChange={(e) => setEditValue(e.target.value)}
            className="input input-bordered w-full"
            placeholder="Enter your birthday"
          />
        );
      case "gender":
        return (
          <select
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            className="select select-bordered w-full"
          >
            <option value="">Select gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
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
      case "phone":
        return (
          <input
            type="tel"
            value={editValue || ""}
            onChange={(e) => {
              // Remove all non-numeric characters
              const telephone = e.target.value.replace(/\D/g, "");
              // Only accept at most 8 numbers
              if (telephone.length <= 8) {
                setEditValue(telephone);
              }
            }}
            className="input input-bordered w-full"
            placeholder="Enter your phone number"
          />
        );
      case "nickname":
        return (
          <input
            type="string"
            value={editValue || ""}
            onChange={(e) => setEditValue(e.target.value)}
            className="input input-bordered w-full"
            placeholder="Enter your nickname"
          />
        );
      case "style":
        return (
          <input
            type="string"
            value={editValue || ""}
            onChange={(e) => setEditValue(e.target.value)}
            className="input input-bordered w-full"
            placeholder="Enter your dancing style"
          />
        );
      case "instagram":
        return (
          <input
            type="tel"
            value={editValue || ""}
            onChange={(e) => setEditValue(e.target.value)}
            className="input input-bordered w-full"
            placeholder="Enter your Instagram tag"
          />
        );
      case "profilePic":
        return (
          <input
            type="string"
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

  // Starting
  useEffect(() => {
    const token = localStorage.getItem("token");

    async function fetchUser() {
      try {
        const res = await fetch("http://localhost:3030/teacher/information", {
          method: "POST",
          headers: {
            "Content-type": "application/json",
            authorization: `Bearer ${token}`,
          },
          // body: JSON.stringify({
          //   objectId: "67d3eb571cc1f316f7a27482",
          // }),
        });

        if (!res.ok) {
          throw new Error("Failed to fetch");
        }

        const data = await res.json();
        setUserName(data.username);
        setDateOfBirth(data.birthday);
        setGender(data.gender);
        setEmail(data.email);
        setPhone(data.phone);
        setPoint(data.point);
        setInstagram(data.instagram);
        setNickname(data.nickname);
        setprofilePic(data.avatar);
        setStyle(data.style);
        setIsLoading(false);
      } catch (err) {
        console.log(err.message);
      }
    }
    // dummy code
    async function getUser() {
      try {
        const res = await fetch("http://localhost:3030/teacher/reg", {
          method: "POST",
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            username: "Mary",
            phone: "98788888",
            email: "ade@gmail.com",
            password: Ab12,
          }),
        });

        if (!res.ok) {
          throw new Error("Failed to fetch");
        }

        const data = await res.json();
        console.log("Teacher register OK");
      } catch (err) {
        console.log(err.message);
      }
    }

    // getUser();
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
        <div className="flex justify-center items-center h-screen">
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
                  onClick={() => handleEdit("profilePic")}
                >
                  <img src={profilePic} />
                </div>
              </div>
            </div>
            <div className="space-y-6">
              <div className="flex items-center border-b-2 border-gray-300 pb-4 pl-3 pr-3">
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

              <div className="flex items-center border-b-2 border-gray-300 pb-4 pl-3 pr-3">
                <span className="w-28">Date of Birth:</span>
                <span className="flex-grow px-4">
                  {dateOfBirth ? dateOfBirth.slice(0, 10) : "Not yet set"}
                </span>
                <button
                  className="btn btn-sm normal-case bg-gray-500 hover:bg-gray-600 text-white border-none rounded-xl"
                  onClick={() => handleEdit("dateOfBirth")}
                >
                  Edit
                </button>
              </div>

              <div className="flex items-center border-b-2 border-gray-300 pb-4 pl-3 pr-3">
                <span className="w-28">Gender:</span>
                <span className="flex-grow px-4">
                  {gender ? gender : "Not yet set"}
                </span>
                <button
                  className="btn btn-sm normal-case bg-gray-500 hover:bg-gray-600 text-white border-none rounded-xl"
                  onClick={() => handleEdit("gender")}
                >
                  Edit
                </button>
              </div>

              <div className="flex items-center border-b-2 border-gray-300 pb-4 pl-3 pr-3">
                <span className="w-28">Nick Name:</span>
                <span className="flex-grow px-4">
                  {nickname ? nickname : "Not yet set"}
                </span>
                <button
                  className="btn btn-sm normal-case bg-gray-500 hover:bg-gray-600 text-white border-none rounded-xl"
                  onClick={() => handleEdit("nickname")}
                >
                  Edit
                </button>
              </div>

              <div className="flex items-center pb-2 pl-3 pr-3">
                <span className="w-28">Dance Style:</span>
                <span className="flex-grow px-4">
                  {style ? style : "No data"}
                </span>
                <button
                  className="btn btn-sm normal-case bg-gray-500 hover:bg-gray-600 text-white border-none rounded-xl"
                  onClick={() => handleEdit("style")}
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
              <div className="flex items-center border-b-2 border-gray-300 pb-4 pl-3 pr-3">
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

              <div className="flex items-center border-b-2 border-gray-300 pb-4 pl-3 pr-3">
                <span className="w-28">Phone:</span>
                <span className="flex-grow px-4">
                  {phone ? phone : "Not yet set"}
                </span>
                <button
                  className="btn btn-sm normal-case bg-gray-500 hover:bg-gray-600 text-white border-none rounded-xl"
                  onClick={() => handleEdit("phone")}
                >
                  Edit
                </button>
              </div>

              <div className="flex items-center pb-2 pl-3 pr-3">
                <span className="w-28">IG:</span>
                <span className="flex-grow px-4">
                  {instagram ? instagram : "Not yet set"}
                </span>
                <button
                  className="btn btn-sm normal-case bg-gray-500 hover:bg-gray-600 text-white border-none rounded-xl"
                  onClick={() => handleEdit("instagram")}
                >
                  Edit
                </button>
              </div>
            </div>
          </div>

          {/* Purchase Rewards */}
          <div className="bg-white rounded-lg p-6 border-2 border-gray-400">
            <h2 className="text-xl font-semibold mb-6 border-b-2 border-gray-300 pb-2">
              Purchase Rewards
            </h2>
            <div className="space-y-6">
              <div className="flex items-center border-b-2 border-gray-300 pb-4 pl-3 pr-3">
                <span className="w-28">Reward Points:</span>
                <span className="flex-grow px-4">{point ? point : 0}</span>
                <span className="text-gray-500">1 Point = $1</span>
              </div>

              <div className="flex items-center pb-2 pl-3">
                <span className="w-28">Special Tags:</span>
                {/* <div className="flex flex-col px-4 gap-3 flex-grow">
                  {userData.tags.map((tag, index) => (
                    <div
                      key={index}
                      className={`${tag.color} text-white px-4 py-2 rounded-full flex items-center gap-2 justify-between w-full`}
                    >
                      <span>{tag.name}</span>
                      <span className="text-sm">Level: {tag.level}</span>
                    </div>
                  ))}
                </div> */}
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
                  Edit{" "}
                  {editField === "dateOfBirth"
                    ? "Birthday"
                    : editField === "style"
                    ? "Dance Style"
                    : editField}
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
