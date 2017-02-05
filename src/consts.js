export const CATALOG = 'Каталог';
export const MANAGER = 'Менеджер';


export const FILTER_NAMES = {
  department : 'Отдел',
  manufacturer : 'Производитель',
  metal : 'Металл',
  itemType : 'Тип изделия',
  subTypes : 'Подтип изделия'
};
export const base={
    availability: {
        dep1: {
            item1: {
                instance1: {
                    size: 14,
                    supplier: "supplier1",
                    weight: 1.55,
                    сost: 4400
                }
            }
        },
        dep2: {
            item2: {
                instance2: {
                    cost: 4700,
                    size: 16,
                    supplier: "Delta",
                    weight: 1.78
                }
            }
        }
    },
    filters: {
        department: {
            dep1: {
                address: "Красный проспект 10",
                name: "Askiz"
            },
            dep2: {
                address: "Улица Комсомола",
                name: "Tashtip"
            }
        },
        itemType: {
            Rings: {
                name: "Кольца",
                sizes: {
                    14: true,
                    15: true,
                    16: true,
                    '14,5': true,
                    '15,5': true,
                    '16,5': true
                },
                subTypes: {
                    double: true,
                    ones: true,
                    other: true,
                    wedding: true
                }
            },
            name: "Тип"
        },
        manufacturer: {
            man1:{
                name:'Delta'
            },
            man2:{
                name: 'Sokolov'
            }
        },
        metal: {
            Ag925: true,
            Au375: true,
            Au585: true,
            name: "Метал"
        }
    },
    main: {
        item1: {
            itemType: "Rings",
            manufacturer: "Sokolov",
            name: "Кольцо1",
            subType: "double",
            tags: "лучшее,красивое,нужное",
            url: "https://dl.dropboxusercontent.com/s/cyttpcxnhi0ogdx/c030713_1%2C59.jpg"
        },
        item2: {
            itemType: "Rings",
            manufacturer: "Delta",
            name: "Кольцо2",
            subType: "wedding",
            tags: "красивое",
            url: "https://dl.dropboxusercontent.com/s/5f5gkue3lj8gyiu/c031430_1.18.jpg"
        }
    }
};