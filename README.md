# json-api-simple-normalizer

Simple normalizer for [JSON:API](https://jsonapi.org/) like datasets.

## API

### normalize(payload)
|   |   |
|---|---|
| `payload` | JSON API payload `Object` |
|  *returns* | `Object` \| `Array` |

Example:
```Javascript
import { normalize } from 'json-api-simple-normalizer';

const payload = {
  data: {
    id: '1',
    type: 'users',
    attributes: {
      first_name: 'Piotr',
      last_name: 'Klupa',
    },
  },
};
const user = normalize(payload);

// {
//   id: '1',
//   type: 'users',
//   first_name: 'Piotr',
//   last_name: 'Klupa',
// }

const payload = {
  data: [
    {
      id: '1',
      type: 'users',
      attributes: {
        first_name: 'Piotr',
        last_name: 'Klupa',
      },
    },
    {
      id: '2',
      type: 'users',
      attributes: {
        first_name: 'Jan',
        last_name: 'Kowalski',
      },
    },
  ],
};
const users = normalize(payload);

// [
//   {
//     id: '1',
//     type: 'users',
//     first_name: 'Piotr',
//     last_name: 'Klupa',
//   },
//   {
//     id: '2',
//     type: 'users',
//     first_name: 'Jan',
//     last_name: 'Kowalski',
//   },
// ]
```

### normalizeRelationships(id, type, payload)
|   |   |
|---|---|
| `id` | JSON API data id `String` |
| `type` | JSON API data type `String` |
| `payload` | JSON API payload `Object` |
|  *returns* | `Object` |

Normalizes **included** relationships.

Example:
```Javascript
import { normalizeRelationships } from 'json-api-simple-normalizer';

const payload = {
  data: {
    id: '1',
    type: 'payment_cards',
    attributes: {
      last4: '1234',
    },
    relationships: {
      user: {
        data: {
          id: '9',
          type: 'users',
        },
      },
      comments: {
        data: [
          { type: 'comments', id: '5' },
          { type: 'comments', id: '12' },
        ]
      },
    },
  },
  included: [
    {
      id: '9',
      type: 'users',
      attributes: {
        first_name: 'Piotr',
        last_name: 'Klupa',
      },
    },
    {
      id: '5',
      type: 'comments',
      attributes: {
        body: 'First!',
      },
    },
    {
      id: '12',
      type: 'comments',
      attributes: {
        body: 'Second!',
      },
    }
  ]
};
const relationships = normalizeRelationships('1', 'payment_cards', payload);

// {
//   user: {
//     id: '9',
//     type: 'users',
//     first_name: 'Piotr',
//     last_name: 'Klupa',   
//   },
//   comments: [
//     {
//       id: '5',
//       type: 'comments',
//       body: 'First!',
//     },
//     {
//       id: '12',
//       type: 'comments',
//       body: 'Second!',
//     },
//   ]
// }

const payload = {
  data: [{
    id: '1',
    type: 'payment_cards',
    attributes: {
      last4: '1234',
    },
    relationships: {
      user: {
        data: {
          id: '9',
          type: 'users',
        },
      },
      comments: {
        data: [
          { type: 'comments', id: '5' },
          { type: 'comments', id: '12' },
        ]
      },
    },
  }],
  included: [
    {
      id: '9',
      type: 'users',
      attributes: {
        first_name: 'Piotr',
        last_name: 'Klupa',
      },
    },
    {
      id: '5',
      type: 'comments',
      attributes: {
        body: 'First!',
      },
    },
    {
      id: '12',
      type: 'comments',
      attributes: {
        body: 'Second!',
      },
    }
  ]
};
const relationships = normalizeRelationships('1', 'payment_cards', payload);

// {
//   user: {
//     id: '9',
//     type: 'users',
//     first_name: 'Piotr',
//     last_name: 'Klupa',   
//   },
//   comments: [
//     {
//       id: '5',
//       type: 'comments',
//       body: 'First!',
//     },
//     {
//       id: '12',
//       type: 'comments',
//       body: 'Second!',
//     },
//   ]
// }
```