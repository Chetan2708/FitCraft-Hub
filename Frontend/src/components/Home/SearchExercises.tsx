  import { useEffect, useState } from "react";
  import { Button } from "../../utils/components/ui/button";
  import { Input } from "../../utils/components/ui/input";
  import { fetchBackendData } from "../../utils/api";

  import { useQuery } from "@tanstack/react-query";
  import HorizontalScrollBar from "./HorizontalScrollBar";
  import { useDispatch } from "react-redux";
  import { setExercises } from "../../features/exercises/exerciseSlice";
  import { Link as ScrollLink } from "react-scroll";
import { baseURL } from "../../utils/constants";
import { ExerciseType } from "../../definitions";
  const SearchExercises:React.FC = () => {
    const dipatch = useDispatch()

    
    const [search, setSearch] = useState<string>("");
    const [allBodyParts , setAllBodyParts] = useState<string[]>([]);

    const { data } = useQuery({

      queryKey: ["bodyParts"],
      queryFn: ()=>fetchBackendData(`${baseURL}/exerciseData/getDistinctBodyParts`),
      staleTime: Infinity, 
      refetchOnMount:false,
    });


    
    useEffect(() => {
      if (data) {
        setAllBodyParts(["all", ...data]);
      }
    }, [data]);




    const handleSearch = async () => {
        const exercisesData = await fetchBackendData(`${baseURL}/exerciseData/getAllExercises`)
        const trimmedSearch = search.trim().toLowerCase();
        const filteredExercises = exercisesData?.filter((exercise:ExerciseType) =>
          exercise.bodyPart.toLowerCase().includes(trimmedSearch) 
          || exercise.equipment.toLowerCase().includes(trimmedSearch)
          || exercise.target.toLowerCase().includes(trimmedSearch)
          || exercise.name.toLowerCase().includes(trimmedSearch)

        );
        
        setSearch("");
        dipatch(setExercises(filteredExercises))

    };
    return (
      <div className="flex flex-col mt-20 gap-10">
        <div className="flex flex-col justify-center items-center gap-4 text-4xl lg:text-6xl font-semibold text-center text-[#3A1212] ">
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
            <ScrollLink
          to="exercises"
          smooth={true}
          duration={1500}
          className="cursor-pointer"
        >

          <Button
            className="bg-red-600 text-white lg:p-10 p-6 m-2"
            onClick={handleSearch}
            >
            Search
          </Button>
              </ScrollLink>
        </div>

        <div>
          <HorizontalScrollBar allBodyParts={allBodyParts}/>
        </div>
      </div>
    );
  };

  export default SearchExercises;
