import Image from 'next/image'
import axios from "../api/axios";
import { AxiosError } from 'axios';


export default function Home() {

  axios.get("/homepage").then(resp => {
    console.log(resp.data);
  }).catch(error => console.log("error"));
  

  return (
    <main className="text-black">
      <div className="wrap">
    
        <h1 className="text-4xl">
          Hi there, I'm Will
        </h1>
      </div>
    </main>
  )
}

