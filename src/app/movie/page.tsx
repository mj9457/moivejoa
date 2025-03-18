import MovieInfo from "@/components/moive/MovieInfo";

const page = () => {
  return (
    <div>
      API URL: {process.env.NEXT_PUBLIC_API_BASE_URL}
      <MovieInfo />
    </div>
  );
};

export default page;
