import { ChangeEventHandler, useState } from "react";
import { FilterSettings } from "./ClientItemList";

type Props = {
  filterSettings: FilterSettings;
  filterChangeEvent: (change: FilterSettings) => void;
};

export default function Filter({ filterSettings, filterChangeEvent }: Props) {
  const searchEventHandler: ChangeEventHandler<HTMLInputElement> = (event) => {
    filterChangeEvent({
      showOnlyAvailable: filterSettings.showOnlyAvailable,
      search: event.target.value,
    });
  };

  const toggleRentedEventHandler: ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    filterChangeEvent({
      search: filterSettings.search,
      showOnlyAvailable: event.target.checked,
    });
  };

  return (
    <div>
      <label htmlFor="search">Search: </label>
      <input
        type="text"
        id="search"
        onChange={searchEventHandler}
        value={filterSettings.search}
      />
      <label htmlFor="showOnlyAvailable">Show Only Available: </label>
      <input
        type="checkbox"
        id="showOnlyAvailable"
        onChange={toggleRentedEventHandler}
        checked={filterSettings.showOnlyAvailable}
      />
    </div>
  );
}
