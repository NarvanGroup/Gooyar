import CustomSelect from "@/components/forms/theme-elements/CustomSelect";
import { MenuItem } from "@mui/material";
import { DebouncedInput } from "./DebouncedInput";

export function Filter({ column }: any) {
  const columnFilterValue = column.getFilterValue();
  const { filterVariant, options } = column.columnDef.meta || {};

  const handleFilterChange = (value: any) => {
    column.setFilterValue(value); // Update table state here
  };

  return filterVariant === "select" ? (
    <CustomSelect
      sx={{
        minWidth: 100,
      }}
      onChange={(e: { target: { value: any } }) =>
        handleFilterChange(e.target.value)
      }
      value={columnFilterValue ? columnFilterValue.toString() : ""}
      fullWidth
    >
      {/* See faceted column filters example for dynamic select options */}
      {options?.map((o: any) => (
        <MenuItem key={o.title} value={o.value}>
          {o.title}
        </MenuItem>
      ))}
    </CustomSelect>
  ) : (
    <DebouncedInput
      onChange={(value: any) => handleFilterChange(value)}
      placeholder={`جستجو...`}
      type="text"
      value={columnFilterValue || ""}
    />
    // See faceted column filters example for datalist search suggestions
  );
}
