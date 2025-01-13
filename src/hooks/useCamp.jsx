import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const useCamp = () => {
    const {data: camp = [], isLoading: loading, refetch} = useQuery({
        queryKey: ['camp'],
        queryFn: async ()=>{
            const res = await axios.get('http://localhost:5000/all-camps')
            return res.data;
        }
    })
    return [camp, loading, refetch]
};

export default useCamp;