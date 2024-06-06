import { useParams } from "react-router-dom";
import Detail from "../components/IndividualExercise/Detail";
import ExerciseVideos from "../components/IndividualExercise/ExerciseVideos";
import { useQuery } from "@tanstack/react-query";
import { fetchBackendData, fetchData } from "../utils/api";
import { youtubeOptions } from "../utils/api/options";
import { baseURL, youtubeSearchUrl } from "../utils/constants";
import Loader from "../utils/extras/Loader";
import Swal from "sweetalert2";


const IndividualExercise:React.FC = () => {
  const { id } = useParams();

  const {
    error: exerciseError,
    isLoading: exerciseLoading,
    data: exerciseData,
  } = useQuery({
    queryKey: ["individualExercise", id],
    queryFn: () =>
      fetchBackendData(
        `${baseURL}/exerciseData/getExercise/${id}`,
      ),
    staleTime: 20000,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });
  const {
    error: youtubeError,
    isLoading: youtubeLoading,
    data: youtubeData,
  } = useQuery({
    queryKey: ["exerciseVideos", id],
    queryFn: () =>
      fetchData(
        `${youtubeSearchUrl}/search?query=${exerciseData?.name}`,
        youtubeOptions
      ),
    staleTime: 20000,
    enabled: !!exerciseData, // Only run this query if exerciseData is available
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });

  if (exerciseLoading || youtubeLoading)
    return (
      <div className="flex flex-col justify-center items-center min-h-screen ">
        <Loader />
      </div>
    );
  if (exerciseError) {
    Swal.fire({
      icon: "error",
      title: "Error",
      text: "Error loading exercise data",
    });
    return null;
  }

  if (youtubeError) {
    Swal.fire({
      icon: "error",
      title: "Error",
      text: "Error loading exercise videos",
    });
    return null;
  }
  
  return (
    <div >
      {exerciseData && <Detail exerciseData={exerciseData} />}
      {youtubeData && (
        <ExerciseVideos
          videos={youtubeData.contents}
          name={exerciseData?.name}
        />
      )}
   
    </div>
  );
};

export default IndividualExercise;
