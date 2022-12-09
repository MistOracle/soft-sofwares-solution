import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

export async function middleware(req:NextRequest){

    const token = req.cookies.get("jwt")?.value as string;
    const url = req.url as string;

    const secret = new TextEncoder().encode(process.env.SECRET);

    //if(!token)
    return NextResponse.next();
        
        // const { payload } = await jwtVerify(token,secret);

        // console.log("Payload",payload);
        // return NextResponse.next();

    try{
        
        const { payload } = await jwtVerify(token,secret);

        console.log("Payload",payload);

        if(payload && url === process.env.HOME_URL)
        return NextResponse.redirect(new URL("/backend", process.env.HOME_URL));

    }catch(error:any){
        console.log(error);

        if(error)
        return NextResponse.next();
    }

}