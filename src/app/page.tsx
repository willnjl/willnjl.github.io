import Image from 'next/image'
import axios from "../api/axios";
import { AxiosError } from 'axios';
import { getHomepage, getProjects } from '@/api/actions';
import LatestProjects from '@/components/LatestProjects';

export default async function Home() {
  
  const homepageData =  getHomepage();
  const projectsData =  getProjects();

  let [homepage, projects] = await Promise.all([homepageData, projectsData]);

  return (
    <main className="text-black">
      <div className="wrap">
    
        <h1 className="text-4xl">
          {homepage.data.attributes.Heading}
        </h1>
        <LatestProjects projects={projects} />
      </div>
    </main>
  )
}

