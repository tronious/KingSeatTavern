# Editing the Menu

The menu currently lives in `src/data/menu.ts`.

## Fast path (recommended)

1. Open `src/data/menu.ts`
2. For each section, add items:

```ts
items: [
  {
    id: 'bavarian-pretzel-rods',
    name: 'Bavarian Pretzel Rods',
    description: 'Served with beer cheese',
    price: { kind: 'single', price: { amount: 10, currency: 'USD' } },
  },
]
```

## Price formats supported

- Single price:

```ts
price: { kind: 'single', price: { amount: 10, currency: 'USD' } }
```

- Multiple sizes/prices:

```ts
price: {
  kind: 'range',
  prices: [
    { label: 'Small', price: { amount: 13, currency: 'USD' } },
    { label: 'Large', price: { amount: 16, currency: 'USD' } },
  ],
}
```

- Market price:

```ts
price: { kind: 'market' }
```

## If you want me to import it for you

Paste your menu in any of these formats and I’ll convert it into `menu.ts`:

- A screenshot/photo
- A PDF
- A simple text list grouped by category
- A spreadsheet/CSV

(You control the final wording/prices; I’ll just do the structured entry work.)
