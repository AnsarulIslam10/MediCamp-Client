import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";

const useCamp = () => {
    const [search, setSearch] = useState('')
    const {data: camp = [], isLoading: loading, refetch} = useQuery({
        queryKey: ['camp', search],
        queryFn: async ()=>{
            const res = await axios.get(`http://localhost:5000/all-camps?search=${search}`)
            return res.data;
        }
    })
    return [camp, loading, refetch, search, setSearch]
};

export default useCamp;