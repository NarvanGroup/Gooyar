const getItemLabel = (itemsArr: [], columns: any) => {
  let itemLabel = "";

  itemsArr.map(
    (item, indx) =>
      columns[indx] !== "EN" &&
      (itemLabel = `${itemLabel} ${item} ${
        columns[indx] !== "FA" ? `(${columns[indx]})` : ""
      } ${indx + 1 < itemsArr.length ? "-" : ""} `)
  );
  return itemLabel;
};

export const convertFiltersToAutocompleteOptions = (filters: any[]) => {
  let options: any = [];
  filters.map((filter) => {
    const columns = filter.options.columns;
    const rows = filter.options.rows;
    const name = filter.name;

    let filterOption: any = [];

    const sizesWithINT = [
      "Man Lower Body Size",
      "Man Upper Body Size",
      // "Men Shoe Size",
      "Women Lower Body Size",
      "Women Upper Body Size",
      // "Women Shoe Size",
    ];

    const fieldsWithEnglishTranslation = [
      "Fashion style",
      "Interests",
      "Fashion style",
      "Gift type",
    ];

    let valueIndex = 0;

    if (sizesWithINT.includes(name)) {
      valueIndex = columns.indexOf("INT");
    }

    if (fieldsWithEnglishTranslation.includes(name)) {
      valueIndex = columns.indexOf("EN");
    }

    rows.map((itemsArr: any, index: any) => {
      filterOption = [...filterOption, getItemLabel(itemsArr, columns)];
    });

    let labelArr: any = [];

    filterOption.map(
      (f: any, i: any) =>
        (labelArr = [
          ...labelArr,
          {
            id: i,
            label: f,
            value: f,
            // value: rows[i][valueIndex],
          },
        ])
    );

    options = {
      ...options,
      [name]: labelArr,
    };
  });

  return options;
};
