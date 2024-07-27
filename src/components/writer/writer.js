import Image from "next/image";

// FETCH DATA WITH AN API
const getData = async (userId) => {
    const res = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`, {cache:'no-store'})
  
    if(!res.ok) {
      throw new Error('Something went wrong')
    }
  
    return res.json()
}


const Writer = async ({userId}) => {

    const user = await getData(userId)

  return (
    <div className="flex items-center justify-end">
        <div className="relative w-8 h-8 border rounded-full overflow-hidden mr-3">
            <Image
                src={user.img? user.img : "/noavatar.png"}
                fill
                style={{ objectFit: 'cover' }}
                alt="Writer's picture"
            />
        </div>
        <p className="text-sm md:text-base font-medium">{user.name}</p>
    </div>
  )
}

export default Writer;