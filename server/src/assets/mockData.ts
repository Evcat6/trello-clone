export const lists = [
  {
    id: "66ae2561-5e57-454a-86bc-a3f03f3a1c49",
    name: "To Do",
    cards: [
      {
        id: "f974183f-eb60-4e92-acee-9b6e6acda2f1",
        name: "Implement renaming lists",
        description: "Should be possible to change the name of the list",
        createAt: new Date(),
      },
      {
        id: "1d908f48-e429-448b-893e-28dbffe32d46",
        name: "Implement adding cards",
        description: "Should be possible to create cards",
        createAt: new Date(),
      },
      {
        id: "a9a628ee-4530-439e-aafa-1f31c4278a92",
        name: "Implement removing of cards",
        description: "Should be possible to remove card when button clicked",
        createAt: new Date(),
      },
      {
        id: "45f10f40-be32-425a-945d-f6712d043694",
        name: "Implement changing name of card",
        description: "Should be possible to change the name of card",
        createAt: new Date(),
      },
      {
        id: "8fd23148-114d-48af-87ed-6b3a80f841ed",
        name: "Implement changing description of card",
        description: "Should be possible to change description of card",
        createAt: new Date(),
      },
      {
        id: "fa3a8843-0333-4e26-9960-02eea90e4f42",
        name: "Implement copy card",
        description:
          'Using pattern Prototype implement a possibility to copy card. Id should be new for new card. The name of card should have "copy" suffix',
        createAt: new Date(),
      },
      {
        id: "5bb08acc-9b69-41a3-9149-cdc89f7cba1d",
        name: "Implement logging on server side",
        description:
          "Using pattern Observer implement logging with 3 levels: info, warn, error. There should be 2 loggers: first will write only errors into console, second will write all logs into file",
        createAt: new Date(),
      },
      {
        id: "d4493dab-bd5c-4333-802b-ce0a46d80bd6",
        name: "Implement logging of reorder action",
        description:
          "Using pattern Proxy implement logging for the ReorderService (logging proxy). Should be logged each what card/list and when was moved",
        createAt: new Date(),
      },
    ],
  },
  {
    id: "ab5cabe1-5d73-44f8-a8d4-37e25dbf0d07",
    name: "In progress",
    cards: [
      {
        id: "37470bf2-d11a-4ed3-ac17-0a676dcd469d",
        name: "Implement adding lists",
        description: "Should be possible to create list",
        createAt: new Date(),
      },
    ],
  },
];
