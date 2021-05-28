import React from 'react'
import NewsSkeleton from "./NewsSkelaton"

type skeleton={
  n?:number
  isloading:boolean
}
const SkeletonComponent:React.FC<skeleton> = ({n=5,isloading}) => {
  return (
    <>
      {isloading && Array.from(Array(n).keys()).map((value) => <NewsSkeleton key={value} />)}
    </>
  )
}

export default SkeletonComponent
