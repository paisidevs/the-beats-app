import flattenDeep from "lodash/flattenDeep";
import { Artist, Maybe } from "../generated/graphql";

export const reduceArtists = (
  artists?: Maybe<Pick<Artist, "name">>[] | null,
  options?: { isFeaturing: boolean }
) => {
  if (!artists || artists.length < 1) {
    return "";
  }

  const result: Maybe<string | string[]> | null | undefined = artists
    .map((artist) => artist?.name)
    .reduce((previousValue, currentValue, currentIndex, array): any => [
      previousValue,
      currentIndex === array.length - 1 ? " & " : ", ",
      currentValue,
    ]);

  if (typeof result === "string") {
    return options?.isFeaturing ? ` (feat. ${result})` : result;
  }

  if (Array.isArray(result)) {
    const artists = flattenDeep(result) as [];
    return options?.isFeaturing
      ? ` (feat. ${artists.join("")})`
      : artists.join("");
  }

  return "";
};
