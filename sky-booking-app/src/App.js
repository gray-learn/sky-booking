import React, { Component, useState } from "react";
import BpkCalendar, {
  CALENDAR_SELECTION_TYPE,
} from "@skyscanner/backpack-web/bpk-component-calendar";
import BpkInput, {
  INPUT_TYPES,
} from "@skyscanner/backpack-web/bpk-component-input";
import format from "date-fns/format";

import BpkButton from "@skyscanner/backpack-web/bpk-component-button";

import { cssModules } from "@skyscanner/backpack-web/bpk-react-utils";

import BpkText from "@skyscanner/backpack-web/bpk-component-text";

// Define formatting functions using date-fns/format
const formatDateFull = (date) => format(date, "EEEE, do MMMM yyyy");
const formatMonth = (date) => format(date, "MMMM yyyy");

import STYLES from "./App.scss";

const getClassName = cssModules(STYLES);

// Define the days of the week
const daysOfWeek = [
  {
    name: "Sunday",
    nameAbbr: "Sun",
    index: 0,
    isWeekend: true,
  },
  {
    name: "Monday",
    nameAbbr: "Mon",
    index: 1,
    isWeekend: false,
  },
  {
    name: "Tuesday",
    nameAbbr: "Tue",
    index: 2,
    isWeekend: false,
  },
  {
    name: "Wednesday",
    nameAbbr: "Wed",
    index: 3,
    isWeekend: false,
  },
  {
    name: "Thursday",
    nameAbbr: "Thu",
    index: 4,
    isWeekend: false,
  },
  {
    name: "Friday",
    nameAbbr: "Fri",
    index: 5,
    isWeekend: false,
  },
  {
    name: "Saturday",
    nameAbbr: "Sat",
    index: 6,
    isWeekend: true,
  },
];

const c = (className) => STYLES[className] || "UNKNOWN";

export default class App extends Component {
  constructor() {
    super();

    this.state = {
      selectionConfiguration: {
        type: CALENDAR_SELECTION_TYPE.single,
        date: null,
      },
    };
  }

  // const [selectedDate, setSelectedDate] = useState(undefined);
  handleDateSelect = (date) => {
    this.setState({
      selectionConfiguration: {
        type: CALENDAR_SELECTION_TYPE.single,
        date: date,
      },
    });
  };

  render() {
    return (
      <div className={c("App")}>
        <header className={getClassName("App__header")}>
          <div className={getClassName("App__header-inner")}>
            <BpkText tagName="h1" textStyle="xxl" className="App__heading">
              Flight Schedule
            </BpkText>
          </div>
        </header>
        <main className={c("App__main")}>
          <BpkInput
            id="dateInput"
            type={INPUT_TYPES.text}
            name="date"
            value={
              this.state.selectionConfiguration.date
                ? formatDateFull(this.state.selectionConfiguration.date)
                : ""
            }
            placeholder="Departure date"
          />
          <BpkCalendar
            id="calendar"
            onDateSelect={this.handleDateSelect}
            formatMonth={formatMonth}
            formatDateFull={formatDateFull}
            daysOfWeek={daysOfWeek}
            weekStartsOn={1}
            changeMonthLabel="Change month"
            nextMonthLabel="Next month"
            previousMonthLabel="Previous month"
            selectionConfiguration={this.state.selectionConfiguration}
          />
          <BpkButton onClick={() => alert("Continuing with reservation!")}>
            Continue
          </BpkButton>
        </main>
      </div>
    );
  }
}
