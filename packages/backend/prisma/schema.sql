CREATE EXTENSION
IF NOT EXISTS "uuid-ossp";

CREATE TYPE ReleaseType AS ENUM ('ALBUM', 'EP', 'LP', 'PODCAST', 'SINGLE');

CREATE TYPE Role AS ENUM ('ADMIN', 'SUBSCRIBER');

CREATE TYPE Privacy AS ENUM ('PRIVATE', 'PUBLIC', 'UNLISTED');

CREATE TABLE "public"."User"
(
  id uuid PRIMARY KEY NOT NULL DEFAULT uuid_generate_v4(),
  "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
  email VARCHAR(255) NOT NULL UNIQUE,
  "firstName" VARCHAR(255),
  "lastName" VARCHAR(255),
  password VARCHAR(255) NOT NULL,
  role Role DEFAULT 'SUBSCRIBER',
  username VARCHAR(255) NOT NULL UNIQUE,
  verified BOOLEAN NOT NULL DEFAULT false
);

CREATE TABLE "public"."Image"
(
  id uuid PRIMARY KEY NOT NULL DEFAULT uuid_generate_v4(),
  "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
  "uploaderId" uuid REFERENCES "public"."User"(id) NOT NULL,
  url TEXT NOT NULL
);

CREATE TABLE "public"."Artist"
(
  id uuid PRIMARY KEY NOT NULL DEFAULT uuid_generate_v4(),
  alias VARCHAR(255) NOT NULL UNIQUE,
  "avatarId" uuid,
  "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
  "firstName" VARCHAR(255),
  genres VARCHAR(255)[],
  "lastName" VARCHAR(255),
  FOREIGN KEY ("avatarId") REFERENCES "public"."Image"(id)
);

CREATE TABLE "public"."Audio"
(
  id uuid PRIMARY KEY NOT NULL DEFAULT uuid_generate_v4(),
  bitrate INTEGER NOT NULL,
  "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
  format VARCHAR(50) NOT NULL,
  size INTEGER NOT NULL,
  "uploaderId" uuid NOT NULL,
  url TEXT NOT NULL,
  FOREIGN KEY ("uploaderId") REFERENCES "public"."User"(id)
);

CREATE TABLE "public"."Album"
(
  id uuid PRIMARY KEY NOT NULL DEFAULT uuid_generate_v4(),
  alias VARCHAR(255) NOT NULL UNIQUE,
  "artworkId" uuid REFERENCES "public"."Image"(id),
  "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
  duration INTEGER DEFAULT 0,
  explicit BOOLEAN NOT NULL DEFAULT false,
  genres VARCHAR(255)[] NOT NULL,
  name VARCHAR(255) NOT NULL,
  "numTracks" INTEGER NOT NULL DEFAULT 0,
  "releaseDate" TIMESTAMP,
  "releaseType" ReleaseType,
  "uploaderId" uuid NOT NULL REFERENCES "public"."User"(id)
);

CREATE TABLE "public"."Track"
(
  id uuid PRIMARY KEY NOT NULL DEFAULT uuid_generate_v4(),
  "albumId" uuid NOT NULL,
  "audioId" uuid,
  "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
  "discNumber" INTEGER DEFAULT 1,
  duration INTEGER DEFAULT 0,
  explicit BOOLEAN NOT NULL DEFAULT false,
  genre VARCHAR (255) NOT NULL,
  "isPlayable" BOOLEAN NOT NULL DEFAULT false,
  name VARCHAR (255) NOT NULL,
  "trackNumber" INTEGER DEFAULT 1,
  FOREIGN KEY ("albumId") REFERENCES "public"."Album"(id),
  FOREIGN KEY ("audioId") REFERENCES "public"."Audio"(id)
);

CREATE TABLE "public"."Playlist"
(
  id uuid PRIMARY KEY NOT NULL DEFAULT uuid_generate_v4(),
  alias VARCHAR(255) NOT NULL UNIQUE,
  "artworkId" uuid,
  collaborative BOOLEAN NOT NULL DEFAULT false,
  "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
  "creatorId" uuid NOT NULL,
  description TEXT,
  duration INTEGER NOT NULL DEFAULT 0,
  name VARCHAR(255) NOT NULL,
  "numTracks" INTEGER NOT NULL DEFAULT 0,
  privacy Privacy NOT NULL DEFAULT 'PRIVATE',
  FOREIGN KEY ("creatorId") REFERENCES "public"."User"(id),
  FOREIGN KEY ("artworkId") REFERENCES "public"."Image"(id)
);

CREATE TABLE "public"."PlaylistTrack"
(
  id uuid PRIMARY KEY NOT NULL DEFAULT uuid_generate_v4(),
  "addedAt" TIMESTAMP NOT NULL DEFAULT now(),
  "addedById" uuid NOT NULL,
  "playlistId" uuid NOT NULL,
  "trackId" uuid NOT NULL,
  FOREIGN KEY ("addedById") REFERENCES "public"."User"(id),
  FOREIGN KEY ("playlistId") REFERENCES "public"."Playlist"(id),
  FOREIGN KEY ("trackId") REFERENCES "public"."Track"(id)
);

-- Relation table + indexes -------------------------------------------------------
CREATE TABLE "public"."_AlbumCreatedBy" 
(
  "A" uuid NOT NULL REFERENCES "public"."Album"(id),
  "B" uuid NOT NULL REFERENCES "public"."Artist"(id)
);
CREATE UNIQUE INDEX "_AlbumCreatedBy_AB_unique" ON "_AlbumCreatedBy"("A","B");
CREATE INDEX "_AlbumCreatedBy_B_index" ON "_AlbumCreatedBy"("B");

CREATE TABLE "public"."_ByArtist" 
(
  "A" uuid NOT NULL REFERENCES "public"."Artist"(id),
  "B" uuid NOT NULL REFERENCES "public"."Track"(id)
);
CREATE UNIQUE INDEX "_ByArtist_AB_unique" ON "_ByArtist"("A","B");
CREATE INDEX "_ByArtist_B_index" ON "_ByArtist"("B");

CREATE TABLE "public"."_FeaturesIn" 
(
  "A" uuid NOT NULL REFERENCES "public"."Artist"(id),
  "B" uuid NOT NULL REFERENCES "public"."Track"(id)
);
CREATE UNIQUE INDEX "_FeaturesIn_AB_unique" ON "_FeaturesIn"("A","B");
CREATE INDEX "_FeaturesIn_B_index" ON "_FeaturesIn"("B");