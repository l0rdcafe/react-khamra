export const flattenMessages = function(nestedMsgs, prefix = "") {
  return Object.keys(nestedMsgs).reduce((msgs, key) => {
    const val = nestedMsgs[key];
    const prefixedKey = prefix ? `${prefix}.${key}` : key;

    if (typeof val === "string") {
      msgs[prefixedKey] = val;
    } else {
      Object.assign(msgs, flattenMessages(val, prefixedKey));
    }
    return msgs;
  }, {});
};

export default flattenMessages;
