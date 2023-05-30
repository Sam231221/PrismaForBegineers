/*
PrismaClient is the answer why we are able to communicate with
PostgresDatabase
*/
import { PrismaClient } from "@prisma/client";
// const prisma = new PrismaClient();

//if we wanna log out sql queries to the terminal
const prisma = new PrismaClient({ log: ["query"] });

//Use async when dealing with prisma
/*
  Note that All the compulsory field of User Model must be provided
  Else Terminal throws error.
  */
async function createUser() {
  const user = await prisma.user.create({
    //Through include, we get data regarding userPreferences field
    //Only works for referencing field
    data: {
      name: "Sameer",
      email: "samirshahi9882@gmail.com",
      age: 27,
    },
    //include and select can't exist at a time
    include: {
      userPreferences: true,
    },
  });
  console.log(user);
}
async function createManyUser() {
  const users = await prisma.user.createMany({
    data: [
      {
        name: "Sameer",
        email: "samirshahi9882@gmail.com",
        age: 23,
      },
      {
        name: "Sama",
        email: "samashahi9882@gmail.com",
        age: 19,
      },
    ],
  });
  console.log(users);
}
async function getUsers() {
  const users = await prisma.user.findMany({
    //Through include, we can render data regarding userPreferences field
    //Only works for referencing field
    // include: {
    //   userPreferences: true,
    // },

    //Select particular fields only
    select: {
      name: true,
      //be more selective
      userPreferences: { select: { id: true } },
    },
  });
  console.log(users);
}
async function findUserUniquely() {
  //findUnique() works for only unique fields of Models.
  const user = await prisma.user.findUnique({
    //We can only check for Either Single Uniqueness or Compound Uniqueness at a time
    where: {
      //checking for single  uniqueness
      email: "samirshahi9882@gmail.com",

      //checking for compound uniqueness
      // age_name: {
      //   age: 23,
      //   name: "Sameer",
      // },
    },
  });
  console.log(user);
}

async function findManyUsers() {
  const user = await prisma.user.findMany({
    where: {
      name: "Sameer",
    },
    //Only returns different(distinct) users that has these different(distinct) name and email
    distinct: ["email", "name"],
    orderBy: {
      age: "desc",
    },
    //Pagination only returns 2
    take: 2,
    //skip 1 user,and display next 2 users
    skip: 1,
  });
  console.log(user);
}

async function main() {
  //More about where clause stuff
  const user = await prisma.user.findMany({
    where: {
      name: { notIn: ["Saara", "Sama"] },
      age: {
        lt: 20,
      },
    },
  });
  console.log(user);
}
main()
  .catch((e) => {
    console.error(e.message);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
