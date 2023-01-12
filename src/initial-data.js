
// const initialData1 = {
//   tasks: {
//     'task-1': { id: 'task-1', content: 'Take out the garbage', date: 'December 12' },
//     'task-2': { id: 'task-2', content: 'Watch my favorite show' },
//     'task-3': { id: 'task-3', content: 'Charge my phone' },
//     'task-4': { id: 'task-4', content: 'Cook dinner' },
//     'task-5': { id: 'task-5', content: 'Walk the dog'}
//   },

//   // body = {
//   // task id: `task-${Date.now()}`,
//   // content: "Buy dessert"
//   // date: "10-02-22"
//   // status: "backlog"

//   // }
//   columns: {
//     'column-1': {
//       id: 'column-1',
//       title: 'Backlog',
//       taskIds: ['task-1', 'task-2', 'task-3', 'task-4'],
//     },
//     'column-2': {
//       id: 'column-2',
//       title: 'On deck',
//       taskIds: ['task-5'],
//     },
//     'column-3': {
//       id: 'column-3',
//       title: 'In progress',
//       taskIds: [],
//     },
//     'column-4': {
//       id: 'column-4',
//       title: 'Done',
//       taskIds: [],
//     },
//   },
//   columnOrder: ['column-1', 'column-2', 'column-3', 'column-4'],
// };

const boardObject = {
  tasks: {
  },
  columns: {
    'column-1': {
      id: 'column-1',
      title: 'Backlog',
      taskIds: [],
    },
    'column-2': {
      id: 'column-2',
      title: 'On deck',
      taskIds: [],
    },
    'column-3': {
      id: 'column-3',
      title: 'In progress',
      taskIds: [],
    },
    'column-4': {
      id: 'column-4',
      title: 'Done',
      taskIds: [],
    },
  },
  columnOrder: ['column-1', 'column-2', 'column-3', 'column-4'],
};


export default boardObject