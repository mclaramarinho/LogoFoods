export const products = [
    {
        id: 1,
        prodTitle: "Frango com Quinoa e Legumes",
        prodDesc: "Deliciosa combinação de frango grelhado, quinoa e legumes frescos.",
        prodPrice: 19.90,
        imgSrc: "./assets/frango-quinoa.jpg",
        available: true,
        href: (id) => `?details&productId=${id}`,
        categories: ["lunch", "regional"],
        characteristics: ["frozen", "meal"],
        nutritionalInfo: {
            ingredients: ["Frango", "Quinoa", "Cenoura", "Abobrinha", "Pimentão"],
            allergens: {
                milk: false,
                soyDerivates: false,
                lactose: false,
                gluten: false,
                peanut: false,
                seafood: false,
            },
            referencePortion: "1 porção (350g)",
            nutrients: {
                energy: {
                    kcal: 250,
                    kj: 1046,
                    vd: 12
                },
                carbohydrates: {
                    g: 30,
                    vd: 10
                },
                protein: {
                    g: 20,
                    vd: 40
                },
                fat: {
                    total: {
                        g: 5,
                        vd: 8
                    },
                    saturated: {
                        g: 1,
                        vd: 5
                    },
                    insaturated: {
                        g: 3,
                        vd: 0
                    },
                    trans: {
                        g: 0,
                        vd: 0
                    }
                },
                fiber: {
                    g: 5,
                    vd: 20
                },
                sodium: {
                    mg: 300,
                    vd: 12
                },
                sugar: {
                    g: 2,
                    vd: 4
                }
            }
        }
    },
    {
        id: 2,
        prodTitle: "Salada de Grão-de-Bico com Atum",
        prodDesc: "Salada fresca de grão-de-bico com atum, rica em proteínas.",
        prodPrice: 17.50,
        imgSrc: "./assets/salada-graodebico-atum.webp",
        available: true,
        href: (id) => `?details&productId=${id}`,
        categories: ["lunch", "seafood"],
        characteristics: ["frozen", "meal", "zero-lactose"],
        nutritionalInfo: {
            ingredients: ["Grão-de-Bico", "Atum", "Tomate", "Cebola", "Salsa"],
            allergens: {
                milk: false,
                soyDerivates: false,
                lactose: false,
                gluten: false,
                peanut: false,
                seafood: true,
            },
            referencePortion: "1 porção (300g)",
            nutrients: {
                energy: {
                    kcal: 220,
                    kj: 920,
                    vd: 11
                },
                carbohydrates: {
                    g: 25,
                    vd: 8
                },
                protein: {
                    g: 18,
                    vd: 36
                },
                fat: {
                    total: {
                        g: 7,
                        vd: 11
                    },
                    saturated: {
                        g: 1,
                        vd: 5
                    },
                    insaturated: {
                        g: 4,
                        vd: 0
                    },
                    trans: {
                        g: 0,
                        vd: 0
                    }
                },
                fiber: {
                    g: 7,
                    vd: 28
                },
                sodium: {
                    mg: 200,
                    vd: 8
                },
                sugar: {
                    g: 1,
                    vd: 2
                }
            }
        }
    },
    {
        id: 3,
        prodTitle: "Quiche de Espinafre e Ricota",
        prodDesc: "Quiche deliciosa com recheio de espinafre fresco e ricota.",
        prodPrice: 15.00,
        imgSrc: "./assets/quiche-espinafre-ricota.jpg",
        available: true,
        href: (id) => `?details&productId=${id}`,
        categories: ["dinner", "vegetarian"],
        characteristics: ["frozen", "meal", "zero-lactose"],
        nutritionalInfo: {
            ingredients: ["Espinafre", "Ricota", "Ovo", "Farinha de Trigo", "Queijo Parmesão"],
            allergens: {
                milk: true,
                soyDerivates: false,
                lactose: true,
                gluten: true,
                peanut: false,
                seafood: false,
            },
            referencePortion: "1 fatia (150g)",
            nutrients: {
                energy: {
                    kcal: 180,
                    kj: 753,
                    vd: 9
                },
                carbohydrates: {
                    g: 20,
                    vd: 7
                },
                protein: {
                    g: 10,
                    vd: 20
                },
                fat: {
                    total: {
                        g: 8,
                        vd: 12
                    },
                    saturated: {
                        g: 3,
                        vd: 15
                    },
                    insaturated: {
                        g: 4,
                        vd: 0
                    },
                    trans: {
                        g: 0,
                        vd: 0
                    }
                },
                fiber: {
                    g: 2,
                    vd: 8
                },
                sodium: {
                    mg: 250,
                    vd: 10
                },
                sugar: {
                    g: 1,
                    vd: 2
                }
            }
        }
    },
    {
        id: 4,
        prodTitle: "Torta Integral de Legumes",
        prodDesc: "Torta integral recheada com uma mistura de legumes frescos.",
        prodPrice: 12.00,
        imgSrc: "./assets/torta-integral-legumes.jpg",
        available: true,
        href: (id) => `?details&productId=${id}`,
        categories: ["lunch", "vegan"],
        characteristics: ["frozen", "meal", "zero-lactose", "vegan"],
        nutritionalInfo: {
            ingredients: ["Farinha Integral", "Cenoura", "Ervilha", "Milho", "Abobrinha"],
            allergens: {
                milk: false,
                soyDerivates: false,
                lactose: false,
                gluten: true,
                peanut: false,
                seafood: false,
            },
            referencePortion: "1 fatia (180g)",
            nutrients: {
                energy: {
                    kcal: 210,
                    kj: 878,
                    vd: 10
                },
                carbohydrates: {
                    g: 35,
                    vd: 12
                },
                protein: {
                    g: 6,
                    vd: 12
                },
                fat: {
                    total: {
                        g: 6,
                        vd: 9
                    },
                    saturated: {
                        g: 1,
                        vd: 5
                    },
                    insaturated: {
                        g: 4,
                        vd: 0
                    },
                    trans: {
                        g: 0,
                        vd: 0
                    }
                },
                fiber: {
                    g: 5,
                    vd: 20
                },
                sodium: {
                    mg: 200,
                    vd: 8
                },
                sugar: {
                    g: 3,
                    vd: 6
                }
            }
        }
    },
    {
        id: 5,
        prodTitle: "Bolo de Cenoura com Chocolate",
        prodDesc: "Clássico bolo de cenoura com uma deliciosa cobertura de chocolate.",
        prodPrice: 8.50,
        imgSrc: "./assets/bolo-cenoura-chocolate.jpeg",
        available: true,
        href: (id) => `?details&productId=${id}`,
        categories: ["desserts"],
        characteristics: ["frozen", "dessert"],
        nutritionalInfo: {
            ingredients: ["Cenoura", "Açúcar", "Ovo", "Farinha de Trigo", "Chocolate"],
            allergens: {
                milk: true,
                soyDerivates: false,
                lactose: true,
                gluten: true,
                peanut: false,
                seafood: false,
            },
            referencePortion: "1 fatia (100g)",
            nutrients: {
                energy: {
                    kcal: 300,
                    kj: 1255,
                    vd: 15
                },
                carbohydrates: {
                    g: 45,
                    vd: 15
                },
                protein: {
                    g: 5,
                    vd: 10
                },
                fat: {
                    total: {
                        g: 10,
                        vd: 15
                    },
                    saturated: {
                        g: 4,
                        vd: 20
                    },
                    insaturated: {
                        g: 4,
                        vd: 0
                    },
                    trans: {
                        g: 0,
                        vd: 0
                    }
                },
                fiber: {
                    g: 2,
                    vd: 8
                },
                sodium: {
                    mg: 150,
                    vd: 6
                },
                sugar: {
                    g: 30,
                    vd: 60
                }
            }
        }
    },
    {
        id: 6,
        prodTitle: "Pão de Queijo Vegano",
        prodDesc: "Delicioso pão de queijo sem derivados animais.",
        prodPrice: 12.90,
        imgSrc: "./assets/pao-queijo-vegano.jpg",
        available: true,
        href: (id) => `?details&productId=${id}`,
        categories: ["snacks", "vegan"],
        characteristics: ["frozen", "snack", "zero-lactose", "vegan"],
        nutritionalInfo: {
            ingredients: ["Polvilho", "Batata", "Óleo de Coco", "Leite de Amêndoas"],
            allergens: {
                milk: false,
                soyDerivates: false,
                lactose: false,
                gluten: false,
                peanut: false,
                seafood: false,
            },
            referencePortion: "1 unidade (50g)",
            nutrients: {
                energy: {
                    kcal: 100,
                    kj: 418,
                    vd: 5
                },
                carbohydrates: {
                    g: 15,
                    vd: 5
                },
                protein: {
                    g: 2,
                    vd: 4
                },
                fat: {
                    total: {
                        g: 4,
                        vd: 6
                    },
                    saturated: {
                        g: 2,
                        vd: 10
                    },
                    insaturated: {
                        g: 1,
                        vd: 0
                    },
                    trans: {
                        g: 0,
                        vd: 0
                    }
                },
                fiber: {
                    g: 2,
                    vd: 8
                },
                sodium: {
                    mg: 80,
                    vd: 3
                },
                sugar: {
                    g: 1,
                    vd: 2
                }
            }
        }
    },
    {
        id: 7,
        prodTitle: "Hambúrguer de Grão-de-Bico",
        prodDesc: "Hambúrguer saudável de grão-de-bico, ideal para um lanche rápido.",
        prodPrice: 15.90,
        imgSrc: "./assets/hamburguer-graodebico.jpg",
        available: true,
        href: (id) => `?details&productId=${id}`,
        categories: ["dinner", "vegan"],
        characteristics: ["frozen", "meal", "zero-lactose", "vegan"],
        nutritionalInfo: {
            ingredients: ["Grão-de-Bico", "Cebola", "Alho", "Aveia", "Salsinha"],
            allergens: {
                milk: false,
                soyDerivates: false,
                lactose: false,
                gluten: true,
                peanut: false,
                seafood: false,
            },
            referencePortion: "1 unidade (120g)",
            nutrients: {
                energy: {
                    kcal: 160,
                    kj: 670,
                    vd: 8
                },
                carbohydrates: {
                    g: 30,
                    vd: 10
                },
                protein: {
                    g: 8,
                    vd: 16
                },
                fat: {
                    total: {
                        g: 3,
                        vd: 5
                    },
                    saturated: {
                        g: 0.5,
                        vd: 3
                    },
                    insaturated: {
                        g: 2,
                        vd: 0
                    },
                    trans: {
                        g: 0,
                        vd: 0
                    }
                },
                fiber: {
                    g: 6,
                    vd: 24
                },
                sodium: {
                    mg: 300,
                    vd: 12
                },
                sugar: {
                    g: 2,
                    vd: 4
                }
            }
        }
    },
    {
        id: 8,
        prodTitle: "Wrap Integral de Vegetais",
        prodDesc: "Wrap integral recheado com vegetais frescos e molho de ervas.",
        prodPrice: 14.00,
        imgSrc: "./assets/wrap-integral-vegetais.jpg",
        available: true,
        href: (id) => `?details&productId=${id}`,
        categories: ["lunch", "vegan"],
        characteristics: ["frozen", "meal", "zero-lactose", "vegan"],
        nutritionalInfo: {
            ingredients: ["Tortilla Integral", "Alface", "Tomate", "Pepino", "Molho de Ervas"],
            allergens: {
                milk: false,
                soyDerivates: false,
                lactose: false,
                gluten: true,
                peanut: false,
                seafood: false,
            },
            referencePortion: "1 unidade (200g)",
            nutrients: {
                energy: {
                    kcal: 250,
                    kj: 1046,
                    vd: 12
                },
                carbohydrates: {
                    g: 35,
                    vd: 12
                },
                protein: {
                    g: 8,
                    vd: 16
                },
                fat: {
                    total: {
                        g: 8,
                        vd: 12
                    },
                    saturated: {
                        g: 2,
                        vd: 10
                    },
                    insaturated: {
                        g: 5,
                        vd: 0
                    },
                    trans: {
                        g: 0,
                        vd: 0
                    }
                },
                fiber: {
                    g: 6,
                    vd: 24
                },
                sodium: {
                    mg: 400,
                    vd: 16
                },
                sugar: {
                    g: 2,
                    vd: 4
                }
            }
        }
    },
    
];
