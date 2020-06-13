# Migration `20200613202956`

This migration has been generated by Marcel Overdijk at 6/13/2020, 8:29:56 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
PRAGMA foreign_keys=OFF;

CREATE TABLE "quaint"."Continent" (
"code" TEXT NOT NULL  ,"id" TEXT NOT NULL  ,"name" TEXT NOT NULL  ,
    PRIMARY KEY ("id"))

CREATE TABLE "quaint"."Country" (
"code" TEXT NOT NULL  ,"continentId" TEXT NOT NULL  ,"id" TEXT NOT NULL  ,"name" TEXT NOT NULL  ,
    PRIMARY KEY ("id"),FOREIGN KEY ("continentId") REFERENCES "Continent"("id") ON DELETE CASCADE ON UPDATE CASCADE)

CREATE UNIQUE INDEX "quaint"."Continent.code" ON "Continent"("code")

CREATE UNIQUE INDEX "quaint"."Continent.name" ON "Continent"("name")

CREATE UNIQUE INDEX "quaint"."Country.code" ON "Country"("code")

CREATE UNIQUE INDEX "quaint"."Country.name" ON "Country"("name")

PRAGMA "quaint".foreign_key_check;

PRAGMA foreign_keys=ON;
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration ..20200613202956
--- datamodel.dml
+++ datamodel.dml
@@ -1,0 +1,23 @@
+datasource db {
+  provider = "sqlite"
+  url      = env("DATABASE_URL")
+}
+
+generator prisma_client {
+  provider = "prisma-client-js"
+}
+
+model Continent {
+  id        String    @id
+  code      String    @unique
+  name      String    @unique
+  countries Country[]
+}
+
+model Country {
+  id          String    @id
+  code        String    @unique
+  name        String    @unique
+  continentId String 
+  continent   Continent @relation(fields: [continentId], references: [id])
+}
```

