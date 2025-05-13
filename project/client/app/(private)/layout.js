"use client";
import { redirect } from "next/navigation";
import { useAuth } from "@/app/components/AuthContext";
import { useEffect } from "react";

export default function PrivateLayout({ children }) {
  return children;
}
