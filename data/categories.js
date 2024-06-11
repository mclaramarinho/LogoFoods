export const categories = [
    {
        name: "Jantar",
        tag: "dinner",
        description: "Comidas de jantar",
        href: (category) => `?catalog&category=${category}`,
        imgSrc:"./assets/dinnerCategory.png"
    },
    {
        name: "Almoço",
        tag: "lunch",
        description: "Comidas de almoço",
        href: (category) => `?catalog&category=${category}`,
        imgSrc:"./assets/lunchCategory.png"
    },
    {
        name: "Sobremesas",
        tag: "desserts",
        description: "Comidas de jantar",
        href: (category) => `?catalog&category=${category}`,
        imgSrc:"./assets/snacksCategory.png"
    },
    {
        name: "Lanches",
        tag: "snacks",
        description: "Lanches",
        href: (category) => `?catalog&category=${category}`,
        imgSrc:"./assets/snacksCategory.png"
    },
    {
        name: "Pratos Regionais",
        tag: "regional",
        description: "Comidas de jantar",
        href: (category) => `?catalog&category=${category}`,
        imgSrc:"./assets/regionalCategory.png"
    },
    ,
    {
        name: "Flex",
        tag: "flex",
        description: "Comidas de flex",
        href: (category) => `?catalog&category=${category}`,
        imgSrc:"./assets/flexCategory.jpg"
    },
    {
        name: "Vegano",
        tag: "vegan",
        description: "Comidas de vegan",
        href: (category) => `?catalog&category=${category}`,
        imgSrc:"./assets/veganCategory.png"
    },
]