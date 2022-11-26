import { Button } from "react-bootstrap"


export const Gbutton =({text,size, ...oke})=>{
    return(
        <Button {...oke} className={`bg-pink ${size}`}>{text}</Button>
    )
}