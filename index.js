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

function buildSingleRelationship(resourceKey, data, included) {
  var includedData = included.find(function(included) {
    return included.id === data.id && included.type === data.type;
  });

  var result = normalizeSingleObject(includedData);

  return {
    key: resourceKey,
    data: result,
  }
}

function buildRelationships(relationships, included) {
  var flattenedRelationships = Object.keys(relationships).map(function(resourceKey) {
    var data = relationships[resourceKey].data;

    if (Array.isArray(data)) {
      return data.map(function(dataItem) {
        return buildSingleRelationship(resourceKey, dataItem, included);
      });
    }

    return buildSingleRelationship(resourceKey, data, included);
  });

  return flattenedRelationships.reduce(function(acc, obj) {
    if (Array.isArray(obj)) {
      acc[obj[0].key] = obj.map(function(objItem) {
        return objItem.data;
      });
    } else {
      acc[obj.key] = obj.data;
    }

    return acc;
  }, {});
}

function normalizeRelationships(id, type, response) {
  if (!id || !type || !response.data) {
    return {};
  }

  const data = response.data.find(function(dataItem) {
    return dataItem.id === id && dataItem.type === type;
  });

  return buildRelationships(data.relationships, response.included);
}



module.exports = {
  normalize: normalize,
  normalizeRelationships: normalizeRelationships,
};
