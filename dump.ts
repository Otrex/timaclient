const transactions = ref([
  {
    id: Math.random(),
    profilePicture: undefined,
    influencerName: "Enioluwa",
    earnings: 500000,
    balance: 100000,
    createdAt: new Date().toDateString(),
    status: "successful",
    paymentMethod: "Flutterwave",
  },
  {
    id: Math.random(),
    profilePicture: undefined,
    influencerName: "Enioluwa",
    earnings: 500000,
    balance: 100000,
    createdAt: new Date().toDateString(),
    status: "successful",
    paymentMethod: "Flutterwave",
  },
  {
    id: Math.random(),
    profilePicture: undefined,
    influencerName: "Enioluwa",
    earnings: 500000,
    balance: 100000,
    createdAt: new Date().toDateString(),
    status: "pending",
    paymentMethod: "Flutterwave",
  },
  {
    id: Math.random(),
    profilePicture: undefined,
    influencerName: "Enioluwa",
    earnings: 500000,
    balance: 100000,
    createdAt: new Date().toDateString(),
    status: "successful",
    paymentMethod: "Flutterwave",
  },
  {
    id: Math.random(),
    profilePicture: undefined,
    influencerName: "Enioluwa",
    earnings: 500000,
    balance: 100000,
    createdAt: new Date().toDateString(),
    status: "successful",
    paymentMethod: "Flutterwave",
  },
  {
    id: Math.random(),
    profilePicture: undefined,
    influencerName: "Enioluwa",
    earnings: 500000,
    balance: 100000,
    createdAt: new Date().toDateString(),
    status: "pending",
    paymentMethod: "Flutterwave",
  },
  {
    id: Math.random(),
    profilePicture: undefined,
    influencerName: "Enioluwa",
    earnings: 500000,
    balance: 100000,
    createdAt: new Date().toDateString(),
    status: "successful",
    paymentMethod: "Flutterwave",
  },
]);

const paymentDataSet = [
  {
    label: "Product 1",
    data: [10, 40, 15, 67, 0, 51, 0, 10, 30, 30, 40],
    backgroundColor: "#AAD9FB",
    borderWidth: 0,
  },
  {
    label: "Product 2",
    data: [15, 10, 25, 55, 40, 55, 66, 10, 29, 10, 50],
    backgroundColor: "#2AA2FD",
    borderWidth: 0,
  },
  {
    label: "Product 3",
    data: [15, 10, 25, 0, 40, 55, 66, 0, 29, 10, 50],
    backgroundColor: "#FFB009",
    borderWidth: 0,
  },
  {
    label: "Product 4",
    data: [100, 10, 0, 0, 40, 0, 66, 0, 29, 10, 50],
    backgroundColor: "#AA7506",
    borderWidth: 0,
  },
  {
    label: "Product 5",
    data: [0, 10, 25, 0, 40, 55, 66, 0, 29, 10, 50],
    backgroundColor: "#FFE5AD",
    borderWidth: 0,
  }]
const applications = ref([
  {
    name: "beautygoddess",
    type: "Independent",
    socials: ["instagram", "tiktok"],
    profilePicture:
      "https://s3-alpha-sig.figma.com/img/05ee/48aa/de7b6e9524212508334e50ea61c70030?Expires=1703462400&Signature=ijz7Asd6CkEZ2tuTDLFfgVnYLczHgS9svBiHSTeM-ALflGOpy2voPkT4dAgv5qz7BjaP8Hhji2Sudf703R-LMdxx~QqsGVsD8sTUjggRrplAYV33UUvB5IoRL7nWaQYSQdp1NJW4ad9nFdfBa9SOhCClKy5orrkYO0fTxtQaLofMBQ9dvm5aNoUehHJhP9yT15xR8aPb38TVswBbTRYZoLuF2tFn1klCnhE2elnfVAFxzcFEL9TYxtY4okRAx3WIREMXaPE6W-gSZnL84DkbwdprqhmiNCwPXSQ33I9yeyTAbWJ85ftV1Rm0chKTeYSHUaRb~JMqMRYXeBzIksskqA__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4",
    questionAndAnswers: [
      {
        question: "Have you worked with us before?",
        answer: "Yes",
      },
      {
        question: "Have you worked with us before?",
        answer: "Yes",
      },
    ],
  },
  {
    name: "beautygoddess",
    type: "Independent",
    socials: ["instagram", "tiktok"],
    profilePicture:
      "https://s3-alpha-sig.figma.com/img/05ee/48aa/de7b6e9524212508334e50ea61c70030?Expires=1703462400&Signature=ijz7Asd6CkEZ2tuTDLFfgVnYLczHgS9svBiHSTeM-ALflGOpy2voPkT4dAgv5qz7BjaP8Hhji2Sudf703R-LMdxx~QqsGVsD8sTUjggRrplAYV33UUvB5IoRL7nWaQYSQdp1NJW4ad9nFdfBa9SOhCClKy5orrkYO0fTxtQaLofMBQ9dvm5aNoUehHJhP9yT15xR8aPb38TVswBbTRYZoLuF2tFn1klCnhE2elnfVAFxzcFEL9TYxtY4okRAx3WIREMXaPE6W-gSZnL84DkbwdprqhmiNCwPXSQ33I9yeyTAbWJ85ftV1Rm0chKTeYSHUaRb~JMqMRYXeBzIksskqA__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4",
    questionAndAnswers: [
      {
        question: "Have you worked with us before?",
        answer: "Yes",
      },
      {
        question: "Have you worked with us before?",
        answer: "Yes",
      },
    ],
  },
  {
    name: "beautygoddess",
    type: "Independent",
    socials: ["instagram", "tiktok"],
    profilePicture:
      "https://s3-alpha-sig.figma.com/img/05ee/48aa/de7b6e9524212508334e50ea61c70030?Expires=1703462400&Signature=ijz7Asd6CkEZ2tuTDLFfgVnYLczHgS9svBiHSTeM-ALflGOpy2voPkT4dAgv5qz7BjaP8Hhji2Sudf703R-LMdxx~QqsGVsD8sTUjggRrplAYV33UUvB5IoRL7nWaQYSQdp1NJW4ad9nFdfBa9SOhCClKy5orrkYO0fTxtQaLofMBQ9dvm5aNoUehHJhP9yT15xR8aPb38TVswBbTRYZoLuF2tFn1klCnhE2elnfVAFxzcFEL9TYxtY4okRAx3WIREMXaPE6W-gSZnL84DkbwdprqhmiNCwPXSQ33I9yeyTAbWJ85ftV1Rm0chKTeYSHUaRb~JMqMRYXeBzIksskqA__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4",
    questionAndAnswers: [
      {
        question: "Have you worked with us before?",
        answer: "Yes",
      },
      {
        question: "Have you worked with us before?",
        answer: "Yes",
      },
    ],
  },
]);
