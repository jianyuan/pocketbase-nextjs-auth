"use client";

import { logout } from "@/lib/actions/auth";
import Link from "next/link";
import { useUser } from "./pocketbase-provider";

export function Navbar() {
  const user = useUser();

  return (
    <div className="bg-neutral text-neutral-content">
      <div className="navbar mx-auto max-w-xl">
        <div className="navbar-start">
          <Link href="/" className="btn btn-ghost text-xl">
            PB + Next.js
          </Link>
        </div>
        <div className="navbar-end">
          <ul className="menu menu-horizontal">
            {user ? (
              <>
                <li>
                  <Link href="/dashboard">{user.email}</Link>
                </li>
                <li>
                  <button
                    onClick={() => {
                      logout();
                    }}
                  >
                    Log out
                  </button>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link href="/login">Login</Link>
                </li>
                <li>
                  <Link href="/register">Register</Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}
