import { Albums, Artists, Home, NotFound, Playlists, Songs } from "../../pages";
import ViewAlbum, { AlbumBreadcrumb } from "../ViewAlbum";

export const routes: any = [
  {
    exact: true,
    component: Home,
    path: "/",
    title: "Library",
    breadcrumb: "Library",
  },
  {
    exact: true,
    component: Playlists,
    path: "/library/playlists",
    title: "Playlists",
    breadcrumb: "Playlists",
  },
  {
    exact: true,
    component: Artists,
    path: "/library/artists",
    title: "Artists",
    breadcrumb: "Artists",
  },
  {
    exact: true,
    component: Albums,
    path: "/library/albums",
    title: "Albums",
    breadcrumb: "Albums",
  },
  {
    exact: true,
    component: ViewAlbum,
    path: "/library/albums/:id",
    breadcrumb: AlbumBreadcrumb,
  },
  {
    exact: true,
    component: Songs,
    path: "/library/songs",
    title: "Songs",
    breadcrumb: "Songs",
  },
  {
    path: "*",
    component: NotFound,
  },
];
