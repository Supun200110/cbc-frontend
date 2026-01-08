import { useParams } from "react-router-dom";

export default function ProductOverview(){
    const params =useParams()  //if url included id or else, it returns a json
    console.log(params.id)
    
    if(params.id==null){
        window.location.href="/products"
    }
const[product, setProduct]=useState(null)
const[status, setStatus]=useState("loading")
}