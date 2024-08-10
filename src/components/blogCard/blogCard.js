import Image from "next/image";

const BlogCard = ({post}) => {
  return (
    <div className="w-full">
      <div className="border rounded-lg shadow-md w-full">
        <div style={{ position: 'relative', width: '100%', height: '300px' }}>
            <Image 
              src="https://images.squarespace-cdn.com/content/v1/51cdafc4e4b09eb676a64e68/424f0a73-624b-45e6-ae64-5ee6bc67f5dc/D23_WoL_PubStill.pub16.jpg?format=1500w"
              fill
              style={{ objectFit: 'cover' }}
              alt="Image description"
            />
        </div>
        <div className="m-4">
          <h2 className="text-xl md:text-2xl font-bold mt-3">{post.title}</h2>
          <p className="text-base line-clamp-4 mt-1">{post.desc} </p>
        </div>
      </div>
    </div>
  );
}

export default BlogCard;
