import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";

const useCamp = (sortBy) => {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [limit] = useState(12);
  const {
    data: camp = [],
    isLoading: loading,
    refetch,
  } = useQuery({
    queryKey: ["camp", search, sortBy, page, limit, search],
    queryFn: async () => {
      const res = await axios.get(
        `https://medi-camp-server-opal.vercel.app/all-camps?page=${page}&limit=${limit}&search=${search}&sortBy=${sortBy}`
      );
      return res.data;
    },
  });
  return [camp, loading, refetch, search, setSearch, page, setPage, limit];
};

export default useCamp;
