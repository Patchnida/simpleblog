import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import connectToDb from "@/lib/mongoDB";
import { User } from "@/models/user";
import bcrypt from 'bcryptjs';

export const authOptions = {
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

                    // return user;
                    return { id: user._id, username: user.username, email: user.email };
                    
                } catch (error) {
                    console.log("Error", error);
                    return null;
                }
            
            }
        })
    ],
    callbacks: {
    async session({ session, token }) {
      session.user.id = token.id;
      session.user.username = token.username;
      session.user.email = token.email;
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.username = user.username;
        token.email = user.email;
      }
      return token;
    }
  },
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
        signIn: "/login"
    }
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }