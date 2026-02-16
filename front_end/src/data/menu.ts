export type Money = {
  amount: number
  currency: 'USD'
}

export type MenuPrice =
  | { kind: 'single'; price: Money }
  | { kind: 'range'; prices: Array<{ label: string; price: Money }> }
  | { kind: 'market' }

export type MenuItem = {
  id: string
  name: string
  description?: string
  price?: MenuPrice
  notes?: string[]
}

export type MenuSection = {
  id: string
  title: string
  note?: string
  items: MenuItem[]
}

export type MenuModel = {
  updatedAt?: string
  sections: MenuSection[]
}

export const menu: MenuModel = {
  // Edit this file to enter your real menu items.
  // Tip: keep `id` stable for each section/item so anchors and React keys stay consistent.
  updatedAt: '2026-02-15',
  sections: [
    {
      id: 'appetizers',
      title: 'Appetizers',
      items: [
        {
          id: 'bavarian-pretzel-rods',
          name: 'Bavarian Pretzel Rods',
          price: { kind: 'single', price: { amount: 10, currency: 'USD' } },
          description: 'Served with beer cheese',
        },
        {
          id: 'portobello-mushrooms',
          name: 'Portobello Mushrooms',
          price: { kind: 'single', price: { amount: 6.5, currency: 'USD' } },
        },
        {
          id: 'crispy-chicken-tenders',
          name: 'Crispy Chicken Tenders',
          price: { kind: 'single', price: { amount: 13, currency: 'USD' } },
          description: 'Served with choice of fries or tots',
          notes: ['Upgrade to onion rings for $2.00'],
        },
        {
          id: 'cheese-sticks',
          name: 'Cheese Sticks',
          price: { kind: 'single', price: { amount: 7.5, currency: 'USD' } },
          description: 'Served with marinara',
        },
        {
          id: 'tater-tots',
          name: 'Tater Tots',
          price: { kind: 'single', price: { amount: 6, currency: 'USD' } },
          notes: ['Upgrade to loaded tots with bacon and choice of nacho or beer cheese for $4.00'],
        },
        {
          id: 'fried-pickles',
          name: 'Fried Pickles',
          price: { kind: 'single', price: { amount: 7.5, currency: 'USD' } },
          description: 'Served with pickle sauce',
        },
        {
          id: 'hot-pepper-cheese-balls',
          name: 'Hot Pepper Cheese Balls',
          price: { kind: 'single', price: { amount: 8, currency: 'USD' } },
        },
        {
          id: 'basket-of-fries',
          name: 'Basket of Fries',
          price: { kind: 'single', price: { amount: 6, currency: 'USD' } },
        },
        {
          id: 'onion-rings',
          name: 'Onion Rings',
          price: { kind: 'single', price: { amount: 7.5, currency: 'USD' } },
        },
        {
          id: 'veggie-egg-rolls-2',
          name: 'Veggie Egg Rolls (2)',
          price: { kind: 'single', price: { amount: 7, currency: 'USD' } },
          description: 'Served with choice of honey garlic teriyaki or sweet chili sauce',
        },
        {
          id: 'signature-chips',
          name: 'Signature Chips',
          price: { kind: 'single', price: { amount: 6, currency: 'USD' } },
          description: 'Plain or dusted',
        },
        {
          id: 'fried-dough-bites',
          name: 'Fried Dough Bites',
          price: {
            kind: 'range',
            prices: [
              { label: 'Small', price: { amount: 6, currency: 'USD' } },
              { label: 'Large', price: { amount: 11, currency: 'USD' } },
            ],
          },
          description: 'Choice of garlic butter or cinnamon',
        },
      ],
    },
    {
      id: 'soup-salad',
      title: 'Soup & Salad',
      items: [
        {
          id: 'kings-garden-salad',
          name: 'King’s Garden Salad',
          price: { kind: 'single', price: { amount: 8, currency: 'USD' } },
          description: 'Lettuce, tomato, onion, banana peppers, hard-boiled egg & cucumbers',
        },
        {
          id: 'chicken-salad',
          name: 'Chicken Salad',
          price: { kind: 'single', price: { amount: 15, currency: 'USD' } },
          description:
            'Lettuce, tomato, onion, banana peppers, hard-boiled egg, mixed cheese & fries. Choice of grilled or crispy chicken',
        },
        {
          id: 'sirloin-strip-steak-salad',
          name: 'Sirloin Strip Steak Salad',
          price: { kind: 'single', price: { amount: 17, currency: 'USD' } },
          description: 'Lettuce, tomato, onion, banana peppers, hard-boiled egg, mixed cheese & fries',
        },
        {
          id: 'italian-salad',
          name: 'Italian Salad',
          price: { kind: 'single', price: { amount: 15, currency: 'USD' } },
          description:
            'Lettuce, tomato, onion, ham, capicola, salami, pepperoni, provolone cheese, italian dressing',
        },
        {
          id: 'dressing',
          name: 'Dressing',
          description:
            'Italian, balsamic, ranch, blue cheese, thousand island, honey mustard & cucumber/wasabi (+ $2.00)',
        },
        {
          id: 'soup',
          name: 'Soup',
          price: {
            kind: 'range',
            prices: [
              { label: 'Cup', price: { amount: 4, currency: 'USD' } },
              { label: 'Bowl', price: { amount: 7, currency: 'USD' } },
              { label: 'Quart', price: { amount: 13, currency: 'USD' } },
            ],
          },
        },
      ],
    },
    {
      id: 'pizza-traditional',
      title: 'Traditional Pies',
      items: [
        {
          id: 'small-8',
          name: 'Small (8")',
          price: { kind: 'single', price: { amount: 13, currency: 'USD' } },
          description:
            'Pepperoni, sausage, bacon, meatballs, ground beef, green peppers, mushrooms, black olives, jalapeños, onions, pickles, tomato & banana peppers. $2.00 each.',
        },
        {
          id: 'large-12',
          name: 'Large (12")',
          price: { kind: 'single', price: { amount: 16, currency: 'USD' } },
          description:
            'Pepperoni, sausage, bacon, meatballs, ground beef, green peppers, mushrooms, black olives, jalapeños, onions, pickles, tomato & banana peppers. $3.00 each.',
        },
      ],
    },
    {
      id: 'pizza-special',
      title: 'Special Pies',
      items: [
        {
          id: 'king-mac',
          name: 'King Mac',
          price: {
            kind: 'range',
            prices: [
              { label: 'Small', price: { amount: 19, currency: 'USD' } },
              { label: 'Large', price: { amount: 22, currency: 'USD' } },
            ],
          },
          description:
            'Thousand Island base, ground meat, onions, American cheese, cheddar cheese, pickles & lettuce',
        },
        {
          id: 'philly-pie',
          name: 'Philly',
          price: {
            kind: 'range',
            prices: [
              { label: 'Small', price: { amount: 19, currency: 'USD' } },
              { label: 'Large', price: { amount: 22, currency: 'USD' } },
            ],
          },
          description:
            'Fried mushrooms, onions, green peppers, provolone cheese, choice of shredded chicken or steak & choice of garlic butter or ranch base',
        },
        {
          id: 'diablo-pie',
          name: 'Diablo',
          price: {
            kind: 'range',
            prices: [
              { label: 'Small', price: { amount: 21, currency: 'USD' } },
              { label: 'Large', price: { amount: 25, currency: 'USD' } },
            ],
          },
          description:
            'Pizza sauce, pepperoni, jalapeño bacon, jalapeños, banana peppers, hot sauce, pizza cheese & hot pepper cheese',
        },
        {
          id: 'chicken-bacon-ranch-pie',
          name: 'Chicken Bacon Ranch',
          price: {
            kind: 'range',
            prices: [
              { label: 'Small', price: { amount: 19, currency: 'USD' } },
              { label: 'Large', price: { amount: 22, currency: 'USD' } },
            ],
          },
          description: 'Ranch base, bacon & mixed cheese',
          notes: ['Choice of crispy or grilled chicken'],
        },
        {
          id: 'buffalo-chicken-pie',
          name: 'Buffalo Chicken',
          price: {
            kind: 'range',
            prices: [
              { label: 'Small', price: { amount: 19, currency: 'USD' } },
              { label: 'Large', price: { amount: 22, currency: 'USD' } },
            ],
          },
          description:
            'Buffalo base, mixed cheese, French fries, choice of grilled or crispy chicken & choice of ranch or blue cheese drizzle',
        },
        {
          id: 'white-pie',
          name: 'White',
          price: {
            kind: 'range',
            prices: [
              { label: 'Small', price: { amount: 17, currency: 'USD' } },
              { label: 'Large', price: { amount: 20, currency: 'USD' } },
            ],
          },
          description: 'Garlic butter base, sliced tomatoes & pizza cheese',
        },
        {
          id: 'taco-pie',
          name: 'Taco',
          price: {
            kind: 'range',
            prices: [
              { label: 'Small', price: { amount: 19, currency: 'USD' } },
              { label: 'Large', price: { amount: 22, currency: 'USD' } },
            ],
          },
          description:
            'Lettuce, tomato, onion, ground beef, mixed cheese, sour cream & taco sauce. Choice of taco sauce or nacho cheese base',
        },
        {
          id: 'pickle-pie',
          name: 'Pickle',
          price: {
            kind: 'range',
            prices: [
              { label: 'Small', price: { amount: 15, currency: 'USD' } },
              { label: 'Large', price: { amount: 19, currency: 'USD' } },
            ],
          },
          description:
            'Lettuce, tomato, onion, ground beef, mixed cheese, sour cream & taco sauce. Choice of taco sauce or nacho cheese base',
        },
      ],
    },
    {
      id: 'sandwiches',
      title: 'Sandwiches, Wraps & Hoagies',
      note:
        'Served with house chips. Upgrade to fries or tots for $2.00. Upgrade to onion rings, soup cup, or side salad for $3.00.',
      items: [
        {
          id: 'italian-stallion',
          name: 'Italian Stallion (Available as Wrap or Hoagie)',
          price: {
            kind: 'range',
            prices: [
              { label: 'Wrap', price: { amount: 11, currency: 'USD' } },
              { label: 'Hoagie', price: { amount: 17, currency: 'USD' } },
            ],
          },
          description:
            'Ham, capicola, salami, pepperoni, provolone cheese, lettuce, tomato, onion & italian dressing',
        },
        {
          id: 'reuben',
          name: 'Reuben (Available as Wrap or Sandwich)',
          price: { kind: 'single', price: { amount: 15, currency: 'USD' } },
          description: 'Corned beef, Swiss cheese, sauerkraut & thousand island dressing',
        },
        {
          id: 'the-big-meatballer',
          name: 'The Big Meatballer (Available as Hoagie)',
          price: {
            kind: 'range',
            prices: [
              { label: 'Half', price: { amount: 11, currency: 'USD' } },
              { label: 'Whole', price: { amount: 17, currency: 'USD' } },
            ],
          },
          description: 'Sauce, pizza cheese & meatballs',
        },
        {
          id: 'the-chicken-philly',
          name: 'The Chicken Philly (Available as Wrap or Hoagie)',
          price: {
            kind: 'range',
            prices: [
              { label: 'Wrap', price: { amount: 13, currency: 'USD' } },
              { label: 'Hoagie', price: { amount: 18, currency: 'USD' } },
            ],
          },
          description: 'Shredded chicken, fried mushrooms, onions, green peppers & provolone cheese',
        },
        {
          id: 'the-steak-philly',
          name: 'The Steak Philly (Available as Wrap or Hoagie)',
          price: {
            kind: 'range',
            prices: [
              { label: 'Wrap', price: { amount: 15, currency: 'USD' } },
              { label: 'Hoagie', price: { amount: 20, currency: 'USD' } },
            ],
          },
          description: 'Shredded steak, fried mushrooms, onions, green peppers & provolone cheese',
        },
        {
          id: 'chicken-bacon-ranch-sandwich',
          name: 'Chicken Bacon Ranch (Available as Wrap or Hoagie)',
          price: {
            kind: 'range',
            prices: [
              { label: 'Wrap', price: { amount: 14, currency: 'USD' } },
              { label: 'Hoagie', price: { amount: 19, currency: 'USD' } },
            ],
          },
          description: 'Lettuce, tomato, bacon, provolone cheese & ranch',
          notes: ['Choice of crispy or grilled chicken'],
        },
      ],
    },
    {
      id: 'burgers',
      title: 'Burgers',
      note:
        'Served with house chips. Upgrade to fries or tots for $2.00. Upgrade to onion rings, soup cup, or side salad for $3.00. Keto options available.',
      items: [
        {
          id: 'the-big-cheese',
          name: 'The Big Cheese',
          price: { kind: 'single', price: { amount: 13, currency: 'USD' } },
          description: 'Lettuce, tomato, onion & choice of cheese',
          notes: ['Add bacon: $2.00'],
        },
        {
          id: 'swiss-and-shrooms',
          name: 'Swiss & Shrooms',
          price: { kind: 'single', price: { amount: 15, currency: 'USD' } },
          description: 'Sautéed mushrooms, swiss cheese & fried portobello mushrooms',
        },
        {
          id: 'western',
          name: 'Western',
          price: { kind: 'single', price: { amount: 15, currency: 'USD' } },
          description: 'Bacon, cheddar cheese & onion rings',
        },
        {
          id: 'jalapeno-cheddar',
          name: 'Jalapeño Cheddar',
          price: { kind: 'single', price: { amount: 15, currency: 'USD' } },
          description: 'Fried jalapeños, hot pepper cheese, jalapeño bacon & sweet red chili sauce',
        },
        {
          id: 'diablo-burger',
          name: 'Diablo',
          price: { kind: 'single', price: { amount: 15, currency: 'USD' } },
          description: 'Lettuce, tomato, onion, hot pepper cheese, jalapeño bacon, jalapeños & reaper mayo',
        },
        {
          id: 'pb-and-j',
          name: 'PB & J',
          price: { kind: 'single', price: { amount: 15, currency: 'USD' } },
          description: 'Lettuce, tomato, onion, American cheese, peanut butter & strawberry jelly',
        },
        {
          id: 'wakey-wakey-eggs-and-bakey',
          name: 'Wakey, Wakey, Eggs & Bakey',
          price: { kind: 'single', price: { amount: 15, currency: 'USD' } },
          description: 'Dippy egg, choice of cheese and choice of bacon, sausage or ham',
        },
        {
          id: 'deluxe-toppings',
          name: 'Deluxe Toppings',
          description: 'Deluxe toppings + $0.75 each',
          notes: [
            'Sautéed mushrooms, jalapeños, grilled onions, green peppers, black olives & banana peppers',
          ],
        },
        {
          id: 'premium-toppings',
          name: 'Premium Toppings',
          description: 'Premium toppings + $1.50 each',
          notes: [
            'Bacon, spicy bacon, sausage, ham, fried portobello mushrooms, onion rings & dippy egg',
          ],
        },
      ],
    },
    {
      id: 'wings',
      title: 'Jumbo Wings',
      note: "Wing Nights - Tuesday 2pm-10pm & Thursday 7pm-10pm. (Eat in only, no to-go's)",
      items: [
        {
          id: 'half-or-whole-dozen',
          name: 'Half or Whole Dozen',
          price: { kind: 'market' },
          notes: ['Add a celery boat for $2.00'],
        },
        {
          id: 'sauce-tossed',
          name: 'Sauce Tossed',
          price: {
            kind: 'range',
            prices: [
              { label: 'Half', price: { amount: 2, currency: 'USD' } },
              { label: 'Whole', price: { amount: 3, currency: 'USD' } },
            ],
          },
          description:
            'BBQ, garlic butter, garlic parmesan, honey garlic teriyaki, buffalo, garlic buffalo, honey hot, sweet chili, Nashville hot & Carolina reaper',
        },
        {
          id: 'black-truffle-buffalo-tossed',
          name: 'Black Truffle Buffalo Tossed',
          price: {
            kind: 'range',
            prices: [
              { label: 'Half', price: { amount: 3, currency: 'USD' } },
              { label: 'Whole', price: { amount: 5, currency: 'USD' } },
            ],
          },
          description: 'Black truffle buffalo sauce, blue cheese crumbles & green onions',
        },
        {
          id: 'dry-rubs',
          name: 'Dry Rubs',
          description: 'Seasoned salt, mild dust, Cajun, cowboy butter, honey garlic & Nashville hot',
        },
        {
          id: 'sauce-side',
          name: 'Sauce Side',
          price: {
            kind: 'range',
            prices: [
              { label: 'Small', price: { amount: 1, currency: 'USD' } },
              { label: 'Large', price: { amount: 2, currency: 'USD' } },
            ],
          },
          description:
            'BBQ, garlic butter, garlic parmesan, honey garlic teriyaki, buffalo, garlic buffalo, honey hot, sweet chili, Nashville hot & Carolina reaper',
        },
        {
          id: 'black-truffle-buffalo-side',
          name: 'Black Truffle Buffalo Side',
          price: {
            kind: 'range',
            prices: [
              { label: 'Small', price: { amount: 2, currency: 'USD' } },
              { label: 'Large', price: { amount: 4, currency: 'USD' } },
            ],
          },
          description: 'Black truffle buffalo sauce, blue cheese crumbles & green onions',
        },
      ],
    },
    {
      id: 'kids',
      title: 'For the Kids',
      note: 'Includes a kids drink',
      items: [
        {
          id: 'kids-chicken-tenders-2',
          name: 'Chicken Tenders (2)',
          price: { kind: 'single', price: { amount: 8, currency: 'USD' } },
          description: 'Served with choice of homemade chips or applesauce.',
          notes: ['Upgrade to fries or tots for $1.00'],
        },
        {
          id: 'kids-jumbo-wings',
          name: 'Jumbo Wings',
          price: { kind: 'single', price: { amount: 6, currency: 'USD' } },
          description: '3 wings & 1 sauce',
          notes: ['See wing section for dry rubs & sauces'],
        },
        {
          id: 'kids-grilled-cheese',
          name: 'Grilled Cheese',
          price: { kind: 'single', price: { amount: 6, currency: 'USD' } },
          description: 'Served with choice of homemade chips or applesauce.',
          notes: ['Upgrade to fries or tots for $1.00'],
        },
        {
          id: 'kids-mac-n-cheese',
          name: "Mac N' Cheese",
          price: { kind: 'single', price: { amount: 5, currency: 'USD' } },
        },
      ],
    },
  ],
}
