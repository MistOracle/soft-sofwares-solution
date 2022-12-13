import bcrypt from "bcryptjs";
import Cookie from "js-cookie";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { Container, Flex, Title } from "src/styles/styled";
import CircleLoader from "./CircleLoader";
import CustomInput from "./Input2";

interface HomepageProps {
    allUsers:{ email:string; password:string; _id:string; _v:number, token:string }[];
    allKeys:{ regKey:string;_id:string;url:string;accounts:number;_v:string; }[]
}

export default function Homepage({ allUsers,allKeys }:HomepageProps){

    const theme = "teal";
    const [accessKey,setAccessKey] = useState<string>("");
    const [password,setPassword] = useState<string>("");
    const [globalError,setGlobalError] = useState<string>("");
    const [successMessage,setSuccessMessage] = useState<string>("");
    const [loading,setLoading] = useState<boolean>(false);

    const Router = useRouter();

    const accountOne = useRef<HTMLAnchorElement | null>(null);
    const accountTen = useRef<HTMLAnchorElement | null>(null);
    const accountTwenty = useRef<HTMLAnchorElement | null>(null);
    // const closet = { loginAsAdmin:true };

    useEffect(()=>{
        if(globalError.length || successMessage.length){
            const timer = setInterval(()=>{
                setGlobalError("");
                setSuccessMessage("");
                setPassword("");
                setAccessKey("");
                setLoading(false);
            },3000)
            return ()=>clearInterval(timer);
        }
    },[ globalError,successMessage ]);

    // const LoggedInAsAdmin = async()=>{

    //     const token = jwt.sign(closet,"SECRET_D5KO0NB10P312UIQ180CG9",{ expiresIn:"6h" });
    //     Cookie.set("TOKEN_LIVO8NY7BQG",token);

    //     const cookieBlob = Cookie.get("TOKEN_LIVO8NY7BQG") as string;
    //     const User = jwt.verify(cookieBlob,"SECRET_D5KO0NB10P312UIQ180CG9") as { loginAsAdmin:boolean; iat:number; exp:number; };

    //     const loginAsAdmin = User.loginAsAdmin;
    //     console.log("loginAsAdmin",loginAsAdmin);

    // }

    const handleLogin = async()=>{
        setLoading(true);
        const isEmail = accessKey.includes("@") && accessKey.includes(".com");
        const isRegKey = accessKey.includes("HIG-");
        
        if(isEmail){

            if(password.length < 3) 
            return setGlobalError("enter a valid password!");

            const userExists = allUsers.some(user=>user.email === accessKey);

            if(!allUsers.length){

                const pass = bcrypt.hashSync(password,10);

                const resultBlob = await fetch("/api/addUser",{
                    method:"POST",
                    headers:{
                        contentType:"application/json"
                    },
                    body:JSON.stringify({ email:accessKey,password:pass })
                })

                const { result } = await resultBlob.json();
                console.log("POST_USER:",result);

                Cookie.set("jwt",result.token);

                setSuccessMessage("admin created successfully!");
                return Router.replace("/backend");
            }

            if(!userExists)
            return setGlobalError("user does not exist!");

            const resultBlob = await fetch("/api/user",{
                method:"POST",
                headers:{
                    contentType:"application/json"
                },
                body:JSON.stringify({ email:accessKey,password })
            })

            const result = await resultBlob.json();

            if(result.error)
            return setGlobalError(result.error);

            Cookie.set("jwt",result.user.token);

            Router.replace("/backend");
            return;
        }

        if(isRegKey){

            const keyCloset = allKeys.find(obj=>obj.regKey === accessKey);

            if(!keyCloset)
            return setGlobalError("invalid registration key!")

            keyCloset.accounts === 1 && accountOne.current?.click();
            keyCloset.accounts === 10 && accountTen.current?.click();
            keyCloset.accounts === 20 && accountTwenty.current?.click();

            return setLoading(false);

        }

        return setGlobalError("invalid credentials!")
    }

    return (
        <Container bgd="black" minH={ 100 } maxW="100vw" centralize>
            <Container display="none">
                <a ref={ accountOne } href="/software.zip" download="sendDBILL" />
                <a ref={ accountTen } href="/software10.zip" download="sendTenBILL" />
                <a ref={ accountTwenty } href="/software20.zip" download="sendTwentyBILL" />
            </Container>
            <Flex fw>
                <Container br={ 10 } m="auto" w="calc(48vh + 20vw)" p={ 1 } shadow shadowColor={ theme }>
                    <Title 
                        align="center" 
                        font="Pacifico" 
                        size="calc(20px + 2vw)" 
                        color={ theme }>Soft</Title> 
                    <Container ph={ 5 }> 
                        <Title 
                            align="center" 
                            font="Pacifico" 
                            size="calc(20px + 4vw)" 
                            color={ theme } bold>Softwares</Title>
                    </Container>
                    <Title 
                        align="center" 
                        font="Pacifico" 
                        size="calc(20px + 2vw)"
                        color={ theme }>Solution</Title> 
                </Container>
                <Container w="calc(48vh + 20vw)" pv={ 3 } ph={ 5 } br={ 2 } bc={ theme }>
                    <Container bbottom="0.1vh" bcolor={ theme } mv={ 7 }>
                        <CustomInput 
                            placeholder="Enter your access KEY!"
                            size="calc(15px + 1.5vw)" 
                            line="none" 
                            border="none" 
                            bgd="none" 
                            value={ accessKey } 
                            setValue={ setAccessKey } 
                        />
                    </Container>
                    <Container bbottom="0.1vh" bcolor={ theme } mv={ 7 }>
                        <CustomInput 
                            placeholder="Password goes here"
                            size="calc(15px + 1.5vw)" 
                            line="none" 
                            border="none" 
                            bgd="none" 
                            type="password"
                            value={ password } 
                            setValue={ setPassword } 
                        />
                    </Container>

                    <Container mv={ 1 }>
                        <Title align="center" size={ 3 } color="crimson">{ globalError }</Title>
                    </Container>

                    <Container mv={ 1 }>
                        <Title align="center" size={ 3 } color="darkgreen">{ successMessage }</Title>
                    </Container>

                    {
                        loading?
                        <Container centralize>
                            <CircleLoader thick="calc(3px + 0.1vw)" size="calc(20px + 3.5vw)" bgd="grey" color={ theme as string } speed="0.5s" />
                        </Container>:
                        <Container 
                            bgd={ theme } 
                            p={ 2 } 
                            br={ 10 }
                            onClick={ handleLogin }
                            button pointer centralize>
                            <Title size="calc(20px + 2.5vw)"  color="lightgrey">Gain Access</Title>
                        </Container>
                    }
                    
                </Container>
            </Flex>
        </Container>
    );
}