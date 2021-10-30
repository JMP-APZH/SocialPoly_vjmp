import { Fragment } from "react";
import { Typography } from "@mui/material";
import { Scheduler } from "@aldabil/react-scheduler";
import { RESOURCES, EVENTS } from "./Data";
import { PersonRounded } from "@mui/icons-material";

function Calendar() {
  return (
    <Fragment>
      <Scheduler
        events={EVENTS}
        resources={RESOURCES}
        resourceFields={{
          idField: "admin_id",
          textField: "title",
          subTextField: "scheduled_posts",
          avatarField: "title",
          colorField: "color",
        }}
        resourceViewMode="tabs"
        selectedDate={new Date()}
        view="week"
        month={{
          weekDays: [0, 1, 2, 3, 4, 5, 6],
          weekStartOn: 1,
          startHour: 0,
          endHour: 24,
        }}
        week={{
          weekDays: [0, 1, 2, 3, 4, 5, 6],
          weekStartOn: 1,
          startHour: 0,
          endHour: 24,
          step: 60,
        }}
        day={{
          startHour: 0,
          endHour: 24,
          step: 60,
        }}
        fields={[
          {
            name: "admin_id",
            type: "select",
            default: RESOURCES[0].admin_id,
            options: RESOURCES.map((res) => {
              return {
                id: res.admin_id,
                text: `${res.title} (${res.scheduled_posts})`,
                value: res.admin_id, //Should match "name" property
              };
            }),
            config: { label: "Assignee", required: true },
          },
        ]}
        viewerExtraComponent={(fields, event) => {
          return (
            <div>
              {fields.map((field, i) => {
                if (field.name === "admin_id") {
                  const admin = field.options.find(
                    (fe) => fe.id === event.admin_id
                  );
                  return (
                    <Typography
                      key={i}
                      style={{ display: "flex", alignItems: "center" }}
                      color="textSecondary"
                      variant="caption"
                      noWrap
                    >
                      <PersonRounded /> {admin.text}
                    </Typography>
                  );
                } else {
                  return "";
                }
              })}
            </div>
          );
        }}
      />
    </Fragment>
  );
}

export default Calendar;
