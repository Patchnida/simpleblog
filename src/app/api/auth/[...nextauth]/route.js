import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import connectToDb from "@/lib/mongoDB";
import { User } from "@/models/user";
import bcrypt from 'bcryptjs';

const authOptions = {
    providers: [
        CredentialsProvider({
            
            name: 'credentials',
            
            credentials: {
            
            },
            async authorize(credentials, req) {
            
                const { username, password } = credentials; // ดึงค่า username, password มา 

                try {
                    await connectToDb()
                    const user = await User.findOne({ username })

                    if(!user) {
                        return null;
                    }

                    const passwordMatch = await bcrypt.compare(password, user.password)

                    if(!passwordMatch) {
                        return null;
                    }

                    return user;
                    
                } catch (error) {
                    console.log("Error", error);
                }
            
            }
        })
    ],
    session: {
        strategy: "jwt"
    },
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
        signIn: "/login"
    }
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }