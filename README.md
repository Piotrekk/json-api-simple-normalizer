# json-api-simple-normalizer

Simple normalizer for [JSON:API](https://jsonapi.org/) like datasets.


## Usage

```
import { normalize } from 'json-api-simple-normalizer';

const { data } = await fetch('https://www.example.com');
const users = normalize(data);
```

## Examples

Input:
```
data: {
  id: '1',
  type: 'users',
  attributes: {
    first_name: 'Piotr',
    last_name: 'Klupa',
  },
}
```
Output:
```
{
  id: '1',
  type: 'users',
  first_name: 'Piotr',
  last_name: 'Klupa',
}
```

Input:
```
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
]
```

Output:
```
[
  {
    id: '1',
    type: 'users',
    first_name: 'Piotr',
    last_name: 'Klupa',
  },
  {
    id: '2',
    type: 'users',
    first_name: 'Jan',
    last_name: 'Kowalski',
  },
]
```
