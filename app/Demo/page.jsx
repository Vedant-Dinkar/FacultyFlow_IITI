'use client'
import React from 'react'
import { useState,useEffect } from 'react';
import {useSession} from "next-auth/react";
import { useRouter } from "next/navigation";
const page = () => {
  const router=useRouter();
    const [dep, setDep] = useState("");
    
  const [tot, setTot] = useState("");
  const [name, setName] = useState("");
  const [amount, setAmount] = useState(0);
  const [date, setDate] = useState("");
  const { data: session } = useSession();
  const [allPosts, setAllPosts] = useState([]);
  const [allEntry, setAllEntry] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [selectedDepartment2, setSelectedDepartment2] = useState("");

  const handleSelectChange = async(event) => {
    const value = await event.target.value;
    setSelectedDepartment(value);
    
  };
  const handleSelectChange2 = async(event) => {
    const value = await event.target.value;
    setSelectedDepartment2(value);
   
  };
  const handleSubmit = async () => {
    

    const response = await fetch(`/api/funds`)
    const response2 = await fetch(`/api/funds/get_entry`)
   
    const fundsdata = await response.json();
    // const filteredPosts = fundsdata.filter(
    //   (item) => item.creator._id === session?.user?.id
    // );
    
    setAllPosts(fundsdata);
    const entrydata = await response2.json();
    // const filteredPosts = fundsdata.filter(
    //   (item) => item.creator._id === session?.user?.id
    // );
    
    setAllEntry(entrydata);
   
    
   };
   useEffect(() => {
    handleSubmit();
  });
  

  const createPrompt = async (e) => {
    e.preventDefault();
    
    const mid = await session?.user.id;

    try {
      const response = await fetch("/api/funds/new", {
        method: "POST",
        body: JSON.stringify({
          dep: dep,
          tot: tot,
          
          userId: mid,
        }),
      });

    //   const entry="Added";
    //   const response2 = await fetch("/api/logs/new", {
    //     method: "POST",
    //     body: JSON.stringify({
    //       userId: mid,
    //       title: title,
    //       type: type,
    //       entry : entry,
    //       price: price,
    //       date : new Date().toDateString()
    //     }),
    //   });

      // if (response.ok) {
       
      //   router.push("/Funds");
      // }
      console.log('please');
    } catch (error) {
      console.log(error);
    }
  };
  const createPrompt2 = async (e) => {
    
    e.preventDefault();
    
    const mid = await session?.user.id;
    console.log('call');
    try {
      const response = await fetch("/api/funds/new2", {
        method: "POST",
        body: JSON.stringify({
          name:name,
          amount:amount,
          date:date,
          userId: mid,
          department:selectedDepartment
        }),
      });

    //   const entry="Added";
    //   const response2 = await fetch("/api/logs/new", {
    //     method: "POST",
    //     body: JSON.stringify({
    //       userId: mid,
    //       title: title,
    //       type: type,
    //       entry : entry,
    //       price: price,
    //       date : new Date().toDateString()
    //     }),
    //   });

      
      console.log("hi");
    } catch (error) {
      console.log(error);
    }
  };
  const handleDelete = async (post) => {
    const mid = await session?.user.id;
    const hasConfirmed = confirm("Are you sure you want to delete this fund?");

    if (hasConfirmed) {
      try {
        await fetch(`/api/funds/${post._id.toString()}`, {
          method: "DELETE",
        });

        // const entry="Deleted";
        // const response2 = await fetch("/api/logs/new", {
        //   method: "POST",
        //   body: JSON.stringify({
        //     userId: mid,
        //     title: post.title,
        //     type: post.type,
        //     entry : entry,
        //     price: post.price,
        //     date :new Date().toDateString()
        //   }),
        // });

        const filteredPosts = Funds.filter((item) => item._id !== post._id);

        setAllPosts(filteredPosts);
        console.log("ho");
      } catch (error) {
        console.log(error);
      }
    }
  };
  const updatePrompt = async (post) => {
    try {
      const response = await fetch(`/api/funds/${post._id.toString()}`, {
        method: "PATCH",
        body: JSON.stringify({
          name:name,
          amount:amount,
          date:date
        }),
      });

      if (response.ok) {
        router.push("/Funds");
      }
    } catch (error) {
      console.log(error);
    } finally {
      // setIsSubmitting(false);
      console.log("Edited.");
    }
  };
  const handleEdit = (post) => {
    router.push(`/update-prompt?id=${post._id}`);
  };
 

  
  return (
    <div>
    <form  >
            <input className="text-black border-2 border-black rounded-full px-3 py-2" type="text" placeholder="Department " onChange={(e) => setDep(e.target.value)} />
            <input className="text-black border-2 border-black rounded-full px-3 py-2" type="text" placeholder="Total "  onChange={(e) => setTot(e.target.value)} />
            <button onClick={(e)=>{createPrompt(e);}}>Add Department </button>
        </form>
        <select value={selectedDepartment} onChange={handleSelectChange} className="mt-10">
      <option value="">Select a department</option>
      {allPosts.map((post, index) => (
        <option key={index} value={post.department}>
          {post.department}
        </option>
      ))}
    </select>
    <form  >
            <input className="text-black border-2 border-black rounded-full px-3 py-2" type="text" placeholder="Name " onChange={(e) => setName(e.target.value)} />
            <input className="text-black border-2 border-black rounded-full px-3 py-2" type="text" placeholder="Amount "  onChange={(e) => setAmount(e.target.value)} />
            <input className="text-black border-2 border-black rounded-full px-3 py-2" type="text" placeholder="Date "  onChange={(e) => setDate(e.target.value)} />
            <button onClick={(e)=>{createPrompt2(e);}}>Add Funds </button>
        </form>
        <select value={selectedDepartment2} onChange={handleSelectChange2} className="mt-10"> 
      <option value="">Select a department</option>
      {allPosts.map((post, index) => (
        <option key={index} value={post.department}>
          {post.department}
        </option>
      ))}
    </select>
    
   
<div class="overflow-hidden rounded-lg border border-gray-200 shadow-md">
  <table class="w-full border-collapse bg-white text-left text-sm text-gray-500">
    <thead class="bg-gray-50">
      <tr>
        <th scope="col" class="px-6 py-4 font-medium text-gray-900">Name</th>
        <th scope="col" class="px-6 py-4 font-medium text-gray-900">Amount</th>
        
        <th scope="col" class="px-6 py-4 font-medium text-gray-900">Date</th>
        <th scope="col" class="px-6 py-4 font-medium text-gray-900"></th>
      </tr>
    </thead>
    <tbody class="divide-y divide-gray-100 border-t border-gray-100">
    {allEntry && allEntry.map((post, index) => (
       post.department === selectedDepartment2 || selectedDepartment2 === ""? (
        // <h1>{post.name}</h1>
        <tr class="hover:bg-gray-50">
        <th class="flex gap-3 px-6 py-4 font-normal text-gray-900">
          <div class="relative h-10 w-10">
            <img class="h-full w-full rounded-full object-cover object-center" src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" />
            <span class="absolute right-0 bottom-0 h-2 w-2 rounded-full bg-green-400 ring ring-white"></span>
          </div>
          <div class="text-sm">
            <div class="font-medium text-gray-700">{post.name}</div>
            <div class="text-gray-400">{post.department}</div>
          </div>
        </th>
        <td class="px-6 py-4">
          <span class="inline-flex items-center gap-1 rounded-full bg-green-50 px-2 py-1 text-xs font-semibold text-green-600">
            
            &#x20b9; {post.amount}
          </span>
        </td>
       
        <td class="px-6 py-4">
          <div class="flex gap-2">
            
            <span class="inline-flex items-center gap-1 rounded-full bg-violet-50 px-2 py-1 text-xs font-semibold text-violet-600"> {post.date}</span>
          </div>
        </td>
        <td class="px-6 py-4">
          <div class="flex justify-end gap-4">
            <button onClick={()=>{handleDelete(post)}}>  <a x-data="{ tooltip: 'Delete' }" href="#">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-6 w-6" x-tooltip="tooltip">
                <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
              </svg>
            </a></button>
           <button onClick={()=>{handleEdit(post)}}>
           <a x-data="{ tooltip: 'Edite' }" href="#">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-6 w-6" x-tooltip="tooltip">
                <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
              </svg>
            </a>
           </button>
           
          </div>
        </td>
      </tr>
      ) : (
        null // or <></> if you prefer
      )
    
      ))}
    </tbody>
  </table>
</div>

    </div>
  )
}

export default page;