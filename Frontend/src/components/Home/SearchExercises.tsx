import { useEffect, useState } from "react";
import { Button } from "../../utils/components/ui/button";
import { Input } from "../../utils/components/ui/input";
import { fetchData } from "../../utils/api";
import { exerciseApiOptions } from "../../utils/api/options";
import { useQuery } from "@tanstack/react-query";
import HorizontalScrollBar from "./HorizontalScrollBar";

const SearchExercises:React.FC = () => {
  const [search, setSearch] = useState<string>("");
  const [allBodyParts , setAllBodyParts] = useState<string[]>([]);
  const {error, isLoading, data } = useQuery({
    queryKey: ["bodyParts"],
    queryFn: ()=>fetchData('https://exercisedb.p.rapidapi.com/exercises/bodyPartList', exerciseApiOptions),
    staleTime: Infinity, 
  });

  useEffect(() => {
    if (data) {
      setAllBodyParts(["all", ...data]);
    }
  }, [data]);




  const handleSearch = async () => {
    if (search) {
      console.log(import.meta.env.VITE_X_RapidAPI_Key);
      const exercisesData = await fetchData(
        "https://exercisedb.p.rapidapi.com/exercises",
        exerciseApiOptions
      );
      const trimmedSearch = search.trim().toLowerCase();
      const filteredExercises = exercisesData?.filter((exercise) =>
        exercise.bodyPart.toLowerCase().includes(trimmedSearch) 
        || exercise.equipment.toLowerCase().includes(trimmedSearch)
        || exercise.target.toLowerCase().includes(trimmedSearch)
        || exercise.name.toLowerCase().includes(trimmedSearch)

      );
      setSearch("");
    }
  };
  return (
    <div className="flex flex-col mt-20 gap-10">
      <div className="flex flex-col justify-center items-center gap-4 text-4xl lg:text-6xl font-semibold text-center ">
        <p> Awesome Exercises You</p>
        <p>Should Know</p>
      </div>
      <div className="flex justify-center items-center">
        <Input
          type="text"
          placeholder="Search Exercises"
          className="w-1/2"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Button
          className="bg-red-600 text-white lg:p-10 p-6 m-2"
          onClick={handleSearch}
        >
          Search
        </Button>
      </div>

      <div>
        <HorizontalScrollBar allBodyParts={allBodyParts}/>
      </div>
    </div>
  );
};

export default SearchExercises;
