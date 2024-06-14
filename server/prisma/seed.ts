import prisma from "../src/utils/prisma";

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

async function main() {
  for (const [categoryName, categoryData] of Object.entries(food.categories)) {
    for (const foodItem of categoryData.results) {
      await prisma.food.create({
        data: {
          name: foodItem.name,
          category: categoryName,
          kcal: foodItem.kcal,
          proteins: foodItem.proteins,
          carbohydrates: foodItem.carbohydrates,
          fats: foodItem.fats,
        },
      });
    }
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
