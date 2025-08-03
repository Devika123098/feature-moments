import React from 'react'

export default function Card({ moment }) {
  if (!moment) return null

  return (
    <div className="flex-none w-[400px] group cursor-pointer">
      <div className="relative overflow-hidden">
        <img 
          src={moment.fields.image?.fields.file.url} 
          alt={moment.fields.title}
          width={400} 
          height={280}
          className="w-full h-[280px] object-cover transition-transform duration-500 group-hover:scale-110"
        />
      </div>
      
      <div className="mt-5">
        <h2 className="font-semibold text-xl text-black group-hover:text-[#57392A] transition-colors duration-200">
          {moment.fields.title}
        </h2>
        <p className="text-[#110B08] text-sm mt-5 line-clamp-4">
          {moment.fields.description}
        </p>
      </div>
    </div>
  )
}
