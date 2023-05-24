function providesList<R extends { _id: string }[], T extends string>(
  resultsWithIds: R ,
  tagType: T
) {
  return resultsWithIds
    ? [
        { type: tagType, id: "LIST" },
        ...resultsWithIds.map(({ _id }) => ({ type: tagType, _id })),
      ]
    : [{ type: tagType, id: "LIST" }];
}

export { providesList };