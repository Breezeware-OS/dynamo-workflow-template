import React, {useState} from 'react';
import {Chip, Menu, MenuItem, Table, Text} from 'glide-design-system';
// import {useDispatch} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import {IconButton} from '@mui/material';
import {MoreHoriz} from '@mui/icons-material';

const transformText = text => {
  const splitArray = text.split('_');
  const updatedText = [];
  splitArray.map(element => {
    const firstLetter = element.charAt(0).toUpperCase();
    const rest = element.slice(1).toLowerCase();

    updatedText.push(firstLetter + rest);
  });

  return updatedText.join(' ');
};

export default function NurseTaskListTable({
  sortHandler,
  sortItem,
  sortOrder,
  data,
  loading,
}) {
  const [currentTask, setCurrentTask] = useState(null);
  const [taskActionsAnchorEl, setTaskActionsAnchorEl] = useState(null);
  const navigate = useNavigate();
  //   const dispatch = useDispatch();

  const columns = [
    {
      label: 'patient',
      sort: true,
      style: {
        textAlign: 'left',
      },
      customBodyRenderer: rowItem => {
        return (
          <div
            style={{cursor: 'pointer'}}
            role="button" // make div hehave as a button
            tabIndex="0" // make div hehave as a button
            onClick={() => {
              if (rowItem?.status === 'review_intake_form') {
                navigate(`/reviewIntakeForm/${rowItem?.id}`);
              } else if (rowItem?.status === 'take_vitals') {
                navigate(`/takeVitals/${rowItem?.id}`);
              } else if (rowItem?.status === 'schedule_followup') {
                navigate(`/scheduleAppointment/${rowItem?.id}`);
              } else {
                navigate(`/viewTask/${rowItem?.id}`);
              }
            }}>
            <Text
              style={{
                marginLeft: '10px',
                color: '#4c92c6',
                fontSize: '16px',
              }}>
              {`${rowItem?.patientFirstName} ${rowItem?.patientLastName}`}
            </Text>
          </div>
        );
      },
    },
    {
      label: 'Type',
      fieldName: 'type',
      sort: true,
      customBodyRenderer: rowItem => {
        return (
          <Chip
            style={{
              padding: '5px',
              fontSize: '12px',
              fontWeight: '400',
              // height: '27px',
              color: '#333333',
              textTransform: 'none',
              backgroundColor:
                rowItem?.status?.toLowerCase() === 'review_intake_form'
                  ? '#81d3f8'
                  : rowItem?.status?.toLowerCase() === 'take_vitals'
                  ? '#facd91'
                  : rowItem?.status?.toLowerCase() === 'schedule_followup'
                  ? '#d7d7d7'
                  : rowItem?.status?.toLowerCase() === 'completed'
                  ? '#b1dfd1'
                  : '#d7d7d7',
            }}>
            {transformText(rowItem?.status)}
          </Chip>
        );
      },
    },
    {
      label: 'createdOn',
      sort: true,
      style: {
        textAlign: 'left',
      },
      type: 'date',
    },
    {
      label: 'Actions',
      customBodyRenderer: rowItem => {
        return (
          <IconButton
            id="action-btn"
            sx={{padding: '0'}}
            disabled={rowItem.status.toLowerCase() === 'completed'}
            onClick={e => {
              setTaskActionsAnchorEl(e.currentTarget);
              setCurrentTask(rowItem);
            }}>
            <MoreHoriz sx={{fontSize: '39px'}} />
          </IconButton>
        );
      },
    },
  ];

  return (
    <div>
      <Table
        id="nurse-task-list-table"
        style={{borderLeft: 'none', borderRight: 'none', borderBottom: 'none'}}
        columns={columns}
        data={data?.content}
        sortHandler={sortHandler}
        sortItem={sortItem}
        sortOrder={sortOrder}
        loading={loading}
        progressCircleStyle={{color: '#0a5b99'}}
        message={data?.content?.length <= 0 && 'No tasks found'}
      />

      <Menu
        style={{boxShadow: 'none', cursor: 'pointer'}}
        anchorEl={taskActionsAnchorEl}
        open={Boolean(taskActionsAnchorEl)}
        position="bottom"
        onClose={() => setTaskActionsAnchorEl(null)}>
        <MenuItem
          onClick={() => {
            if (currentTask?.status === 'review_intake_form') {
              navigate(`/reviewIntakeForm/${currentTask?.id}`);
            } else if (currentTask?.status === 'take_vitals') {
              navigate(`/takeVitals/${currentTask?.id}`);
            } else if (currentTask?.status === 'schedule_followup') {
              navigate(`/scheduleAppointment/${currentTask?.id}`);
            } else {
              navigate(`/viewTask/${currentTask?.id}`);
            }

            setTaskActionsAnchorEl(null);
          }}>
          <span
            style={{color: '#0a5b99'}}
            className="material-symbols-outlined">
            play_arrow
          </span>
          <Text>Resume</Text>
        </MenuItem>
      </Menu>
    </div>
  );
}
