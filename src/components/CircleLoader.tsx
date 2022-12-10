import styled from "styled-components";

interface CircleLoaderProps {
    thick:string;
    size:string;
    bgd:string;
    color:string;
    speed?:string;
}

export default function CircleLoader({ thick,size,bgd,color,speed }:CircleLoaderProps){
        return (
            <Bracket size={ size }>
                <Circle size={ size } bgd={ bgd } thick={ thick } color={ color } speed={ speed } />
            </Bracket>
        );
}

interface Props {
    size:string;
}

const Bracket = styled.div<Props>`
    width:${({ size })=>size}; 
    height:${({ size })=>size};
    margin:auto;
`
interface CircleProps extends Props{
    thick:string;
    bgd:string;
    color:string;
    speed?:string;
}
const Circle = styled.div<CircleProps>`
    width:${({ size })=>size}; 
    height:${({ size })=>size};
    border-radius:50%;
    border-top:${({ thick })=>thick } solid ${({ bgd })=>bgd };
    border-right:${({ thick })=>thick } solid ${({ bgd })=>bgd };
    border-bottom:${({ thick })=>thick } solid ${({ bgd })=>bgd };
    border-left:${({ thick })=>thick } solid ${({ color })=>color };
    -webkit-animation: circle ${({ speed })=> speed??"2s" } infinite linear;
    animation: circle ${({ speed })=> speed??"2s" } infinite linear;

    @-webkit-keyframes circle { 
        100% { 
        -webkit-transform: rotate(360deg);
        } 
    }
    @keyframes circle { 
        100% { 
        transform: rotate(360deg); 
        transform:rotate(360deg);
        } 
    }
`
