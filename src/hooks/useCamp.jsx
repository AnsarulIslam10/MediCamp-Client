import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";

const useCamp = (sortBy) => {
    const [search, setSearch] = useState('')
    const {data: camp = [], isLoading: loading, refetch} = useQuery({
        queryKey: ['camp', search, sortBy],
        queryFn: async ()=>{
            const res = await axios.get(`https://medi-camp-server-opal.vercel.app/all-camps?search=${search}&sortBy=${sortBy}`)
            return res.data;
        }
    })
    return [camp, loading, refetch, search, setSearch]
};

export default useCamp;