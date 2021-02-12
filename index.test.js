var normalize = require('./index.js').normalize;

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
      data: [{
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
      }]
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
