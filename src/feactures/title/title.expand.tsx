import { Movie, MovieSmall } from "../../lib/base";
import * as Dialog from "@radix-ui/react-dialog";
import { DialogContent } from "../dialog/dialog";
import { recommendationsMovie } from "../../lib/recommendations.movie";
import { useState } from "react";
import classNames from "classnames";

interface TitleExpandProps {
  data: MovieSmall;
  fluid?: boolean;
}
export function TitleExpand({ data, fluid }: TitleExpandProps): JSX.Element {
  const [recommendations, setRecommendations] = useState<Movie[]>([]);
  function getSuggestionOnOpen(e: boolean): void {
    if (e) {
      recommendationsMovie(data.id)
        .then((s) => setRecommendations(s.results))
        .catch(console.log);
    }
  }
  return (
    <Dialog.Root onOpenChange={getSuggestionOnOpen}>
      <Dialog.Trigger asChild>
        <div
          className={classNames("relative flex-shrink-0 flex-grow-0 flex", {
            "w-[20vw]": !(fluid ?? false),
          })}
        >
          <img
            src={`https://image.tmdb.org/t/p/w300${data.backdrop_path}`}
            alt={data.title}
            className="w-full h-full"
          />
          <div className="absolute inset-0 bg-black/30 transition-all px-4 py-4 truncate opacity-0 hover:opacity-100 focus:opacity-100">
            {data.title}
          </div>
        </div>
      </Dialog.Trigger>
      <DialogContent>
        <div className="absolute top-0 left-0 right-0">
          <img
            src={`https://image.tmdb.org/t/p/w1280${data.backdrop_path}`}
            className="w-full h-auto"
            alt={data.title}
          />
          <div className="px-6">
            <h1 className="text-2xl truncate font-semibold text-white">
              {data.title}
            </h1>
            <p className="text-base font-light text-white/50 mt-2">
              {data.overview}
            </p>
            <div className="w-full mt-6 grid gap-4 grid-cols-3">
              {recommendations?.map((x, i) => (
                <TitleExpand
                  data={x}
                  key={`title-${x.id}-discover-${i}`}
                  fluid
                />
              ))}
            </div>
          </div>
        </div>
        <div className="absolute top-0 left-0 right-0 aspect-video bg-gradient-to-t from-black via-transparent to-transparent" />
      </DialogContent>
    </Dialog.Root>
  );
}
