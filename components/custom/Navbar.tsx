"use client";

import { signOut, useSession } from "next-auth/react";
import { Button } from "../ui/button";
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ModeToggle } from "../theme-toggle";
import Link from "next/link";
import { redirect } from "next/navigation";

export default function Navbar() {
  const { data } = useSession();
  return (
    <>
      <div className="flex justify-around py-4 bg-muted">
        <Link href="/">
          <h3 className="text-2xl font-semibold">Blogify</h3>
        </Link>
        <div className="flex items-center gap-5">
          <ModeToggle />
          {data?.user ? (
            <>
              <DropdownMenu>
                <DropdownMenuTrigger>
                  {" "}
                  <div className="flex items-center gap-3">
                    {data.user.image && (
                      <Image
                        className="rounded-full"
                        src={data.user.image}
                        alt="profile"
                        width={35}
                        height={35}
                      />
                    )}
                    <p>{data.user.name}</p>
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => redirect("/")}>
                    Blogs
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => redirect("/admin")}>
                    Admin
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => signOut()}>
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <Button>Signin</Button>
          )}
        </div>
      </div>
    </>
  );
}
