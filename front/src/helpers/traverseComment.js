const RULES = {
  b: { i: null },
  i: { b: null },
  a: {
    b: { i: null },
    i: { b: null },
  },
  c: null,
};

function matchAll(text, regex) {
  const matches = [...text.matchAll(regex)];
  return matches.map((match) => ({
    text: match[0],
    index: match.index,
    tag: match[1],
    enclose: match[2],
    length: match[0].length,
  }));
}

function matchAllTags(text) {
  return matchAll(text, /<\/?(a|i|b|c)?.*?>/g);
}

function matchAllEnclosures(text) {
  return matchAll(text, /<(a|i|b|c).*?>([\s\S]*?)<\/\1>/g);
}

const removedTags = [];

export function compute(prevTextPart, rule = RULES, indexGlobal = 0) {
  const result = [];

  let indexLocal = 0; // index of current text part
  let textPart = prevTextPart; // current text part

  const tags = matchAllEnclosures(textPart); // lazy pick all closed tags of current text part

  for (const tagInfo of tags) {
    textPart = prevTextPart.slice(indexLocal, tagInfo.index); // get text part before tag
    textPart = matchAllTags(textPart).reduce((tP, tagErr) => {
      // replace tags that lefts
      removedTags.push(tagErr);
      return tP.replace(tagErr.text, "");
    }, textPart);

    if (textPart.length) {
      result.push({
        index: indexLocal,
        text: textPart,
      });
    }

    if (rule) {
      // if tag enclosure sequence is accept by RULES const object
      const innerParts = compute(
        tagInfo.enclose,
        rule[tagInfo.tag],
        indexGlobal + tagInfo.index,
      ); // getting deeper in recursion

      result.push({
        innerParts,
        ...tagInfo,
      });

      indexLocal = tagInfo.length + tagInfo.index;
      indexGlobal += indexLocal;
    }
  }

  textPart = prevTextPart.slice(indexLocal);
  textPart = matchAllTags(textPart).reduce((tP, tagErr) => {
    // replace tags that lefts
    removedTags.push(tagErr);
    return tP.replace(tagErr.text, "");
  }, textPart);

  if (textPart.length) {
    result.push({
      index: indexLocal,
      text: textPart,
    });
  }

  return result;
}

export function traverse(prevTextPart, indexGlobal = 0) {
  const result = [];

  let indexLocal = 0; // index of current text part
  let textPart = prevTextPart; // current text part

  const tags = matchAllEnclosures(textPart); // lazy pick all closed tags of current text part

  for (const tagInfo of tags) {
    textPart = prevTextPart.slice(indexLocal, tagInfo.index); // get text part before tag

    if (textPart.length) {
      result.push({
        index: indexLocal,
        text: textPart,
      });
    }

    const innerParts = traverse(tagInfo.enclose, indexGlobal + tagInfo.index); // getting deeper in recursion

    result.push({
      innerParts,
      ...tagInfo,
    });

    indexLocal = tagInfo.length + tagInfo.index;
    indexGlobal += indexLocal;
  }

  textPart = prevTextPart.slice(indexLocal);

  if (textPart.length) {
    result.push({
      index: indexLocal,
      text: textPart,
    });
  }

  return result;
}
