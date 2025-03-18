import { Suspense } from "react";
// import MovieInfo, { getMovie } from "../../../../components/movie-info";
// import MovieVideos from "../../../../components/movie-videos";

interface IParams {
  params: { id: string };
}

export default async function MovieDetailPage({ params: { id } }: IParams) {
  console.log(id);
  return (
    <div>
      <Suspense fallback={<h1>Loading movie info</h1>}>
        {/* <MovieInfo id={id} /> */}
        <div>{id}</div>
      </Suspense>
      <Suspense fallback={<h1>Loading movie videos</h1>}>
        {/* <MovieVideos id={id} /> */}
      </Suspense>
    </div>
  );
}

export const runtime = "edge";
