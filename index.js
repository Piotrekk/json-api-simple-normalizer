function normalizeSingleObject(resource) {
  var base = {
    id: resource.id,
    type: resource.type,
  };

  return Object.assign(base, resource.attributes);
};

function normalizeArray(response) {
  return response.map(function(obj) {
    return normalizeSingleObject(obj);
  });
};

function normalize(response) {
  if (!response.data) {
    return {};
  }

  if (Array.isArray(response.data)) {
    return normalizeArray(response.data);
  }

  return normalizeSingleObject(response.data);
};

module.exports = {
  normalize: normalize
};
