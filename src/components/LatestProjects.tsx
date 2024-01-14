import { APIResponseCollection } from '@/types/types'
import React from 'react'

type Props = {
  projects: APIResponseCollection<"api::project.project">
}

const LatestProjects = (props: Props) => {

  let { projects } = props;

  return( <ul>
      {projects.data.map(project => {
        const title = project.attributes.Heading;
        return (<li role="article">
          <h2>{title}</h2>
        </li>)
      })}
    
  </ul>)
}


export default LatestProjects;