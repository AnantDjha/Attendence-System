const attendance = [
    {
      empId: "9028828688",
      firstName: "Anant",
      lastName: "Jha",
      dayOfWork: 22,
      present: [
        { date: 1, month: 9, year: 2024 },
        { date: 3, month: 9, year: 2024 },
        { date: 4, month: 9, year: 2024 },
        { date: 5, month: 9, year: 2024 },
        { date: 6, month: 9, year: 2024 },
        { date: 8, month: 9, year: 2024 },
        { date: 9, month: 9, year: 2024 },
        { date: 12, month: 9, year: 2024 },
        { date: 13, month: 9, year: 2024 }
      ],
      absent: [
        { date: 2, month: 9, year: 2024, leave: false },
        { date: 7, month: 9, year: 2024, leave: true },
        { date: 10, month: 9, year: 2024, leave: false },
        { date: 11, month: 9, year: 2024, leave: true },
        { date: 14, month: 9, year: 2024, leave: false }
      ]
    },
    {
      empId: "9028828689",
      firstName: "Raj",
      lastName: "Singh",
      dayOfWork: 22,
      present: [
        { date: 1, month: 9, year: 2024 },
        { date: 2, month: 9, year: 2024 },
        { date: 3, month: 9, year: 2024 },
        { date: 5, month: 9, year: 2024 },
        { date: 6, month: 9, year: 2024 },
        { date: 7, month: 9, year: 2024 },
        { date: 9, month: 9, year: 2024 },
        { date: 10, month: 9, year: 2024 },
        { date: 11, month: 9, year: 2024 },
        { date: 12, month: 9, year: 2024 }
      ],
      absent: [
        { date: 4, month: 9, year: 2024, leave: false },
        { date: 8, month: 9, year: 2024, leave: true },
        { date: 13, month: 9, year: 2024, leave: true },
        { date: 14, month: 9, year: 2024, leave: false }
      ]
    },
    {
      empId: "9028828690",
      firstName: "Vikram",
      lastName: "Sharma",
      dayOfWork: 22,
      present: [
        { date: 1, month: 9, year: 2024 },
        { date: 2, month: 9, year: 2024 },
        { date: 3, month: 9, year: 2024 },
        { date: 4, month: 9, year: 2024 },
        { date: 6, month: 9, year: 2024 },
        { date: 8, month: 9, year: 2024 },
        { date: 9, month: 9, year: 2024 },
        { date: 11, month: 9, year: 2024 },
        { date: 12, month: 9, year: 2024 },
        { date: 13, month: 9, year: 2024 }
      ],
      absent: [
        { date: 5, month: 9, year: 2024, leave: false },
        { date: 7, month: 9, year: 2024, leave: true },
        { date: 10, month: 9, year: 2024, leave: true },
        { date: 14, month: 9, year: 2024, leave: false }
      ]
    },
    {
      empId: "9028828691",
      firstName: "Rohan",
      lastName: "Kumar",
      dayOfWork: 22,
      present: [
        { date: 2, month: 9, year: 2024 },
        { date: 3, month: 9, year: 2024 },
        { date: 4, month: 9, year: 2024 },
        { date: 6, month: 9, year: 2024 },
        { date: 7, month: 9, year: 2024 },
        { date: 9, month: 9, year: 2024 },
        { date: 10, month: 9, year: 2024 },
        { date: 12, month: 9, year: 2024 },
        { date: 13, month: 9, year: 2024 },
        { date: 14, month: 9, year: 2024 }
      ],
      absent: [
        { date: 1, month: 9, year: 2024, leave: false },
        { date: 5, month: 9, year: 2024, leave: true },
        { date: 8, month: 9, year: 2024, leave: false },
        { date: 11, month: 9, year: 2024, leave: true }
      ]
    },
    {
      empId: "9028828692",
      firstName: "Pooja",
      lastName: "Verma",
      dayOfWork: 22,
      present: [
        { date: 1, month: 9, year: 2024 },
        { date: 3, month: 9, year: 2024 },
        { date: 5, month: 9, year: 2024 },
        { date: 6, month: 9, year: 2024 },
        { date: 7, month: 9, year: 2024 },
        { date: 9, month: 9, year: 2024 },
        { date: 10, month: 9, year: 2024 },
        { date: 12, month: 9, year: 2024 },
        { date: 13, month: 9, year: 2024 }
      ],
      absent: [
        { date: 2, month: 9, year: 2024, leave: false },
        { date: 4, month: 9, year: 2024, leave: true },
        { date: 8, month: 9, year: 2024, leave: true },
        { date: 11, month: 9, year: 2024, leave: false },
        { date: 14, month: 9, year: 2024, leave: true }
      ]
    }
];

const admin = {
    _id: '66e5748298b5fd43cfedb419',
    firstName: 'Rahul',
    lastName: 'Prajapati',
    adminId: '9324831333',
    email: 'pra@gmail.com',
    password: '12345678',
    __v: 0
  };

  
  const employees = [
    {
      firstName: "Anant",
      lastName: "Jha",
      password: "12345678",
      empId: "9028828688",
      email: "anantjha0112@gmail.com"
    },
    {
      firstName: "Madhav",
      lastName: "Singh",
      password: "password123",
      empId: "9028828689",
      email: "msingh@gmail.com"
    },
    {
      firstName: "Priya",
      lastName: "Kumar",
      password: "securePass99",
      empId: "9028828690",
      email: "pkumar@gmail.com"
    },
    {
      firstName: "Ravi",
      lastName: "Sharma",
      password: "mypassword101",
      empId: "9028828691",
      email: "rsharma@gmail.com"
    },
    {
      firstName: "Neha",
      lastName: "Verma",
      password: "vermaNeha123",
      empId: "9028828692",
      email: "nverma@gmail.com"
    }
  ];
  
  