import Image from "next/image";

const BlogCard = () => {
  return (
    <div className="">
      <div className="border rounded-lg shadow-md w-full ">
        <div style={{ position: 'relative', width: '100%', height: '300px' }}>
            <Image 
              src="https://images.squarespace-cdn.com/content/v1/51cdafc4e4b09eb676a64e68/424f0a73-624b-45e6-ae64-5ee6bc67f5dc/D23_WoL_PubStill.pub16.jpg?format=1500w"
              fill
              style={{ objectFit: 'cover' }}
              alt="Image description"
            />
        </div>
        <div className="m-4">
          <h2 className="text-xl font-bold mt-3">Title</h2>
          <p className="line-clamp-4 mt-1">It looks like you are trying to update your Next.js project to use the new next/image component from version 13, but running the codemods esolve the issue. Here are some steps to manually fix the problem</p>
        </div>
      </div>
    </div>
  );
}

export default BlogCard;
