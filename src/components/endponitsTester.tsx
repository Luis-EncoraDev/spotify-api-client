import axios from "axios";
import { useState } from "react";


const EndpointsTester = () => {
    const [data, setData] = useState();

    const fetchData = async () => {
        const data = await axios.get("127.0.0.1:9090/")
    }

    <div>
        <p></p>
    </div>
}


export default EndpointsTester