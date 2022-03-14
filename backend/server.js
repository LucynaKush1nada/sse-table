const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());

const PORT = 5000;

const data = [
  {
    origin: "London",
    flight: "A123",
    arrival: "08:15",
    state: "landed"
  },
  {
    origin: "Berlin",
    flight: "D654",
    arrival: "08:45",
    state: "landed"
  },
  {
    origin: "New York",
    flight: "U213",
    arrival: "09:05",
    state: "landed"
  },
  {
    origin: "Buenos Aires",
    flight: "A987",
    arrival: "09:30",
    state: "landed"
  },
  {
    origin: "Rome",
    flight: "I768",
    arrival: "10:10",
    state: "landed"
  },
  {
    origin: "Tokyo",
    flight: "G119",
    arrival: "10:35",
    state: "landed"
  },
  {
    origin: "Moscow",
    flight: "P123",
    arrival: "10:35",
    state: "landed"
  },
  {
    origin: "Kostroma",
    flight: "K987",
    arrival: "10:35",
    state: "landed"
  }
]

app.use(express.json());

app.post("/sse", function (req, res) {
  res.writeHead(200, {
    Connection: "keep-alive",
    "Content-Type": "text/event-stream",
    "Cache-Control": "no-cache",
  });
  const rows = () => {
    return data.sort((a, b) => {
      return (req.body.sort.direction == "asc") == (a[req.body.sort.column] > b[req.body.sort.column])
        ? 1 : -1
    })
  }
  const sortedAndPaginatedData = JSON.stringify(
    Object.assign(rows().slice(
      req.body.pagination.pageNumber * req.body.pagination.pageSize,
      (req.body.pagination.pageNumber + 1) * req.body.pagination.pageSize)
    ))
  res.write(`data: ${sortedAndPaginatedData}`)
  res.write("\n\n");
});

app.listen(PORT, function () {
  console.log(`Server is running on port ${PORT}`);
});