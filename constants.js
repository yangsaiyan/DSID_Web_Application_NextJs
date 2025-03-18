export const formPath = {
  register: [
    "name",
    "studentId",
    "nric",
    "email",
    "phoneNumber",
    "permanentHomeAddress",
    "walletAddress",
    "token",
    "race",
    "gender",
    "faculty",
    "course",
    "nationality",
  ],
  search: [
    "name",
    "studentId",
    "nric",
    "email",
    "phoneNumber",
    "permanentHomeAddress",
    "token",
    "race",
    "gender",
    "faculty",
    "course",
    "nationality",
  ],
  pushEmail: ["email", "studentId", "faculty", "course"],
};

export const userData = {
  name: "Name",
  studentId: "Student ID",
  nric: "IC Number",
  race: "Race",
  nationality: "Nationality",
  gender: "Gender",
  email: "Email",
  faculty: "Faculty",
  course: "Course",
  phoneNumber: "Phone Number",
  permanentHomeAddress: "Permanent Home Address",
  walletAddress: "Wallet Address",
};

export const student_reg_abi = [
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "trustedForwarder",
        "type": "address"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "inputs": [],
    "name": "FailedCall",
    "type": "error"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "balance",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "needed",
        "type": "uint256"
      }
    ],
    "name": "InsufficientBalance",
    "type": "error"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "token",
        "type": "address"
      }
    ],
    "name": "SafeERC20FailedOperation",
    "type": "error"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "student",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "studentID",
        "type": "string"
      }
    ],
    "name": "StudentRegistered",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "student",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "newStudentID",
        "type": "string"
      }
    ],
    "name": "StudentUpdated",
    "type": "event"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_studentAddress",
        "type": "address"
      }
    ],
    "name": "getStudent",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "forwarder",
        "type": "address"
      }
    ],
    "name": "isTrustedForwarder",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "_studentID",
        "type": "string"
      }
    ],
    "name": "registerStudent",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "_studentID",
        "type": "string"
      }
    ],
    "name": "registerStudentGasless",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "_newStudentID",
        "type": "string"
      }
    ],
    "name": "updateStudent",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "_newStudentID",
        "type": "string"
      }
    ],
    "name": "updateStudentGasless",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
];
