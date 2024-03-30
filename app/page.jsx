//home component
"use client";
import React, { useState } from "react";
import Card from "@components/Card_main";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import Modal from '../components/Modal'
import Funds from "@app/Funds/page";
import Link from 'next/link';
import { useRouter } from 'next/router';
import {NextUIProvider} from '@nextui-org/react'
import Sidebar from "@components/Sidebar/Sidebar"
import { signIn, signOut, useSession, getProviders } from "next-auth/react";
import './globals.css';



// import Search from "@components/Search"
export default function RootLayout({ children }) {
  const { data: session } = useSession();

  return (
  <section className="appage w-full flex-center flex-col">
    {!session? 
    <>
      <h1 className="head_text text-center">
        Welcome to
        <br className="max-md:hidden" />
        <span className="orange_gradient text-center">Faculty Flow</span>!
      </h1>
      <p className="desc text-center">
        Faculty Flow is a user-friendly data manager tool.<br />
        Have an event to add? <span className="font-bold">Flow</span> it!
      </p>
    </> : 
    <>
      <h1 className="head_text text-center">
        Hello,
        <br className="max-md:hidden" />
        <span className="orange_gradient text-center">{session.user.name}</span>!
      </h1>
      <section className="desc text-center">
        Faculty Flow is a user-friendly data manager tool.<br />
        Have an event to add? <span className="font-bold">Flow</span> it!
      </section>
    </>
    }
    <div className=" flex flex-row" style={{position:"relative",bottom:"-5vw"}}>
    <div data-toggle="modal" data-target="#exampleModalLong">
      <Link href = "/Travel">
        <Card
          title="Travel"
          subtitle="Subtitle 1"
          description="Description 1"
          imageUrl="/images/card1.jpg"
          icon="bi bi-luggage-fill"
        />
      </Link>
    </div>

    <div data-toggle="modal" data-target="#exampleModalLong">
      <Link href = "/Funds">
        <Card
          title="Funds"
          subtitle="Subtitle 2"
          description="Description 2"
          imageUrl="/images/card2.jpg"
          icon="bi bi-cash-coin"
        />
      </Link>
    </div>

    <div  data-toggle="modal" data-target="#exampleModalLong">
        <Link href = "/Inventory">
        <Card
          title="Inventory"
          subtitle="Subtitle 2"
          description="Description 2"
          imageUrl="/images/card2.jpg"
          icon="bi bi-tools"
        />
      </Link>
    </div>

    
      <div  data-toggle="modal" data-target="#exampleModalLong">
        <Link href = "/Documents">
          <Card
            title="Documents"
            subtitle="Subtitle 2"
            description="Description 2"
            imageUrl="/images/card2.jpg"
            icon="bi bi-file-earmark-zip-fill"
          />
        </Link>
      </div>
    
    </div>

  </section>
  // <section><Funds/></section>
  // <section><Search/></section>
);
}

// export default Home;

