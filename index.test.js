var normalize = require('./index.js').normalize;
var normalizeRelationships = require('./index.js').normalizeRelationships;

describe('normalize', function() {
  it('should normalize single resource object', function() {
    var response = {
      data: {
        id: '1',
        type: 'users',
        attributes: {
          first_name: 'Piotr',
          last_name: 'Klupa',
        },
      },
    };

    expect(normalize(response)).toEqual({
      id: '1',
      type: 'users',
      first_name: 'Piotr',
      last_name: 'Klupa',
    });
  });

  it('should normalize resources array', function() {
    var response = {
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

    expect(normalize(response)).toEqual([
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
    ]);
  });

  it('should return empty object when data is empty', function() {
    var response = {
      data: null,
    };

    expect(normalize(response)).toEqual({});
  });
});

describe('normalizeRelationships', function() {
  it('should normalize relationships', function() {
    var response = {
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

    expect(normalizeRelationships('1', 'payment_cards', response)).toEqual({
      user: {
        id: '9',
        type: 'users',
        first_name: 'Piotr',
        last_name: 'Klupa',   
      },
      comments: [
        {
          id: '5',
          type: 'comments',
          body: 'First!',
        },
        {
          id: '12',
          type: 'comments',
          body: 'Second!',
        },
      ]
    });
  });
});