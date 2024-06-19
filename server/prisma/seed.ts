import prisma from "../src/utils/prisma";
import { hashPassword } from "../src/utils/hash-password";
import { DishType } from "@prisma/client";

const food = {
  categories: {
    meats: {
      results: [
        {
          name: "chicken breast (raw)",
          kcal: 120,
          proteins: 22,
          carbohydrates: 0,
          fats: 2.6,
        },
        {
          name: "chicken thigh (raw)",
          kcal: 119,
          proteins: 19,
          carbohydrates: 0,
          fats: 4.4,
        },
        {
          name: "turkey breast (raw)",
          kcal: 111,
          proteins: 24,
          carbohydrates: 0,
          fats: 0.8,
        },
        {
          name: "turkey thigh (raw)",
          kcal: 144,
          proteins: 19,
          carbohydrates: 0,
          fats: 7,
        },
        {
          name: "beef loin (raw)",
          kcal: 191,
          proteins: 20,
          carbohydrates: 0,
          fats: 12,
        },
        {
          name: "beef fillet (raw)",
          kcal: 137,
          proteins: 20,
          carbohydrates: 0,
          fats: 6,
        },
        {
          name: "beef rib (raw)",
          kcal: 292,
          proteins: 16,
          carbohydrates: 0,
          fats: 24,
        },
        {
          name: "ground beef (80% lean, raw)",
          kcal: 254,
          proteins: 17,
          carbohydrates: 0,
          fats: 20,
        },
        {
          name: "pork loin (raw)",
          kcal: 143,
          proteins: 21,
          carbohydrates: 0,
          fats: 6,
        },
        {
          name: "pork chop (raw)",
          kcal: 231,
          proteins: 21,
          carbohydrates: 0,
          fats: 16,
        },
        {
          name: "pork rib (raw)",
          kcal: 286,
          proteins: 17,
          carbohydrates: 0,
          fats: 24,
        },
        {
          name: "pork belly (raw)",
          kcal: 518,
          proteins: 9,
          carbohydrates: 0,
          fats: 53,
        },
        {
          name: "ground pork (raw)",
          kcal: 263,
          proteins: 18,
          carbohydrates: 0,
          fats: 20,
        },
      ],
    },
    charcuterie: {
      results: [
        {
          name: "chicken cooked ham",
          kcal: 110,
          proteins: 18,
          carbohydrates: 1,
          fats: 4,
        },
        {
          name: "turkey cooked ham",
          kcal: 105,
          proteins: 20,
          carbohydrates: 1,
          fats: 3,
        },
        {
          name: "serrano ham",
          kcal: 250,
          proteins: 30,
          carbohydrates: 0,
          fats: 14,
        },
        {
          name: "cooked ham",
          kcal: 115,
          proteins: 20,
          carbohydrates: 1,
          fats: 4,
        },
      ],
    },
    dairy: {
      results: [
        {
          name: "yogurt",
          kcal: 59,
          proteins: 3.5,
          carbohydrates: 4.7,
          fats: 3,
        },
        {
          name: "cream cheese (Philadelphia style)",
          kcal: 342,
          proteins: 7,
          carbohydrates: 4,
          fats: 32,
        },
        {
          name: "cheese",
          kcal: 402,
          proteins: 25,
          carbohydrates: 1.3,
          fats: 33,
        },
        {
          name: "egg",
          kcal: 155,
          proteins: 13,
          carbohydrates: 1.1,
          fats: 11,
        },
        {
          name: "milk",
          kcal: 42,
          proteins: 3.4,
          carbohydrates: 5,
          fats: 1,
        },
        {
          name: "skim milk",
          kcal: 34,
          proteins: 3.4,
          carbohydrates: 5,
          fats: 0.1,
        },
        {
          name: "almond milk",
          kcal: 15,
          proteins: 0.6,
          carbohydrates: 0.6,
          fats: 1.1,
        },
        {
          name: "egg white",
          kcal: 52,
          proteins: 11,
          carbohydrates: 0.7,
          fats: 0.2,
        },
        {
          name: "egg yolk",
          kcal: 322,
          proteins: 16,
          carbohydrates: 3.6,
          fats: 27,
        },
      ],
    },
    legumes: {
      results: [
        {
          name: "lentils",
          kcal: 116,
          proteins: 9,
          carbohydrates: 20,
          fats: 0.4,
        },
        {
          name: "chickpeas",
          kcal: 164,
          proteins: 8.9,
          carbohydrates: 27,
          fats: 2.6,
        },
        {
          name: "rice",
          kcal: 130,
          proteins: 2.4,
          carbohydrates: 28.2,
          fats: 0.3,
        },
        {
          name: "brown rice",
          kcal: 111,
          proteins: 2.6,
          carbohydrates: 23.5,
          fats: 0.9,
        },
      ],
    },
    flour: {
      results: [
        {
          name: "pasta",
          kcal: 131,
          proteins: 5.8,
          carbohydrates: 25.3,
          fats: 1.1,
        },
        {
          name: "whole wheat pasta",
          kcal: 124,
          proteins: 5.7,
          carbohydrates: 25.5,
          fats: 0.8,
        },
        {
          name: "white sandwich bread",
          kcal: 266,
          proteins: 8,
          carbohydrates: 49,
          fats: 3.3,
        },
        {
          name: "whole wheat sandwich bread",
          kcal: 225,
          proteins: 9,
          carbohydrates: 37,
          fats: 4.5,
        },
        {
          name: "rice cakes",
          kcal: 28,
          proteins: 0.7,
          carbohydrates: 6.3,
          fats: 0.1,
        },
      ],
    },
    fruits: {
      results: [
        {
          name: "banana",
          kcal: 89,
          proteins: 1.1,
          carbohydrates: 22.8,
          fats: 0.3,
        },
        {
          name: "grapes",
          kcal: 69,
          proteins: 0.7,
          carbohydrates: 18.1,
          fats: 0.2,
        },
        {
          name: "apple",
          kcal: 52,
          proteins: 0.3,
          carbohydrates: 14,
          fats: 0.2,
        },
        {
          name: "rocha pear",
          kcal: 58,
          proteins: 0.4,
          carbohydrates: 15.3,
          fats: 0.2,
        },
        {
          name: "kiwi",
          kcal: 61,
          proteins: 1.1,
          carbohydrates: 14.7,
          fats: 0.5,
        },
        {
          name: "peach",
          kcal: 39,
          proteins: 0.9,
          carbohydrates: 9.5,
          fats: 0.3,
        },
        {
          name: "watermelon",
          kcal: 30,
          proteins: 0.6,
          carbohydrates: 7.6,
          fats: 0.2,
        },
        {
          name: "strawberries",
          kcal: 32,
          proteins: 0.7,
          carbohydrates: 7.7,
          fats: 0.3,
        },
        {
          name: "blueberries",
          kcal: 57,
          proteins: 0.7,
          carbohydrates: 14.5,
          fats: 0.3,
        },
      ],
    },
    vegetables: {
      results: [
        {
          name: "Olives",
          kcal: 172,
          proteins: 1,
          carbohydrates: 0,
          fats: 18,
        },
        {
          name: "Avocado",
          kcal: 161,
          proteins: 2,
          carbohydrates: 7.4,
          fats: 15.3,
        },
        {
          name: "Carrot",
          kcal: 43,
          proteins: 1,
          carbohydrates: 10.1,
          fats: 0.2,
        },
        {
          name: "Onion",
          kcal: 38,
          proteins: 1.2,
          carbohydrates: 8.6,
          fats: 0.2,
        },
        {
          name: "Eggplant",
          kcal: 28,
          proteins: 0.8,
          carbohydrates: 6.6,
          fats: 0.2,
        },
        {
          name: "Tomato",
          kcal: 21,
          proteins: 0.9,
          carbohydrates: 4.8,
          fats: 0.2,
        },
        {
          name: "Zucchini",
          kcal: 17,
          proteins: 1.2,
          carbohydrates: 3.1,
          fats: 0.3,
        },
        {
          name: "Cucumber",
          kcal: 15,
          proteins: 0.7,
          carbohydrates: 3.6,
          fats: 0.1,
        },
        {
          name: "Cauliflower",
          kcal: 24,
          proteins: 2,
          carbohydrates: 4.9,
          fats: 0.3,
        },
        {
          name: "Broccoli",
          kcal: 34,
          proteins: 2.8,
          carbohydrates: 6.6,
          fats: 0.4,
        },
        {
          name: "Spinach",
          kcal: 23,
          proteins: 2.9,
          carbohydrates: 3.6,
          fats: 0.4,
        },
        {
          name: "Lettuce",
          kcal: 15,
          proteins: 1.4,
          carbohydrates: 2.9,
          fats: 0.2,
        },
        {
          name: "Green beans",
          kcal: 31,
          proteins: 1.8,
          carbohydrates: 7,
          fats: 0.1,
        },
      ],
    },
  },
};

const doctors = [
  {
    name: "Tomas",
    lastname: "Dziurdzia",
    email: "tomidziurdzia@gmail.com",
    password: "Walter960",
    createdAt: new Date(),
    updatedAt: new Date(),
    role: "DOCTOR",
  },
  {
    name: "John",
    lastname: "Doe",
    email: "john.doe@example.com",
    password: "password1",
    createdAt: new Date(),
    updatedAt: new Date(),
    role: "DOCTOR",
  },
  {
    name: "Jane",
    lastname: "Smith",
    email: "jane.smith@example.com",
    password: "password2",
    createdAt: new Date(),
    updatedAt: new Date(),
    role: "DOCTOR",
  },
  {
    name: "María",
    lastname: "González",
    email: "maria.gonzalez@example.com",
    password: "securepassword",
    createdAt: new Date(),
    updatedAt: new Date(),
    role: "DOCTOR",
  },
  {
    name: "Juan",
    lastname: "Martínez",
    email: "juan.martinez@example.com",
    password: "password123",
    createdAt: new Date(),
    updatedAt: new Date(),
    role: "DOCTOR",
  },
  {
    name: "Laura",
    lastname: "López",
    email: "laura.lopez@example.com",
    password: "laurapass",
    createdAt: new Date(),
    updatedAt: new Date(),
    role: "DOCTOR",
  },
];

const patients = [
  {
    name: "Ximena",
    lastname: "Apel",
    email: "ximeapel@gmail.com",
    password: "Walter960",
    createdAt: new Date(),
    updatedAt: new Date(),
    kcal: Math.floor(Math.random() * (2000 - 1500 + 1)) + 1500,
    proteins: Math.floor(Math.random() * (200 - 100 + 1)) + 100,
    carbohydrates: Math.floor(Math.random() * (200 - 150 + 1)) + 150,
    fats: Math.floor(Math.random() * (100 - 50 + 1)) + 50,
    role: "PATIENT",
  },
  {
    name: "Ana",
    lastname: "Rodríguez",
    email: "ana.rodriguez@example.com",
    password: "anapass",
    createdAt: new Date(),
    updatedAt: new Date(),
    kcal: Math.floor(Math.random() * (2000 - 1500 + 1)) + 1500,
    proteins: Math.floor(Math.random() * (200 - 100 + 1)) + 100,
    carbohydrates: Math.floor(Math.random() * (200 - 150 + 1)) + 150,
    fats: Math.floor(Math.random() * (100 - 50 + 1)) + 50,
    role: "PATIENT",
  },
  {
    name: "Pedro",
    lastname: "Gómez",
    email: "pedro.gomez@example.com",
    password: "pedropass",
    createdAt: new Date(),
    updatedAt: new Date(),
    kcal: Math.floor(Math.random() * (2000 - 1500 + 1)) + 1500,
    proteins: Math.floor(Math.random() * (200 - 100 + 1)) + 100,
    carbohydrates: Math.floor(Math.random() * (200 - 150 + 1)) + 150,
    fats: Math.floor(Math.random() * (100 - 50 + 1)) + 50,
    role: "PATIENT",
  },
  {
    name: "Sofía",
    lastname: "Martínez",
    email: "sofia.martinez@example.com",
    password: "sofiapass",
    createdAt: new Date(),
    updatedAt: new Date(),
    kcal: Math.floor(Math.random() * (2000 - 1500 + 1)) + 1500,
    proteins: Math.floor(Math.random() * (200 - 100 + 1)) + 100,
    carbohydrates: Math.floor(Math.random() * (200 - 150 + 1)) + 150,
    fats: Math.floor(Math.random() * (100 - 50 + 1)) + 50,
    role: "PATIENT",
  },
  {
    name: "Javier",
    lastname: "López",
    email: "javier.lopez@example.com",
    password: "javierpass",
    createdAt: new Date(),
    updatedAt: new Date(),
    kcal: Math.floor(Math.random() * (2000 - 1500 + 1)) + 1500,
    proteins: Math.floor(Math.random() * (200 - 100 + 1)) + 100,
    carbohydrates: Math.floor(Math.random() * (200 - 150 + 1)) + 150,
    fats: Math.floor(Math.random() * (100 - 50 + 1)) + 50,
    role: "PATIENT",
  },
  {
    name: "Luisa",
    lastname: "Hernández",
    email: "luisa.hernandez@example.com",
    password: "luisapass",
    createdAt: new Date(),
    updatedAt: new Date(),
    kcal: Math.floor(Math.random() * (2000 - 1500 + 1)) + 1500,
    proteins: Math.floor(Math.random() * (200 - 100 + 1)) + 100,
    carbohydrates: Math.floor(Math.random() * (200 - 150 + 1)) + 150,
    fats: Math.floor(Math.random() * (100 - 50 + 1)) + 50,
    role: "PATIENT",
  },
  {
    name: "Carlos",
    lastname: "Díaz",
    email: "carlos.diaz@example.com",
    password: "carlospass",
    createdAt: new Date(),
    updatedAt: new Date(),
    kcal: Math.floor(Math.random() * (2000 - 1500 + 1)) + 1500,
    proteins: Math.floor(Math.random() * (200 - 100 + 1)) + 100,
    carbohydrates: Math.floor(Math.random() * (200 - 150 + 1)) + 150,
    fats: Math.floor(Math.random() * (100 - 50 + 1)) + 50,
    role: "PATIENT",
  },
  {
    name: "Elena",
    lastname: "Fernández",
    email: "elena.fernandez@example.com",
    password: "elenapass",
    createdAt: new Date(),
    updatedAt: new Date(),
    kcal: Math.floor(Math.random() * (2000 - 1500 + 1)) + 1500,
    proteins: Math.floor(Math.random() * (200 - 100 + 1)) + 100,
    carbohydrates: Math.floor(Math.random() * (200 - 150 + 1)) + 150,
    fats: Math.floor(Math.random() * (100 - 50 + 1)) + 50,
    role: "PATIENT",
  },
  {
    name: "Diego",
    lastname: "Rojas",
    email: "diego.rojas@example.com",
    password: "diegopass",
    createdAt: new Date(),
    updatedAt: new Date(),
    kcal: Math.floor(Math.random() * (2000 - 1500 + 1)) + 1500,
    proteins: Math.floor(Math.random() * (200 - 100 + 1)) + 100,
    carbohydrates: Math.floor(Math.random() * (200 - 150 + 1)) + 150,
    fats: Math.floor(Math.random() * (100 - 50 + 1)) + 50,
    role: "PATIENT",
  },
  {
    name: "Marta",
    lastname: "Pérez",
    email: "marta.perez@example.com",
    password: "martapass",
    createdAt: new Date(),
    updatedAt: new Date(),
    kcal: Math.floor(Math.random() * (2000 - 1500 + 1)) + 1500,
    proteins: Math.floor(Math.random() * (200 - 100 + 1)) + 100,
    carbohydrates: Math.floor(Math.random() * (200 - 150 + 1)) + 150,
    fats: Math.floor(Math.random() * (100 - 50 + 1)) + 50,
    role: "PATIENT",
  },
  {
    name: "Pablo",
    lastname: "Sánchez",
    email: "pablo.sanchez@example.com",
    password: "pablopass",
    createdAt: new Date(),
    updatedAt: new Date(),
    kcal: Math.floor(Math.random() * (2000 - 1500 + 1)) + 1500,
    proteins: Math.floor(Math.random() * (200 - 100 + 1)) + 100,
    carbohydrates: Math.floor(Math.random() * (200 - 150 + 1)) + 150,
    fats: Math.floor(Math.random() * (100 - 50 + 1)) + 50,
    role: "PATIENT",
  },
];

const dailyDiet = [
  { date: "2024-06-01" },
  { date: "2024-06-02" },
  { date: "2024-06-03" },
  { date: "2024-06-04" },
  { date: "2024-06-05" },
  { date: "2024-06-06" },
  { date: "2024-06-07" },
  { date: "2024-06-08" },
  { date: "2024-06-09" },
  { date: "2024-06-10" },
  { date: "2024-06-11" },
  { date: "2024-06-12" },
  { date: "2024-06-13" },
  { date: "2024-06-14" },
  { date: "2024-06-15" },
  { date: "2024-06-16" },
  { date: "2024-06-17" },
  { date: "2024-06-18" },
  { date: "2024-06-19" },
  { date: "2024-06-20" },
  { date: "2024-06-21" },
  { date: "2024-06-22" },
  { date: "2024-06-23" },
  { date: "2024-06-24" },
  { date: "2024-06-25" },
  { date: "2024-06-26" },
  { date: "2024-06-27" },
  { date: "2024-06-28" },
  { date: "2024-06-29" },
  { date: "2024-06-30" },
];

const foodDosis = [
  {
    quantity: Math.floor(Math.random() * (250 - 50 + 1)) + 50,
    dishType: "BREAKFAST",
  },
  {
    quantity: Math.floor(Math.random() * (250 - 50 + 1)) + 50,
    dishType: "LUNCH",
  },
  {
    quantity: Math.floor(Math.random() * (250 - 50 + 1)) + 50,
    dishType: "SNACK",
  },
  {
    quantity: Math.floor(Math.random() * (250 - 50 + 1)) + 50,
    dishType: "DINNER",
  },
  {
    quantity: Math.floor(Math.random() * (250 - 50 + 1)) + 50,
    dishType: "BREAKFAST",
  },
  {
    quantity: Math.floor(Math.random() * (250 - 50 + 1)) + 50,
    dishType: "LUNCH",
  },
  {
    quantity: Math.floor(Math.random() * (250 - 50 + 1)) + 50,
    dishType: "SNACK",
  },
  {
    quantity: Math.floor(Math.random() * (250 - 50 + 1)) + 50,
    dishType: "DINNER",
  },
  {
    quantity: Math.floor(Math.random() * (250 - 50 + 1)) + 50,
    dishType: "BREAKFAST",
  },
  {
    quantity: Math.floor(Math.random() * (250 - 50 + 1)) + 50,
    dishType: "LUNCH",
  },
  {
    quantity: Math.floor(Math.random() * (250 - 50 + 1)) + 50,
    dishType: "SNACK",
  },
  {
    quantity: Math.floor(Math.random() * (250 - 50 + 1)) + 50,
    dishType: "DINNER",
  },
  {
    quantity: Math.floor(Math.random() * (250 - 50 + 1)) + 50,
    dishType: "BREAKFAST",
  },
  {
    quantity: Math.floor(Math.random() * (250 - 50 + 1)) + 50,
    dishType: "LUNCH",
  },
  {
    quantity: Math.floor(Math.random() * (250 - 50 + 1)) + 50,
    dishType: "SNACK",
  },
  {
    quantity: Math.floor(Math.random() * (250 - 50 + 1)) + 50,
    dishType: "DINNER",
  },
  {
    quantity: Math.floor(Math.random() * (250 - 50 + 1)) + 50,
    dishType: "BREAKFAST",
  },
  {
    quantity: Math.floor(Math.random() * (250 - 50 + 1)) + 50,
    dishType: "LUNCH",
  },
  {
    quantity: Math.floor(Math.random() * (250 - 50 + 1)) + 50,
    dishType: "SNACK",
  },
  {
    quantity: Math.floor(Math.random() * (250 - 50 + 1)) + 50,
    dishType: "DINNER",
  },
  {
    quantity: Math.floor(Math.random() * (250 - 50 + 1)) + 50,
    dishType: "BREAKFAST",
  },
  {
    quantity: Math.floor(Math.random() * (250 - 50 + 1)) + 50,
    dishType: "LUNCH",
  },
  {
    quantity: Math.floor(Math.random() * (250 - 50 + 1)) + 50,
    dishType: "SNACK",
  },
  {
    quantity: Math.floor(Math.random() * (250 - 50 + 1)) + 50,
    dishType: "DINNER",
  },
  {
    quantity: Math.floor(Math.random() * (250 - 50 + 1)) + 50,
    dishType: "BREAKFAST",
  },
  {
    quantity: Math.floor(Math.random() * (250 - 50 + 1)) + 50,
    dishType: "LUNCH",
  },
  {
    quantity: Math.floor(Math.random() * (250 - 50 + 1)) + 50,
    dishType: "SNACK",
  },
  {
    quantity: Math.floor(Math.random() * (250 - 50 + 1)) + 50,
    dishType: "DINNER",
  },
  {
    quantity: Math.floor(Math.random() * (250 - 50 + 1)) + 50,
    dishType: "BREAKFAST",
  },
  {
    quantity: Math.floor(Math.random() * (250 - 50 + 1)) + 50,
    dishType: "LUNCH",
  },
  {
    quantity: Math.floor(Math.random() * (250 - 50 + 1)) + 50,
    dishType: "SNACK",
  },
  {
    quantity: Math.floor(Math.random() * (250 - 50 + 1)) + 50,
    dishType: "DINNER",
  },
];

const foodIds = [
  "017c6a89-122c-4bf9-90b2-e088fa2bffc6",
  "0a6ff851-2ee3-4cca-8be3-bcf7c80af6f7",
  "106a08c0-41ec-45fd-9f8d-8f6bb02bd483",
  "132b6ee1-0457-4406-b402-12986611f50a",
  "17805be5-9908-4bfd-86d9-323fe7d0c0f8",
  "268964c4-4c08-4c1a-82f6-7c070ef1d39b",
  "28ee1df0-28dc-4fec-bcfb-b2a75096892c",
  "37f79415-40bb-47e3-a739-1217e623a061",
  "381b625b-6df1-4714-8926-caecca1ec1ca",
  "417d7a1d-1b7c-4e41-8d7c-e031e3aa67ec",
  "455e6dbe-0682-4b16-ac78-8cc6f2e270c2",
  "4dc3a436-d8a3-442a-9b13-d3ce73eb2612",
  "4e0edf1d-796b-49d9-af23-64ac7d7b6717",
  "56a4e2a8-a329-49ee-9ef1-decf75710ec5",
  "58b454a2-1346-4719-a7c4-024667c58ebc",
  "5a751856-bba2-4d7a-bab2-b55572e2cd47",
  "5ab74860-1fe4-4bba-bc84-6bb7b4f13ca1",
  "6785cf29-85b1-4696-afc1-2a3e69bb9076",
  "69afc60a-822b-4610-976c-503faa6cb152",
  "74b8792d-1b80-4567-bca9-14153e7be2e7",
  "75abb595-96a4-410e-a393-b48e35540953",
  "780b03cb-7065-4b43-b883-04f232d39430",
  "825f29e0-b371-43a7-b15f-2b23e43fc24a",
  "83bf69e9-48ed-4cb4-a45c-1abe4c1e64c5",
  "845ab2ca-9857-4daa-8ee5-d7283dea51d1",
  "8b4a1d4f-0461-40b6-bde0-904e3f7d2043",
  "9553e615-025d-40e8-8560-d1ab7972a6f2",
  "95714a3c-cb2e-438b-877c-780707fac1b6",
  "97854358-0a10-4f5c-a952-5c7ddde67902",
  "a0eec4ca-2cfa-4e3b-9fd3-a647c05dafad",
  "a4846945-340b-469d-81ea-83b8a67ccf7b",
  "a6053609-837b-40c7-8f48-7963225b8936",
  "a691b8eb-0219-4950-a250-08c05294faee",
  "a97bc970-e53c-4097-af8e-e45d40eb0f0e",
  "b19415b3-e78a-45cb-a51d-ebddcd652e5a",
  "b31d783f-3b31-4539-a233-0304ecb94f85",
  "b361b443-f862-4642-8f19-55bb09d52b2c",
  "b7ff4b33-6a3c-4b6c-81ec-41a3524f57ce",
  "bdfa0ec0-7b63-492b-91b1-e27d8702de5a",
  "bdff73fd-3266-40a3-b1d4-527e0dcc5147",
  "bf1f95e2-6de1-4651-b874-2e09a9bc5da1",
  "c1f495f1-8ee8-4e66-81b0-e64d848dba8a",
  "c3e43f28-1732-459b-91df-2a602b3caa5f",
  "c7429db7-0477-4b96-83dc-6e8199e5a89b",
  "d3590400-bdc1-453c-9e5a-75b43df1b9fb",
  "d95d398e-ac52-4c8f-996c-d44ffc6cc97c",
  "e65d62c1-ea3c-4c8b-bc58-73ae5e3e3751",
  "e67cac5f-61a5-4ccb-bb4b-579a285fccb1",
  "e7e6f66c-fef3-4436-8d21-5117dbeb47ae",
  "f061699d-d35e-47e9-a2b7-0f180081a681",
  "fb4e862a-044e-4f65-9dc2-b0d6265be180",
  "fba9c6b9-d225-4c95-9e35-9bf01f18ec70",
  "fc3f726f-2a23-47a3-90c1-113435632b52",
  "fc772c40-5672-4ac4-ad02-328bf93e0e1e",
  "fe4659e7-57a6-4f0d-8f6c-639cfa6caa8d",
  "ffc2de65-52ab-4193-9a7a-84bd9126035a",
];

const dailyFoodsIds = [
  "fda0452a-fbeb-4d9a-93d6-3441c0fde722",
  "d988d0d3-9701-45b1-a996-c8f8da7b68ae",
  "d930900d-8d19-4401-8b73-f17e9e7ce79d",
  "d5a31665-b0ce-45e0-ae58-ddcf246f0d05",
  "d0898393-3ec3-434d-933c-d33f31bd0b30",
  "d001d421-f7d5-4259-ba85-264c7ce2d0f1",
  "cd1f93c4-8451-4647-97db-89a915770b18",
  "c209a518-e56d-4daf-bfc1-fb012360fce7",
  "be82cf7c-a2b6-429f-8cfd-d27dd49dd82a",
  "bd5e49ee-eb6f-43eb-895f-ca35d9182f54",
  "aaf56a7b-e8a8-4af2-83cc-c36b87ec1302",
  "a5da7a32-9d8a-4150-ae71-887d0d196e8a",
  "9a904a8e-3bc9-44e0-bf5a-8f02825d7b2a",
  "8ee1f3c3-e377-4c17-8b08-0b7a70ee083c",
  "8e9517aa-2c89-461f-9316-56570505a4e6",
  "8e27489e-6de8-4e3a-bf1c-4bd79e2715ed",
  "8aec4439-9891-41af-b2d1-87cf17ea0be5",
  "74de5b2e-5c88-4bb3-85d7-5c0fd036743c",
  "6db534b1-2ce0-4f6f-b16d-168be3a7dd22",
  "63575116-1829-49af-b2ae-1f232c3d2b1f",
  "401130ef-fe80-4403-8677-220aeafd3d0c",
  "3a040f24-3d4b-42ac-9c3f-9f02ef00b0b0",
  "2e5907a8-c4a0-4a9a-81f1-4e4c38c60fcf",
  "1a7b3e3b-d5f3-4a08-91f4-b23b29f84326",
  "05e20a34-ea1b-4eac-8d97-0a0490b2e7c5",
  "00b08565-7bfb-44fc-b124-9f9f22a736a0",
  "f919f372-6780-4ba4-89c5-67f4d0f7a36e",
  "eece5bc4-6d45-4744-a1d7-20e4d925182c",
  "c231205e-0a42-4f4f-8c10-73f4d3e0c266",
  "b6e25f08-ff5d-47c6-9e5d-0bf576e258e7",
  "96ba5cd6-7b59-4d80-a5fe-e8682a5f67c6",
  "7e16f3d8-98e0-4e69-9986-8bc9eefca10f",
  "6a9b6f64-bf3b-432d-9b2b-bac2d0aa018c",
  "4d75e6e0-1b9e-430f-8b67-72956de7b31e",
  "3bb81f95-1f7e-4a00-ae16-5b2d166408ff",
  "1a0e6b3a-d07a-4a1e-9bae-16ae9bcf6a0e",
  "15321158-7a10-46e6-b011-5c1f86bc800a",
  "0f1d3d8a-2a0e-4322-8467-8c03c3a1f20d",
  "09f209be-1f2f-4b85-9e1d-4f92541dd8e0",
  "0861b95e-4a19-4b0d-a187-55005e97b0ac",
  "07d5ac30-9c15-4fb8-9797-18f007f1a3a4",
  "05f506fb-119c-4a93-9881-16eaf8d00f69",
  "05d0a52e-e79f-45a1-8999-19453f2688ad",
  "05b91e1d-67e1-49c5-aeef-d94c7a0f33b5",
  "04f04e5d-8f7f-4ff4-a150-5a7eb8ecf41f",
  "02d5e749-1b3d-42e8-91f3-3b0d10ac5eac",
];

const messages = [
  {
    text: "Hola",
    ownerId: "6415a680-09fc-4d26-b6be-d6db11be82de",
  },
  {
    text: "¿Cómo estás?",
    ownerId: "08784914-31fb-4cd9-a3a1-d27a0dce0d4c",
  },
  {
    text: "Buenos días",
    ownerId: "6415a680-09fc-4d26-b6be-d6db11be82de",
  },
  {
    text: "Buenas tardes",
    ownerId: "08784914-31fb-4cd9-a3a1-d27a0dce0d4c",
  },
  {
    text: "Buenas noches",
    ownerId: "6415a680-09fc-4d26-b6be-d6db11be82de",
  },
  {
    text: "¿Qué tal?",
    ownerId: "08784914-31fb-4cd9-a3a1-d27a0dce0d4c",
  },
  {
    text: "¿Qué haces?",
    ownerId: "6415a680-09fc-4d26-b6be-d6db11be82de",
  },
  {
    text: "¿Cómo va todo?",
    ownerId: "08784914-31fb-4cd9-a3a1-d27a0dce0d4c",
  },
  {
    text: "¿Todo bien?",
    ownerId: "6415a680-09fc-4d26-b6be-d6db11be82de",
  },
  {
    text: "¡Hola de nuevo!",
    ownerId: "08784914-31fb-4cd9-a3a1-d27a0dce0d4c",
  },
  {
    text: "¡Qué gusto verte!",
    ownerId: "6415a680-09fc-4d26-b6be-d6db11be82de",
  },
  {
    text: "¡Hace tiempo!",
    ownerId: "08784914-31fb-4cd9-a3a1-d27a0dce0d4c",
  },
  {
    text: "¿Cómo ha estado tu día?",
    ownerId: "6415a680-09fc-4d26-b6be-d6db11be82de",
  },
  {
    text: "¿Alguna novedad?",
    ownerId: "08784914-31fb-4cd9-a3a1-d27a0dce0d4c",
  },
  {
    text: "¡Buen día!",
    ownerId: "6415a680-09fc-4d26-b6be-d6db11be82de",
  },
  {
    text: "¡Qué alegría!",
    ownerId: "08784914-31fb-4cd9-a3a1-d27a0dce0d4c",
  },
  {
    text: "¿Cómo te va?",
    ownerId: "6415a680-09fc-4d26-b6be-d6db11be82de",
  },
  {
    text: "¡Saludos!",
    ownerId: "08784914-31fb-4cd9-a3a1-d27a0dce0d4c",
  },
  {
    text: "¿Qué cuentas?",
    ownerId: "6415a680-09fc-4d26-b6be-d6db11be82de",
  },
  {
    text: "¡Qué onda!",
    ownerId: "08784914-31fb-4cd9-a3a1-d27a0dce0d4c",
  },
  {
    text: "¡Hola, hola!",
    ownerId: "6415a680-09fc-4d26-b6be-d6db11be82de",
  },
  {
    text: "¿Cómo te encuentras?",
    ownerId: "08784914-31fb-4cd9-a3a1-d27a0dce0d4c",
  },
  {
    text: "¡Qué pasa!",
    ownerId: "6415a680-09fc-4d26-b6be-d6db11be82de",
  },
  {
    text: "¡Hola a todos!",
    ownerId: "08784914-31fb-4cd9-a3a1-d27a0dce0d4c",
  },
  {
    text: "¡Hey!",
    ownerId: "6415a680-09fc-4d26-b6be-d6db11be82de",
  },
  {
    text: "¡Buenos días a todos!",
    ownerId: "08784914-31fb-4cd9-a3a1-d27a0dce0d4c",
  },
  {
    text: "¿Qué me cuentas?",
    ownerId: "6415a680-09fc-4d26-b6be-d6db11be82de",
  },
  {
    text: "¡Hola, buen día!",
    ownerId: "08784914-31fb-4cd9-a3a1-d27a0dce0d4c",
  },
  {
    text: "¿Qué tal tu día?",
    ownerId: "6415a680-09fc-4d26-b6be-d6db11be82de",
  },
  {
    text: "¡Qué tal va todo!",
    ownerId: "08784914-31fb-4cd9-a3a1-d27a0dce0d4c",
  },
];

// Puedes usar el array patients en tu script de seed o donde sea necesario.

async function main() {
  // Seed Completa
  // for (const [categoryName, categoryData] of Object.entries(food.categories)) {
  //   for (const foodItem of categoryData.results) {
  //     await prisma.food.create({
  //       data: {
  //         name: foodItem.name,
  //         category: categoryName,
  //         kcal: foodItem.kcal,
  //         proteins: foodItem.proteins,
  //         carbohydrates: foodItem.carbohydrates,
  //         fats: foodItem.fats,
  //       },
  //     });
  //   }
  // }
  // // Insertar doctores
  // for (const doctor of doctors) {
  //   await prisma.doctor.create({
  //     data: {
  //       name: doctor.name,
  //       lastname: doctor.lastname,
  //       email: doctor.email,
  //       password: await hashPassword(doctor.password),
  //       createdAt: doctor.createdAt,
  //       updatedAt: doctor.updatedAt,
  //       role: "DOCTOR",
  //     },
  //   });
  // }
  // Insertar patients
  // for (const patient of patients) {
  //   await prisma.patient.create({
  //     data: {
  //       name: patient.name,
  //       lastname: patient.lastname,
  //       email: patient.email,
  //       password: await hashPassword(patient.password),
  //       createdAt: patient.createdAt,
  //       updatedAt: patient.updatedAt,
  //       role: "PATIENT",
  //       kcal: patient.kcal,
  //       proteins: patient.proteins,
  //       carbohydrates: patient.carbohydrates,
  //       fats: patient.fats,
  //       doctorId: "6415a680-09fc-4d26-b6be-d6db11be82de",
  //     },
  //   });
  // }
  /*
  

  for (const daily of dailyDiet) {
    await prisma.dailyDiet.create({
      data: {
        date: daily.date,
        foods: {},
        patientId: "27abe078-8362-471c-826a-6de5e36f51b7",
      },
    });
  }
  */

  for (const message of messages) {
    if (message.ownerId === "6415a680-09fc-4d26-b6be-d6db11be82de") {
      await prisma.chat.create({
        data: {
          text: message.text,
          doctorId: "6415a680-09fc-4d26-b6be-d6db11be82de",
        },
      });
    }
    if (message.ownerId === "08784914-31fb-4cd9-a3a1-d27a0dce0d4c") {
      await prisma.chat.create({
        data: {
          text: message.text,
          patientId: "08784914-31fb-4cd9-a3a1-d27a0dce0d4c",
        },
      });
    }
  }

  // async function getRandomFoodId() {
  //   const randomIndex = Math.floor(Math.random() * (foodIds.length - 10));
  //   return foodIds[randomIndex - 10];
  // }
  // async function getRandomDailyFoodId() {
  //   const randomIndex = Math.floor(Math.random() * dailyFoodsIds.length);
  //   return dailyFoodsIds[randomIndex];
  // }
  // for (const dosis of foodDosis) {
  //   await prisma.foodDosis.create({
  //     data: {
  //       dishType: dosis.dishType as DishType,
  //       quantity: dosis.quantity,
  //       dailyDietId: await getRandomDailyFoodId(),
  //       foodId: await getRandomFoodId(),
  //     },
  //   });
  // }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
