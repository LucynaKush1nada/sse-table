import * as React from 'react'

import { columns } from './table/Columns'
import IColumnData from './table/IColumnData'
import Table from './table/Table'

import { fetchEventSource } from '@microsoft/fetch-event-source';

import './App.css'
import ISort from './sort/ISort'
import IPagination from './pagination/IPagination'

const serverBaseURL = "http://localhost:5000";

const App = () => {
  const [data, setData] = React.useState<IColumnData[]>([] as IColumnData[])
  const [sort, setSort] = React.useState<ISort>({ column: "origin", direction: "asc" })
  const [pagination, setPagination] = React.useState<IPagination>({ pageNumber: 0, pageSize: 4 })

  //React.useMemo(() => setData(getInitData()), [])
  React.useEffect(() => {
    const fetchData = async () => {
      await fetchEventSource(`${serverBaseURL}/sse`, {
        method: "POST",
        headers: {
          Accept: "text/event-stream",
          "Content-Type": "application/json"
        },
        onmessage(event) {
          console.log(event.data);
          const parsedData = JSON.parse(event.data)
          setData(parsedData)
        },
        onclose() {
          console.log("Connection closed by the server");
        },
        onerror(err) {
          console.log("There was an error from server", err)
        },
        body: JSON.stringify({
          sort: sort,
          pagination: pagination
        })
      })
    }
    fetchData();
  }, [sort, pagination])

  const changeSort = (sorting: ISort) => {
    setSort(sorting)
  }

  const changePagination = (pgn: IPagination) => {
    setPagination(pgn)
  }

  return (
    <div className="App">
      <Table data={data} columns={columns}></Table>
      <div style={{ textAlign: 'center' }}>
        <button onClick={() => changeSort({ column: "origin", direction: "asc" })}>Sort Origin by ASC</button>
        <button onClick={() => changeSort({ column: "origin", direction: "desc" })}>Sort Origin by DESC</button>
        <button onClick={() => changeSort({ column: "flight", direction: "asc" })}>Sort Flight by ASC</button>
        <button onClick={() => changeSort({ column: "flight", direction: "desc" })}>Sort Flight by desc</button>
      </div>

      <div style={{ textAlign: 'center' }}>
        {pagination.pageNumber === 1 && <button onClick={() => changePagination({ pageNumber: 0, pageSize: 4 })}>Prev</button>}
        {pagination.pageNumber === 0 && <button onClick={() => changePagination({ pageNumber: 1, pageSize: 4 })}>Next</button>}
      </div>
    </div>
  )
}

export default App
